---
chapter_id: 2
chapter_slug: classes-records-sealed-types
chapter_title: "Classes, records, and sealed types: replacing C# properties and POCOs"
chapter_summary: "Compares plain POJOs with Java 16+ records as the modern default for immutable data carriers, covers compact constructors for validation, and shows how sealed interfaces + record subtypes + pattern-matching switch give you discriminated-union-style modelling."
---

{% raw %}
## What you'll learn
- How Java records compare to C# records and POCOs.
- Why manual getters/setters still appear constantly in Java code.
- Sealed classes and pattern matching - the closest thing to discriminated unions.
- What Java does not have: init-only properties, `nameof`, primary constructors.

## Concepts

In C#, a typical DTO uses **properties** with `get; set;` or `get; init;`. The compiler generates backing fields, getters, setters, and (with `record`) `Equals`, `GetHashCode`, `ToString`, and deconstruction. Java reached this level later and arrived in two distinct shapes:

- **Classes with explicit getters/setters** - the legacy default, still everywhere.
- **Records** - Java 16+, the modern default for immutable data carriers.

### Classes

A "POJO" (Plain Old Java Object) typically looks like this:

```java
public class Customer {
    private final long id;
    private String name;

    public Customer(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

There is no property syntax. The `getX`/`setX` pattern is convention, but it's load-bearing - Spring, Jackson, Hibernate, and other frameworks reflectively look for those exact method names. **Project Lombok** (`@Data`, `@Getter`, `@Setter`) generates them at compile time; mainstream but contentious because it relies on annotation processors that change bytecode. Many shops avoid Lombok and accept the verbosity.

### Records

A record collapses the same shape:

```java
public record Customer(long id, String name) {}
```

What you get for free:
- Final fields (`id`, `name`).
- A canonical constructor.
- Accessor methods `id()` and `name()` - *not* `getId()` / `getName()`. The naming difference matters for framework integration (Jackson handles records natively; older Hibernate didn't).
- `equals`, `hashCode`, `toString` based on component values.
- Implicit `Serializable`-compatible structure (when relevant).

Compared with C# records:
- Java records are always immutable. There is no `with` expression *yet* (proposed; not in Java 17 or 21 standard yet).
- Component naming uses bare names, not capitalised properties. `customer.id()` returns the id; `customer.id` would only work inside the record itself or its subclass (none exist - records are final).
- Records are reference types; they're still heap-allocated.

Validation in records goes in the **compact constructor**:

```java
public record Customer(long id, String name) {
    public Customer {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name required");
        }
        name = name.strip(); // canonicalize before assignment
    }
}
```

Notice: no parameter list on `Customer { ... }` - the compact constructor uses the record's component list implicitly, and assignment to the fields is automatic at the end.

### Sealed classes

Java 17 added [sealed classes](https://openjdk.org/jeps/409). They restrict which classes can extend them:

```java
public sealed interface Shape permits Circle, Square, Rectangle {}
public record Circle(double radius) implements Shape {}
public record Square(double side) implements Shape {}
public record Rectangle(double width, double height) implements Shape {}
```

Combined with [pattern matching for switch](https://openjdk.org/jeps/406) (preview in 17, finalized in 21), sealed hierarchies give you something close to C#'s discriminated unions:

```java
public double area(Shape s) {
    return switch (s) {
        case Circle c    -> Math.PI * c.radius() * c.radius();
        case Square sq   -> sq.side() * sq.side();
        case Rectangle r -> r.width() * r.height();
    };
    // The compiler knows the list is exhaustive - no default needed.
}
```

This is the closest Java gets to `record union` in C#. The pattern is sealed interface + record subtypes + switch - the modern Java idiom.

### What Java still doesn't have

- **Init-only properties.** Records solve immutable construction; mutable-with-final fields requires a builder or a copy constructor.
- **`nameof` operator.** No compile-time string of a member name. Workarounds: reflection at runtime, or constants.
- **Primary constructor syntax for non-record classes.** Records get it; classes don't.
- **`with` expression for records.** Coming, but not in Java 17. Workarounds: write a copy method manually, use [`Records.with`](https://openjdk.org/jeps/468) when finalized.

## Walkthrough

The same domain modelled three ways. A traditional POJO:

```java
public class Order {
    private final long id;
    private final String status;

    public Order(long id, String status) {
        this.id = id;
        this.status = status;
    }
    public long getId() { return id; }
    public String getStatus() { return status; }

    @Override public boolean equals(Object o) { /* ... */ return false; }
    @Override public int hashCode() { /* ... */ return 0; }
    @Override public String toString() { return "Order[" + id + "," + status + "]"; }
}
```

The same as a record:

```java
public record Order(long id, String status) {}
```

A sealed status with pattern matching:

```java
public sealed interface OrderStatus permits Pending, Paid, Cancelled {}
public record Pending(java.time.Instant since)            implements OrderStatus {}
public record Paid(java.time.Instant at, String txId)     implements OrderStatus {}
public record Cancelled(java.time.Instant at, String why) implements OrderStatus {}

public String describe(OrderStatus s) {
    return switch (s) {
        case Pending p   -> "pending since " + p.since();
        case Paid p      -> "paid at " + p.at() + " (" + p.txId() + ")";
        case Cancelled c -> "cancelled: " + c.why();
    };
}
```

The interesting bits:
- The switch is exhaustive because `OrderStatus` is sealed and the compiler can enumerate the alternatives.
- Each case binds a typed variable (`Pending p`) you can use in the arm.
- Adding a new permitted subtype is a compile error in every existing switch - you don't have a runtime surprise.

## How it fits together

```mermaid
flowchart TB
  class[Plain class] -->|verbose, mutable| ok1[OK for entities]
  record[record] -->|concise, immutable| ok2[Best for DTOs and value carriers]
  sealed[sealed interface + records] -->|exhaustive switch| ok3[Discriminated-union-style modelling]
```

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| Jackson skips fields named like properties | Older Jackson expected `getX()` not `x()`. | Spring Boot 3 + Jackson 2.13+ handles records natively. |
| Hibernate complains about records as entities | JPA entities require a no-arg constructor and mutable state. | Use records for DTOs only; keep classic classes for entities. |
| Cannot extend a record | Records are implicitly final. | Use composition; or model the variation as a sealed interface. |
| Pattern matching switch missing a case | Compiler error: switch not exhaustive. | Add the missing case or a `default`. |
| `@Override equals` skipped | Records give it free; classes don't. | Generate via IDE or use IntelliJ's "generate equals/hashCode". |

## Exercises

1. Convert this POJO to a record: a `Customer` with `id`, `name`, `email`. Add validation in a compact constructor that rejects blank email.
2. Model a payment outcome as a sealed interface with records `Success(String txId)`, `Declined(String reason)`, `PendingReview(java.time.Instant since)`. Write a `describe` method using pattern matching.
3. Try to extend a record. Observe the compile error. Replace the record with a class and confirm equality semantics differ.

## Recap & next
- Records (Java 16+) are the modern default for immutable data carriers.
- Classes still appear constantly for entities and stateful objects; getters/setters are conventional.
- Sealed classes + records + pattern matching switch give you C#-style discriminated unions.
- Records are final, immutable, and use bare component names (`id()`, not `getId()`).
- Java 17 still lacks init-only properties, `nameof`, and `with` expressions for records.

Next, **Generics and type erasure** - the gotcha .NET developers always hit when reflection or `instanceof` enters the picture.
{% endraw %}
