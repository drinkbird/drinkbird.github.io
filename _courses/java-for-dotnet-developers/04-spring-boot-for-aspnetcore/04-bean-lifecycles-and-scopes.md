---
chapter_id: 4
chapter_slug: bean-lifecycles-and-scopes
chapter_title: "Bean lifecycles and scopes"
chapter_summary: "Covers Spring's four scopes (singleton, prototype, request, session) mapped to ASP.NET Core lifetimes, the @PostConstruct / @PreDestroy hooks, and the classic singleton-holds-request-scoped-bean gotcha - fixed with proxyMode = TARGET_CLASS."
---

{% raw %}
## What you'll learn
- The four Spring scopes (singleton, prototype, request, session) and their ASP.NET Core counterparts.
- `@PostConstruct` and `@PreDestroy` - when they fire and what to do in them.
- The cross-scope injection problem (singleton holding a request-scoped bean) and how scoped proxies solve it.
- `@Lazy` for delayed initialization.

## Concepts

A Spring bean has a lifecycle: created → initialized → in use → destroyed. The scope determines how long an instance lives and how many exist.

### Scope summary

| Spring scope | Lifetime                          | ASP.NET Core analogue |
|--------------|-----------------------------------|------------------------|
| `singleton` (default) | One instance per application context (per JVM, typically) | `AddSingleton`        |
| `prototype`  | New instance per injection / `getBean` call | `AddTransient`        |
| `request`    | One per HTTP request (web only)   | `AddScoped`           |
| `session`    | One per HTTP session (web only)   | (no direct equivalent) |
| `application`| One per ServletContext            | (rare)                 |

The default - singleton - is what you want 95% of the time. It's the same as ASP.NET Core's preference: stateless services should be singletons. `prototype` is the most over-used scope; if you need fresh state, you usually want a method that constructs it, not a bean with prototype scope.

### Singleton lifecycle

```java
@Service
public class CacheWarmer {

    @PostConstruct
    public void warm() {
        // Runs once, after the bean is constructed and dependencies are injected,
        // before the application context is considered fully started.
        // Use for: load cache, validate config, register listeners.
    }

    @PreDestroy
    public void flush() {
        // Runs at context shutdown for singletons.
        // Use for: flush buffers, close resources not managed by try-with-resources.
    }
}
```

`@PostConstruct` is from `jakarta.annotation` (was `javax.annotation` pre-Boot 3). It corresponds roughly to `IHostedService.StartAsync` for one-off initialization, though it runs synchronously inside bean creation.

`@PreDestroy` does *not* fire for `prototype` beans - Spring constructs prototypes but doesn't track them for destruction. If a prototype manages resources, manage them explicitly.

### Cross-scope injection: the surprise

Injecting a shorter-lived bean into a longer-lived one is the classic Spring gotcha. Imagine:

```java
@Service          // singleton
public class OrderService {
    private final HttpRequestContext ctx;   // request-scoped

    public OrderService(HttpRequestContext ctx) {
        this.ctx = ctx;
    }
}
```

This fails: at singleton creation time, there is no active request, so the request-scoped bean can't be resolved. Or worse, it succeeds but the singleton holds onto the *first* request's context for the lifetime of the app - a subtle, persistent bug.

The fix is a **scoped proxy**. Spring injects a proxy that delegates to the current request's instance on every call:

```java
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class HttpRequestContext {
    private final String requestId;
    // ...
}
```

Now `OrderService` holds the proxy. Every method call routes through Spring's `RequestContextHolder` to find the current request's instance. The singleton is happy, the request scope works, and the bug is gone.

The ASP.NET Core analogue is `IServiceProvider.GetRequiredService<T>()` from a singleton's method - but ASP.NET Core's DI fails fast (`InvalidOperationException` on the construction) rather than letting you bake in the bug. Spring trusts you'd add the proxy; you have to remember.

### @Lazy

`@Lazy` defers bean creation until first use:

```java
@Service
public class HeavyInitService {
    @Lazy
    private final ExpensiveDependency dep;     // not constructed until used

    public HeavyInitService(@Lazy ExpensiveDependency dep) { this.dep = dep; }
}
```

Uses:
- Break circular dependencies (`@Lazy` on one side defers construction long enough to resolve the cycle).
- Skip expensive initialization in test contexts that don't exercise the dependency.

`@Lazy` is a tactical tool; don't sprinkle it. A circular dependency is usually a design problem.

### Bean creation order

Spring builds the bean graph in dependency order - constructor parameters resolve first. You can influence ordering with:

- **`@DependsOn("otherBean")`** - explicit ordering.
- **`@Order(value)`** on `@Component` for `List<T>` injection ordering (Spring injects all matching beans in `@Order` order).

For a singleton service that needs to run something at startup, prefer an `ApplicationRunner` or `CommandLineRunner` bean:

```java
@Bean
public ApplicationRunner warmupRunner(CacheService cache) {
    return args -> cache.warm();
}
```

`ApplicationRunner` runs after the application context is fully ready - useful for things that touch other singletons.

## Walkthrough

A complete lifecycle demo with a scoped proxy:

```java
@Configuration
public class ScopeDemo { }

@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
class RequestTrace {
    private final String id = java.util.UUID.randomUUID().toString();

    @PostConstruct
    public void init() {
        System.out.println("Created RequestTrace " + id);
    }

    public String id() { return id; }
}

@RestController
class TraceController {
    private final RequestTrace trace;            // proxy injected once
    private final TraceService service;

    public TraceController(RequestTrace trace, TraceService service) {
        this.trace = trace;
        this.service = service;
    }

    @GetMapping("/trace")
    public String trace() {
        // Each call resolves to the current request's RequestTrace.
        return "controller-id=" + trace.id() + " service-id=" + service.tracedId();
    }
}

@Service
class TraceService {
    private final RequestTrace trace;            // same proxy, different request instances

    public TraceService(RequestTrace trace) { this.trace = trace; }

    public String tracedId() { return trace.id(); }
}
```

Hit `/trace` twice. Each response shows the same id for `controller-id` and `service-id` (same request), but the two requests show different ids. The singleton controller and service hold proxies; each request gets its own backing instance.

Without `proxyMode = TARGET_CLASS`, this code throws at startup: `Scope 'request' is not active for the current thread`.

## How it fits together

```mermaid
flowchart TB
  ctx[ApplicationContext starts] --> sing[Construct singleton beans]
  sing --> post[Invoke @PostConstruct]
  post --> ready[Context ready]
  ready --> req[HTTP request arrives]
  req --> reqs[Create request-scoped beans]
  reqs --> use[Use the bean]
  req --> end[Request ends - request beans destroyed]
  ctx -.->|shutdown| pre[Invoke @PreDestroy on singletons]
  pre --> done[Context closed]
```

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| Singleton holds first request's data | Request-scoped bean injected directly into singleton. | Use `proxyMode = TARGET_CLASS` on the scope. |
| `@PreDestroy` never fires for a prototype | Spring doesn't track prototype destruction. | Manage cleanup explicitly or change scope. |
| Stale state after context refresh | DevTools restarts the context; `@PostConstruct` reruns. | Make `@PostConstruct` idempotent. |
| Circular dependency at startup | Two singletons need each other in constructors. | Break the cycle by extracting an interface, or use `@Lazy` on one side. |
| `@PostConstruct` calls another singleton not yet ready | Bean creation order. | Use `ApplicationRunner` or `@DependsOn`. |

## Exercises

1. Define a request-scoped `RequestTrace` bean. Inject it into a singleton controller and into a singleton service. Confirm both see the same id within a request and different ids across requests.
2. Add a `@PostConstruct` that loads data from a database, and a `@PreDestroy` that logs shutdown. Verify the order on context start and stop.
3. Reproduce a circular dependency between two beans, then resolve it with `@Lazy` on one side.

## Recap & next

- Default singleton scope is right for nearly all stateless services.
- `@PostConstruct` runs once after construction + injection; `@PreDestroy` runs at shutdown (singletons only).
- Cross-scope injection (singleton ← request-scoped) requires `proxyMode = TARGET_CLASS`.
- `@Lazy` defers construction; useful for breaking cycles or expensive init.
- For startup work that depends on other beans, prefer `ApplicationRunner` over `@PostConstruct`.

Next, **Spring Data JPA: a tour for EF Core users** - entities, repositories, JPQL, and the lazy-loading trap.
{% endraw %}
