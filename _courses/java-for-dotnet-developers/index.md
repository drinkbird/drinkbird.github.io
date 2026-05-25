---
layout: course-index
course_slug: java-for-dotnet-developers
permalink: /courses/java-for-dotnet-developers/
title: "Java for .NET developers"
image: java-for-dotnet.jpg
description: "Be productive on Java backends, with general fluency and some interview readiness"
last_updated: 2026-05-25
depth: intermediate
goal: "Be productive on Java backends, with general fluency and some interview readiness"
time_budget: "~15-20 hours"
created_at: 2026-05-25T00:33:03Z
modules:
  - id: 1
    slug: foundations
    dir: 01-foundations
    title: "Foundations: from the CLR to the JVM"
    summary: "Get oriented in the Java ecosystem from a .NET mental model: runtime, tooling, build systems, and project layout, ending with a runnable Spring Boot 3 app."
    learning_objectives:
      - "Map JVM concepts onto CLR equivalents and explain the differences"
      - "Install and switch JDK versions with SDKMAN"
      - "Read a Maven or Gradle build file with the confidence of a NuGet user"
      - "Navigate a standard Java project layout and classpath"
      - "Bootstrap and run a Spring Boot 3 service locally"
  - id: 2
    slug: core-language
    dir: 02-core-language
    title: "Core language: Java 17 through a C# lens"
    summary: "Work through Java 17 language features by direct comparison to C#: types, records, generics, exceptions, and collections - calling out the gotchas a .NET developer always hits."
    learning_objectives:
      - "Choose between primitives and wrapper types correctly"
      - "Use records and sealed types where a .NET dev would reach for properties or POCOs"
      - "Understand type erasure and write generic code that respects it"
      - "Decide between checked and unchecked exceptions for new code"
      - "Pick the right collection interface and implementation for a given task"
  - id: 3
    slug: idiomatic-java
    dir: 03-idiomatic-java
    title: "Idiomatic Java in practice"
    summary: "Move from translating C# to writing idiomatic Java: streams, Optional, equality contracts, annotations, and the module system."
    learning_objectives:
      - "Translate LINQ pipelines to Java streams and recognize when not to"
      - "Use Optional defensively without abusing it"
      - "Implement equals/hashCode/Comparable correctly and consistently"
      - "Read and write annotations with the confidence of a C# attribute user"
      - "Decide how much of the Java module system to adopt"
  - id: 4
    slug: spring-boot-for-aspnetcore
    dir: 04-spring-boot-for-aspnetcore
    title: "Spring Boot 3 for ASP.NET Core developers"
    summary: "Map ASP.NET Core mental models to Spring Boot 3 - dependency injection, controllers, configuration, bean lifecycles, and Spring Data JPA - with side-by-side examples."
    learning_objectives:
      - "Wire up dependencies in Spring with the fluency of a Microsoft.Extensions.DI user"
      - "Build and route REST endpoints with @RestController"
      - "Configure apps with application.yml and Spring profiles"
      - "Choose the right bean scope and understand bean lifecycles"
      - "Define entities, repositories, and queries with Spring Data JPA"
  - id: 5
    slug: integration
    dir: 05-integration
    title: "Integration: services, data, and async"
    summary: "Call other services, validate inputs, serialize JSON, handle concurrency, and write tests - all the day-to-day plumbing of a Spring Boot service."
    learning_objectives:
      - "Pick between RestClient, WebClient, and Feign for outbound calls"
      - "Validate request DTOs with Jakarta Bean Validation"
      - "Configure Jackson for the JSON shape your API needs"
      - "Write concurrent code with executors and CompletableFuture"
      - "Write unit, slice, and integration tests with JUnit 5 + Spring Boot Test"
  - id: 6
    slug: production-and-next-steps
    dir: 06-production-and-next-steps
    title: "Production and next steps"
    summary: "Package, deploy, observe, and secure Spring Boot services - then sketch the wider Java ecosystem and where to go after the course."
    learning_objectives:
      - "Package a Spring Boot app as a fat JAR or layered container image"
      - "Expose health, metrics, and traces with Actuator and Micrometer"
      - "Secure endpoints with Spring Security at a working level"
      - "Recognize and answer common Java interview questions"
      - "Pick the next steps in the Java ecosystem with intent"
---

Be productive on Java backends, with general fluency and some interview readiness
