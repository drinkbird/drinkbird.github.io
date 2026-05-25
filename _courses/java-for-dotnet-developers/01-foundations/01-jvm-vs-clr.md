---
chapter_id: 1
chapter_slug: jvm-vs-clr
chapter_title: "JVM vs. CLR: runtimes, bytecode, and what platform-independent really means"
chapter_summary: "Compares the JVM and CLR side by side: bytecode granularity (per-class .class vs. per-assembly .dll), class loading (lazy vs. eager), tiered JIT, and what platform-independent actually delivers. Closes with HotSpot vs. RyuJIT warm-up behaviour and the GraalVM Native Image vs. .NET NativeAOT trade-off."
---

{% raw %}
## What you'll learn
- How the JVM and CLR differ in bytecode, class loading, and execution model.
- Where HotSpot's JIT diverges from RyuJIT in practice, and when it matters.
- What "platform-independent" actually delivers in 2026, and what it doesn't.
- How AOT options (GraalVM Native Image vs. ReadyToRun / NativeAOT) compare.

## Concepts

The CLR and the JVM solve the same problem - execute portable bytecode safely and quickly - and they look more alike than different. Both compile a source language to a typed intermediate representation (CIL for .NET, JVM bytecode for Java). Both verify that intermediate at load time. Both interpret cold code and JIT-compile hot code. Both ship a garbage collector and a managed heap.

The differences are mostly in the details that bite you on day one.

Bytecode granularity is the first. The JVM ships one `.class` file per top-level class - a single source file with five classes produces five `.class` files. The CLR aggregates types into assemblies (`.dll`/`.exe`) keyed by manifest. That difference shows up everywhere: the JVM's deployment unit is a JAR (a ZIP of `.class` files plus a manifest), while .NET ships assemblies that are themselves the deployment unit. When debugging classpath issues, remember that the JVM resolves *classes*, not *modules* - every `.class` is independent.

Class loading is the second. The JVM uses a delegating hierarchy of class loaders - bootstrap, platform, application, plus any you write. A class is loaded *lazily*, on first reference. The CLR loads assemblies and pulls in types more eagerly via the AssemblyLoadContext model. The practical consequence: a Java app can start up while a class with a missing dependency just sits on disk, never loaded, never failing. The same situation in .NET often surfaces at JIT time for the calling method. Class loading is also why "duplicate classes on the classpath" can silently shadow each other - the first loader to resolve the name wins.

Both runtimes JIT. HotSpot has two tiers, C1 (fast, less optimized) and C2 (slow, aggressive). Most methods interpret first, get promoted to C1 after ~1,500 invocations, then to C2 after another ~10,000. RyuJIT in .NET historically had one tier; tiered compilation in .NET 6+ closed that gap. The visible difference is that HotSpot benchmarks are notoriously sensitive to warm-up - single-shot timings tell you almost nothing about steady-state performance. Run a warm-up loop, or use [JMH](https://github.com/openjdk/jmh).

"Platform-independent" means *bytecode portability*, not *binary portability*. The same `.jar` runs on Linux, macOS, and Windows, assuming a compatible JVM is installed on the host. .NET took longer to get here - Mono, then .NET Core, then unified .NET 5+ - but in 2026 the gap is essentially closed. What Java still wins on is "any JDK works" with little fuss; what .NET wins on is single-file self-contained publish, which Java answered with `jlink` and `jpackage` only recently.

AOT (ahead-of-time native compilation) is the asymmetric story. .NET ships ReadyToRun for startup acceleration and NativeAOT for fully native binaries - both first-party. Java's answer is [GraalVM Native Image](https://www.graalvm.org/latest/reference-manual/native-image/), which is a separate distribution and historically friction-heavy: reflection, resource loading, and dynamic proxies all need explicit configuration. Spring Boot 3 makes this much more tractable (Spring AOT generates the metadata), but it's still the road less travelled in enterprise Java.

## Walkthrough

The same trivial program, compiled to bytecode in each runtime, to make the layering concrete.

```java
// Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("hello, jvm");
    }
}
```

```bash
javac Hello.java        # Hello.class - JVM bytecode
java Hello              # JVM loads, verifies, interprets, JITs hot paths
javap -c Hello          # disassemble bytecode (stack-based, typed)
```

Compare with .NET:

```csharp
// Hello.cs
public class Hello {
    public static void Main() => System.Console.WriteLine("hello, clr");
}
```

```bash
dotnet build            # produces Hello.dll containing CIL
dotnet Hello.dll        # CLR loads the assembly, executes
```

Both bytecodes are stack-based and typed. JVM ops you'll see (`getstatic`, `invokevirtual`, `ldc`) map closely to CIL ops (`ldsfld`, `callvirt`, `ldstr`). The mental model is identical - pushing values onto an operand stack, calling methods that consume and produce values.

## How it fits together

```mermaid
flowchart LR
  src[Source .java / .cs] --> ir[Bytecode .class / .dll]
  ir --> loader[Class loader / AssemblyLoadContext]
  loader --> interp[Interpreter / Tier 0]
  interp -->|hot| jit[JIT C1/C2 / Tier 1]
  jit --> native[Native code]
```

The shapes match. The labels differ.

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| Microbenchmarking a single JVM run | HotSpot is still interpreting; you're not measuring steady state. | Add a warm-up loop or use JMH. |
| Expecting one file per class in a JAR | A JAR aggregates `.class` files, but each top-level class is still its own `.class`. | `jar tf app.jar` to see the layout. |
| Assuming AOT works out-of-the-box | Reflection and dynamic class loading break Native Image unless declared. | Use the GraalVM tracing agent or Spring Boot's AOT support. |
| Treating "bytecode" as native code | It's a portable IR for both runtimes. | Run `javap -c` and `ildasm` once to internalize the difference. |
| Confusing the JVM with the JDK | JVM is the runtime; JDK is JVM + compiler + tools. | Always install a JDK - a JRE-only install has no `javac`. |

## Exercises

1. Take any trivial method and dump its bytecode with `javap -c` and `ildasm` (or `dotnet-ildasm`). Annotate three opcodes from each that do the same work.
2. Write a hot loop and time the first 100 iterations versus iterations 10,000–10,100 in both runtimes. Account for HotSpot's two-tier JIT in your write-up.
3. Build the same trivial program once as a fat JAR and once as a NativeAOT (.NET) binary. Compare startup time and on-disk size.

## Recap & next

- The JVM and CLR are siblings: typed bytecode, lazy loading, GC, tiered JIT.
- Class loading is per-class and lazy in Java, per-assembly and eager in .NET - that shapes the failure modes.
- "Platform-independent" means bytecode portability; both runtimes deliver it in 2026.
- AOT is a first-party story in .NET; in Java it's GraalVM, with Spring Boot 3 making it tractable.
- HotSpot's two-tier JIT means benchmark warm-up is non-negotiable.

Next, **JDK, JRE, and SDKMAN: tooling vs. the .NET SDK** - installing, switching, and orchestrating the Java toolchain.
{% endraw %}
