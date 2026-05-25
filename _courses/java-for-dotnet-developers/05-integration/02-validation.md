---
chapter_id: 2
chapter_slug: validation
chapter_title: "Validation: Jakarta Bean Validation vs. DataAnnotations"
chapter_summary: "Maps Jakarta Bean Validation annotations to .NET DataAnnotations, explains the @Valid (cascade) vs. @Validated (enable param-level checks) distinction, demonstrates a custom ConstraintValidator, and shows how to map both MethodArgumentNotValidException and ConstraintViolationException to a consistent ProblemDetail response."
---

{% raw %}
## What you'll learn
- The Jakarta Bean Validation 3.0 model - annotations, groups, providers.
- The Spring annotations that trigger validation: `@Valid`, `@Validated`.
- Mapping common .NET DataAnnotations to Jakarta equivalents.
- Writing a custom `ConstraintValidator`.

## Concepts

ASP.NET Core ships with **DataAnnotations** (`[Required]`, `[StringLength]`, `[EmailAddress]`) baked into model binding. Many teams switch to [FluentValidation](https://docs.fluentvalidation.net/) for richer rules. Java's standard is **Jakarta Bean Validation 3.0** (formerly JSR 380 / 303, formerly `javax.validation`). The reference implementation is **Hibernate Validator**, which Spring Boot pulls in via `spring-boot-starter-validation`.

The annotations live in `jakarta.validation.constraints`. The most-used:

| Jakarta annotation       | What it does                                  | .NET parallel        |
|--------------------------|-----------------------------------------------|----------------------|
| `@NotNull`               | Value must not be null                        | `[Required]` (kind of) |
| `@NotBlank`              | String must not be null or whitespace-only    | `[Required]` + custom |
| `@NotEmpty`              | String/Collection must not be null or empty   |                      |
| `@Size(min=, max=)`      | String/Collection length                       | `[StringLength]`     |
| `@Min(n)`, `@Max(n)`     | Numeric bounds                                | `[Range]`            |
| `@Positive`, `@Negative` | Sign of a number                              |                      |
| `@Email`                 | Looks like an email                            | `[EmailAddress]`     |
| `@Pattern(regexp=)`      | Regex match                                    | `[RegularExpression]`|
| `@Past`, `@Future`       | `LocalDate`/`Instant` comparison              |                      |
| `@Valid`                 | Cascade validation into nested object         | implicit             |

### Triggering validation

`@Valid` on a controller parameter triggers validation against the body or path/query parameter:

```java
public record NewOrder(
    @NotBlank String sku,
    @Positive int quantity,
    @NotNull @Future Instant deliverBy
) {}

@PostMapping
public Order create(@Valid @RequestBody NewOrder body) { /* ... */ }
```

If validation fails, Spring throws `MethodArgumentNotValidException`. The default handler returns 400 with a Spring-generated body; you'll usually want to format it yourself in a `@ControllerAdvice` (Module 4 Chapter 2).

For method parameters (path/query) and `@PathVariable`/`@RequestParam` types annotated with constraints directly, you also need `@Validated` on the class:

```java
@RestController
@Validated
@RequestMapping("/api/orders")
public class OrderController {

    @GetMapping
    public List<Order> list(
        @RequestParam @Min(1) @Max(100) int limit
    ) { /* ... */ }
}
```

Without `@Validated` on the class, the `@Min`/`@Max` on the parameter are silently ignored - a common bug.

### Validation on records

Records work natively. The annotations go on the components:

```java
public record NewOrder(
    @NotBlank(message = "sku is required") String sku,
    @Positive(message = "quantity must be positive") int quantity
) {}
```

Spring Boot 3 + Jackson 2.13+ handle this without ceremony. The `message` attribute supplies the human-readable error; it can reference message bundles for i18n via `{key.path}`.

### Cascading validation

If a DTO contains another DTO, mark the field `@Valid` to cascade:

```java
public record Order(
    @NotBlank String sku,
    @Positive int quantity,
    @Valid CustomerInfo customer       // validates CustomerInfo's own constraints
) {}

public record CustomerInfo(
    @NotBlank String name,
    @Email String email
) {}
```

Without `@Valid`, the nested object is checked for nullity only.

### Custom validators

Write a constraint when no built-in covers your rule. Two parts: the annotation and the validator.

```java
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SkuValidator.class)
public @interface ValidSku {
    String message() default "invalid SKU format";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class SkuValidator implements ConstraintValidator<ValidSku, String> {
    private static final java.util.regex.Pattern PATTERN =
        java.util.regex.Pattern.compile("^[A-Z]{2,4}-\\d{4,8}$");

    @Override
    public boolean isValid(String value, ConstraintValidatorContext ctx) {
        if (value == null) return true;        // null is @NotNull's problem
        return PATTERN.matcher(value).matches();
    }
}
```

Use:

```java
public record NewOrder(@NotBlank @ValidSku String sku, @Positive int quantity) {}
```

The convention "null returns true" delegates the null check to `@NotNull` / `@NotBlank`. Don't fold null-handling into every validator.

The .NET parallel is `ValidationAttribute` + `IsValid`. Same shape; different package.

### Validation groups

Bean Validation supports **groups** - running different rules in different contexts. Common use: a `CreateGroup` for creation, an `UpdateGroup` for updates where some fields are optional. In Spring, switch via `@Validated(CreateGroup.class)`:

```java
public record Order(
    @NotBlank(groups = {CreateGroup.class, UpdateGroup.class}) String sku,
    @Positive(groups = CreateGroup.class) int quantity
) {}

@PostMapping
public Order create(@Validated(CreateGroup.class) @RequestBody Order body) { /* ... */ }
```

Useful but adds complexity. Prefer separate DTOs (`CreateOrderRequest`, `UpdateOrderRequest`) over groups for clarity in most cases.

## Walkthrough

A complete controller with validation and a global error handler:

```java
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

@RestController
@RequestMapping("/api/orders")
@Validated
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<Order> create(@Valid @RequestBody NewOrder body) {
        Order saved = service.create(body);
        URI loc = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(saved.id()).toUri();
        return ResponseEntity.created(loc).body(saved);
    }

    @GetMapping
    public List<Order> list(
        @RequestParam @Min(1) @Max(100) int limit
    ) {
        return service.list(limit);
    }
}

public record NewOrder(
    @NotBlank @Size(max = 64) @ValidSku String sku,
    @Positive @Max(1000) int quantity,
    @Valid CustomerInfo customer
) {}

public record CustomerInfo(@NotBlank String name, @Email String email) {}

// Global handler turns validation errors into RFC 7807 problem details.
@ControllerAdvice
class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> bodyInvalid(MethodArgumentNotValidException e) {
        var pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("validation failed");
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(fe ->
            errors.put(fe.getField(), fe.getDefaultMessage()));
        pd.setProperty("errors", errors);
        return ResponseEntity.badRequest().body(pd);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ProblemDetail> paramInvalid(ConstraintViolationException e) {
        var pd = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        pd.setTitle("constraint violation");
        pd.setDetail(e.getMessage());
        return ResponseEntity.badRequest().body(pd);
    }
}
```

Two exception types:
- `MethodArgumentNotValidException` for `@RequestBody @Valid` failures.
- `ConstraintViolationException` for `@Validated`-class method parameter failures (`@Min`/`@Max` on `@RequestParam`).

Handle both, or your API will surface inconsistent error shapes.

## How it fits together

```mermaid
flowchart TB
  req[Request] --> bind[Spring binds parameters]
  bind --> v[Validate against Jakarta constraints]
  v -.->|fail body| ex1[MethodArgumentNotValidException]
  v -.->|fail param| ex2[ConstraintViolationException]
  v -->|pass| ctrl[Controller method runs]
  ex1 --> advice[@ControllerAdvice handler]
  ex2 --> advice
  advice --> err[400 with ProblemDetail body]
```

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| `@Min`/`@Max` on `@RequestParam` ignored | Class missing `@Validated`. | Add `@Validated` to the controller. |
| Nested DTO not validated | Missing `@Valid` on the nested field. | Add `@Valid` to cascade. |
| Custom validator NPE on null | Forgot null-skip convention. | Return `true` for null; rely on `@NotNull`. |
| Two different error shapes for body vs. param | Different exception types. | Handle both `MethodArgumentNotValidException` and `ConstraintViolationException`. |
| `javax.validation.*` imports | Pre-Spring-Boot-3 code. | Use `jakarta.validation.*`. |

## Exercises

1. Take a DTO with three fields and add Jakarta annotations: required string, positive int, future date. Trigger validation in a `@PostMapping` and verify the 400 body shape.
2. Write a custom `@ValidSku` constraint (regex `^[A-Z]{2,4}-\d{4,8}$`) and apply it to a record component. Confirm valid and invalid inputs.
3. Add `@RequestParam @Min(1)` to a list endpoint without `@Validated` on the class. Observe the silent failure. Add `@Validated` and confirm the constraint fires.

## Recap & next

- Jakarta Bean Validation 3.0 + Hibernate Validator + `spring-boot-starter-validation` is the standard.
- `@Valid` on `@RequestBody` cascades into the DTO; `@Validated` on the class enables constraint checks on `@RequestParam` / `@PathVariable`.
- Records work natively for validated DTOs.
- Two different exception types (`MethodArgumentNotValidException`, `ConstraintViolationException`) need handling.
- Custom validators are an annotation + a `ConstraintValidator<A, T>` implementation.

Next, **JSON binding: Jackson vs. System.Text.Json** - configuring Jackson, naming strategies, and polymorphism.
{% endraw %}
