---
chapter_id: 5
chapter_slug: testing
chapter_title: "Testing: JUnit 5, Mockito, and Spring Boot Test"
chapter_summary: "Maps the Java test stack (JUnit 5 + AssertJ + Mockito + Spring Boot Test) to xUnit + Moq + WebApplicationFactory, walks through @WebMvcTest / @DataJpaTest slices vs. full @SpringBootTest, and shows Testcontainers + @ServiceConnection for real-Postgres integration tests."
---

{% raw %}
## What you'll learn
- JUnit 5 conventions and what's different from xUnit.
- Mockito vs. Moq - mock, verify, argument captors.
- Spring Boot test slices (`@WebMvcTest`, `@DataJpaTest`) vs. full `@SpringBootTest`.
- Testcontainers for real database/Redis tests without a separate environment.

## Concepts

The Java test stack is more layered than xUnit + Moq:

- **JUnit 5** - the test runner and assertion model.
- **AssertJ** - fluent assertions; the de-facto default over JUnit's built-ins.
- **Mockito** - mocking and verification.
- **Spring Boot Test** - slice and full-context tests.
- **Testcontainers** - Docker-managed real dependencies.

`spring-boot-starter-test` pulls in JUnit 5, AssertJ, Mockito, and Spring Boot Test. Add `org.testcontainers:junit-jupiter` for Testcontainers.

### JUnit 5 basics

```java
import org.junit.jupiter.api.*;
import static org.assertj.core.api.Assertions.*;

class OrderServiceTest {

    @BeforeEach
    void setUp() {
        // runs before each @Test
    }

    @Test
    @DisplayName("creating an order assigns it a generated id")
    void createAssignsId() {
        Order o = service.create(new NewOrder("ABC-123", 5));
        assertThat(o.id()).isGreaterThan(0L);
        assertThat(o.status()).isEqualTo(OrderStatus.PENDING);
    }

    @ParameterizedTest
    @CsvSource({"1, true", "-1, false", "0, false"})
    void validQuantities(int qty, boolean valid) {
        assertThat(service.isValid(qty)).isEqualTo(valid);
    }

    @AfterEach
    void tearDown() { /* ... */ }
}
```

Compared with xUnit:

| xUnit                  | JUnit 5                       |
|------------------------|-------------------------------|
| `[Fact]`               | `@Test`                       |
| `[Theory] + [InlineData]` | `@ParameterizedTest + @CsvSource` |
| `Assert.Equal(a, b)`   | `assertThat(b).isEqualTo(a);` (AssertJ) |
| Constructor (per-test setup) | `@BeforeEach`           |
| `IDisposable.Dispose`  | `@AfterEach`                  |
| `[Trait]`              | `@Tag`                        |

JUnit 5 instantiates a fresh test class per test by default (matching xUnit's behaviour). The `@BeforeEach` method runs after construction.

### AssertJ

AssertJ's fluent assertions read like English and produce better failure messages:

```java
assertThat(order.lineItems())
    .hasSize(2)
    .extracting(LineItem::sku)
    .containsExactly("A-1", "B-2");

assertThat(response).hasFieldOrPropertyWithValue("status", "OK");

assertThatThrownBy(() -> service.cancel(999))
    .isInstanceOf(OrderNotFoundException.class)
    .hasMessageContaining("999");
```

Use AssertJ for any assertion more interesting than "this equals that."

### Mockito

```java
import static org.mockito.Mockito.*;

class OrderServiceTest {

    OrderRepository repo = mock(OrderRepository.class);
    PaymentClient payments = mock(PaymentClient.class);
    OrderService service = new OrderService(repo, payments);

    @Test
    void chargesAfterSave() {
        Order o = new Order(1L, "ABC-123", 5);
        when(repo.save(any())).thenReturn(o);
        when(payments.charge(any())).thenReturn(new PaymentResult("OK", "tx-1"));

        Receipt r = service.placeAndCharge(new NewOrder("ABC-123", 5));

        assertThat(r.txId()).isEqualTo("tx-1");
        verify(repo).save(argThat(saved -> saved.sku().equals("ABC-123")));
        verify(payments).charge(any());
    }
}
```

Compared with Moq:

| Moq                                | Mockito                              |
|------------------------------------|--------------------------------------|
| `new Mock<IRepo>()` / `.Object`    | `mock(Repo.class)` returns the mock  |
| `.Setup(...).Returns(...)`         | `when(mock.method(...)).thenReturn(...)` |
| `.Verify(...)`                     | `verify(mock).method(...)`           |
| `It.IsAny<T>()`                    | `any()`                              |
| Argument captors                    | `ArgumentCaptor.forClass(...)` + `verify(...).method(captor.capture())` |

For Spring tests, Spring's `@MockBean` injects a Mockito mock into the test context, replacing the real bean.

### Spring Boot test slices

Booting the full application context for every test is slow. **Slices** boot only the relevant layer:

**`@WebMvcTest`** - controllers, MVC infrastructure, validation. No JPA, no full context.

```java
@WebMvcTest(OrderController.class)
class OrderControllerTest {
    @Autowired MockMvc mvc;
    @MockBean OrderService service;

    @Test
    void returns200ForExistingOrder() throws Exception {
        when(service.findById(1L)).thenReturn(Optional.of(new Order(1L, "ABC", 5, "PAID")));

        mvc.perform(get("/api/orders/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.sku").value("ABC"));
    }
}
```

**`@DataJpaTest`** - JPA only. In-memory H2 by default; swap to Testcontainers for real Postgres.

```java
@DataJpaTest
class OrderRepositoryTest {
    @Autowired OrderRepository repo;

    @Test
    void findsByStatus() {
        repo.save(new Order("ABC", 5));
        List<Order> found = repo.findByStatus(OrderStatus.PENDING);
        assertThat(found).hasSize(1);
    }
}
```

**`@SpringBootTest`** - full application context. Slower; use when slices aren't enough (e.g. an integration test crossing controller + service + repository).

### Testcontainers

For real database integration tests, [Testcontainers](https://testcontainers.com/) runs a containerized service for the duration of the test.

```java
@SpringBootTest
@Testcontainers
class OrderIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
        .withDatabaseName("orders")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void dbProps(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired MockMvc mvc;

    @Test
    void endToEnd() throws Exception {
        mvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"sku":"ABC-123","quantity":5}
                """))
            .andExpect(status().isCreated());
    }
}
```

The first run pulls the Postgres image; subsequent runs reuse the cached image. Spring Boot 3.1+ also supports `@ServiceConnection` to wire the connection automatically without `@DynamicPropertySource`:

```java
@ServiceConnection
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");
```

The .NET parallel is the [Testcontainers .NET](https://dotnet.testcontainers.org/) package - same idea, same ergonomics.

### MockMvc

`MockMvc` is the equivalent of `WebApplicationFactory<TStartup>` in ASP.NET Core tests - it dispatches HTTP requests against the controller without a real network listener:

```java
mvc.perform(post("/api/orders").content(json).contentType(MediaType.APPLICATION_JSON))
    .andExpect(status().isCreated())
    .andExpect(header().exists("Location"))
    .andExpect(jsonPath("$.id").exists());
```

Combine with `@WebMvcTest` for fast controller tests.

## Walkthrough

A controller test with full request/response assertions:

```java
@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    @MockBean OrderService service;

    @Test
    void createsOrder() throws Exception {
        when(service.create(any())).thenReturn(new Order(42L, "ABC-123", 5, "PENDING"));

        String json = mapper.writeValueAsString(new NewOrder("ABC-123", 5));

        mvc.perform(post("/api/orders")
                .content(json)
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", endsWith("/api/orders/42")))
            .andExpect(jsonPath("$.id").value(42))
            .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void rejectsInvalidBody() throws Exception {
        mvc.perform(post("/api/orders")
                .content("{\"sku\":\"\",\"quantity\":-1}")
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors.sku").exists())
            .andExpect(jsonPath("$.errors.quantity").exists());
    }
}
```

The validation case exercises the global `@ControllerAdvice` you wrote in Module 5 Chapter 2. The slice loads validation infrastructure automatically.

## How it fits together

```mermaid
flowchart TB
  unit[Unit test: plain JUnit + Mockito] --> fast[Fast - no Spring]
  slice[Slice test: @WebMvcTest, @DataJpaTest] --> mid[Medium - partial context]
  full[@SpringBootTest] --> slow[Slow - full context]
  full --> tc[+ @Testcontainers for real deps]
  tc --> e2e[End-to-end integration]
```

Pyramid: many unit tests, fewer slice tests, even fewer full integration tests.

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| `@MockBean` everywhere | Defeats integration tests. | Use unit tests with plain Mockito for pure logic. |
| Slow test suite from many `@SpringBootTest` | Each one boots a fresh context. | Reuse contexts (matching configurations cache); convert to slice tests where possible. |
| H2 quirks bite in prod | H2 dialect differs from Postgres in subtle ways. | Use Testcontainers Postgres for repository tests. |
| `mock(...)` instead of `@MockBean` in `@SpringBootTest` | Mock isn't wired into the context. | `@MockBean` registers it as a bean. |
| Forgot `@Testcontainers` annotation | Containers never start. | Add it to the class. |

## Exercises

1. Write a `@WebMvcTest` for a controller you own. Cover the happy path, the not-found path, and a validation failure.
2. Convert a `@DataJpaTest` to use Testcontainers Postgres via `@ServiceConnection`. Confirm SQL types behave the same as in prod.
3. Add an `ArgumentCaptor` to a Mockito test that captures the `Order` passed to `OrderRepository.save` and asserts its contents.

## Recap & next

- JUnit 5 + AssertJ + Mockito is the standard combo; `spring-boot-starter-test` pulls them in.
- Slice tests (`@WebMvcTest`, `@DataJpaTest`) are faster than full `@SpringBootTest` - use them when possible.
- `@MockBean` replaces a bean in the Spring context with a Mockito mock.
- `MockMvc` is the in-memory HTTP dispatcher; the closest .NET parallel is `WebApplicationFactory`.
- Testcontainers gives you real Postgres/Redis/Kafka in tests without a separate environment.

Next, **Module 6 starts with Packaging and deployment** - fat JARs, layered Docker images, and what beats `dotnet publish --self-contained`.
{% endraw %}
