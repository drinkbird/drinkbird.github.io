---
chapter_id: 1
chapter_slug: spring-container-vs-ms-di
chapter_title: "The Spring container vs. Microsoft.Extensions.DependencyInjection"
chapter_summary: "Compares Spring's component-scan model with ASP.NET Core's manual service registration, covers stereotype annotations (@Service, @Repository, @Controller), constructor injection as the implicit default, @Bean methods for programmatic registration, and resolving ambiguity with @Primary, @Qualifier, and @ConditionalOn*."
---

{% raw %}
## What you'll learn
- How Spring's component scan compares to ASP.NET Core's manual service registration.
- Constructor injection as the modern default - same in both frameworks.
- `@Bean` methods vs. `services.AddSingleton/Scoped/Transient`.
- `@Qualifier`, `@Primary`, and `@Conditional` for resolving ambiguity.

## Concepts

ASP.NET Core's `IServiceCollection` is **manual**: you call `builder.Services.AddScoped<IOrderRepo, OrderRepo>()` in `Program.cs` for every binding. Spring's container is **scan-based**: classes annotated with `@Component` (or its stereotypes `@Service`, `@Repository`, `@Controller`) are discovered automatically during startup. Both result in a constructor-injected dependency graph; the registration mechanism differs.

### Stereotypes

Spring's stereotype annotations all extend `@Component`:

- **`@Component`** - generic bean. Default choice for utility classes.
- **`@Service`** - business logic. Same wiring; the annotation conveys intent.
- **`@Repository`** - persistence. Adds Spring's exception translation (DB-specific exceptions become `DataAccessException`).
- **`@Controller`** - server-rendered HTML. `@RestController` adds JSON.

The runtime treatment is identical for `@Component` / `@Service`; the difference is documentary. `@Repository` is the only one with extra behaviour you'd notice.

### Constructor injection - same in both

Spring 4.3+ doesn't require `@Autowired` on a class with a single constructor. The Spring container picks the only constructor and resolves each parameter from the bean graph. This matches ASP.NET Core's behaviour exactly:

```java
@Service
public class OrderService {
    private final OrderRepository repo;
    private final PaymentGateway pay;

    // No @Autowired needed - single constructor.
    public OrderService(OrderRepository repo, PaymentGateway pay) {
        this.repo = repo;
        this.pay = pay;
    }
}
```

Field injection (`@Autowired` on a field) and setter injection both exist but are considered legacy patterns. Use constructor injection - it gives you final fields, immutable state, and trivial testability.

### `@Bean` methods

`@Bean` methods register a bean *programmatically*, comparable to `services.AddSingleton<T>(provider => new T(...))`. Useful when the class isn't yours to annotate, or you need configuration logic:

```java
@Configuration
public class HttpConfig {

    @Bean
    public RestClient restClient() {
        return RestClient.builder()
            .baseUrl("https://api.example.com")
            .build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }
}
```

A `@Configuration` class is just a `@Component` whose methods annotated with `@Bean` produce beans. The container manages those beans the same as scanned ones.

### Scopes

| Spring scope | ASP.NET Core lifetime |
|--------------|-----------------------|
| `@Scope("singleton")` (default) | `AddSingleton`        |
| `@Scope("prototype")`           | `AddTransient`        |
| `@Scope("request")` (web)       | `AddScoped` (per HTTP request) |
| `@Scope("session")` (web)       | (no direct equivalent) |

The default - singleton - is the most common. Use `prototype` when you genuinely want a fresh instance per injection (rare; usually a code smell). Module 4 Chapter 4 covers scopes in depth.

### Resolving ambiguity

When two beans match an injection point, Spring throws `NoUniqueBeanDefinitionException`. Three resolutions:

**`@Primary`** marks one as the default:

```java
@Bean @Primary
public DataSource primaryDataSource() { ... }

@Bean
public DataSource secondaryDataSource() { ... }
```

**`@Qualifier`** picks by name at the injection site:

```java
@Service
public class ReportService {
    public ReportService(@Qualifier("secondaryDataSource") DataSource ds) { ... }
}
```

**`@Profile`** restricts a bean to a runtime profile:

```java
@Bean
@Profile("dev")
public PaymentGateway fakePayments() { ... }

@Bean
@Profile("!dev")
public PaymentGateway realPayments() { ... }
```

The C# analogue is `services.AddSingleton<IFakePayments, FakePayments>()` inside an `if (env.IsDevelopment())` block - same outcome, different mechanism.

### Conditional beans

`@ConditionalOn*` annotations let auto-configurations behave differently based on classpath or property values:

- `@ConditionalOnClass(name = "...")`
- `@ConditionalOnMissingBean`
- `@ConditionalOnProperty(name = "app.feature.x.enabled", havingValue = "true")`

You'll see these mostly in Spring Boot starters. You can also use them in your own `@Configuration` classes to make beans optional.

## Walkthrough

A complete wiring example:

```java
// Domain
public interface OrderRepository {
    Optional<Order> findById(long id);
}

// Two implementations - would conflict without disambiguation.
@Repository("postgres")
public class PostgresOrderRepository implements OrderRepository {
    public Optional<Order> findById(long id) { /* JPA query */ return Optional.empty(); }
}

@Repository("inMemory")
@Profile("test")
public class InMemoryOrderRepository implements OrderRepository {
    public Optional<Order> findById(long id) { return Optional.empty(); }
}

// Service: injects the postgres one explicitly.
@Service
public class OrderService {
    private final OrderRepository repo;

    public OrderService(@Qualifier("postgres") OrderRepository repo) {
        this.repo = repo;
    }

    public Optional<Order> get(long id) { return repo.findById(id); }
}
```

If `@Profile("test")` is active, the `InMemoryOrderRepository` is loaded. Without it, only `PostgresOrderRepository` is loaded and the `@Qualifier` is redundant (but still safe).

A `@Configuration` with `@Bean`:

```java
@Configuration
public class ClientConfig {
    @Bean
    public PaymentGateway paymentGateway(
        @Value("${app.payments.url}") String url,
        ObjectMapper mapper
    ) {
        return new HttpPaymentGateway(url, mapper);
    }
}
```

The `@Value("${app.payments.url}")` injects from `application.yml`. The `ObjectMapper` parameter is resolved from the bean graph - `@Bean` methods can have other beans as parameters, and the container handles the ordering.

## How it fits together

```mermaid
flowchart TB
  start[SpringApplication.run] --> scan[Component scan: find @Component, @Service, etc.]
  start --> cfg[Process @Configuration / @Bean methods]
  scan --> graph[Build bean dependency graph]
  cfg --> graph
  graph --> instantiate[Instantiate by topological order]
  instantiate --> inject[Resolve constructor parameters]
  inject --> ready[Application context ready]
```

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| `NoUniqueBeanDefinitionException` | Two beans of the same type registered. | Use `@Primary` or `@Qualifier`. |
| `NoSuchBeanDefinitionException` | Class not annotated, not in scan path. | Add stereotype annotation or widen `@ComponentScan`. |
| Field-injected service is hard to test | `@Autowired` on private field; can't construct manually. | Switch to constructor injection. |
| Circular dependency | A ⟶ B ⟶ A constructor chain. | Refactor; or last-resort `@Lazy` on one side. |
| `@Bean` method invoked twice gives different objects | Calling the method directly instead of letting Spring proxy it. | Inject the bean as a parameter; don't self-call. |

## Exercises

1. Convert an ASP.NET Core `Program.cs` registration block into Spring annotations: three services with different lifetimes.
2. Create two `DataSource` beans, mark one `@Primary`, and inject the non-primary one into a service via `@Qualifier`.
3. Add `@ConditionalOnProperty(name = "feature.beta", havingValue = "true")` to a bean and verify it appears only when the property is set.

## Recap & next

- Spring scans for `@Component` (and stereotypes); ASP.NET Core registers manually.
- Constructor injection is the default; `@Autowired` on a single constructor is implicit.
- `@Bean` methods register beans programmatically inside `@Configuration` classes.
- Scopes default to singleton; `prototype` is the rare per-injection alternative.
- `@Primary`, `@Qualifier`, `@Profile`, `@ConditionalOn*` resolve ambiguity.

Next, **Controllers, routing, and request binding** - building REST endpoints in Spring with side-by-side `[ApiController]` comparisons.
{% endraw %}
