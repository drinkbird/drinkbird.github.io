---
chapter_id: 3
chapter_slug: spring-security-basics
chapter_title: "Security basics: Spring Security vs. ASP.NET Core Identity"
chapter_summary: "Configures Spring Security 6 via SecurityFilterChain beans (the WebSecurityConfigurerAdapter replacement), sets up OAuth2 resource server with JWT validation, maps JWT scopes to authorities, and enables method-level checks with @PreAuthorize + @EnableMethodSecurity."
---

{% raw %}
## What you'll learn
- The Spring Security 6 model: filter chains, authentication, authorization.
- Configuring the `SecurityFilterChain` bean - the modern replacement for `WebSecurityConfigurerAdapter`.
- Setting up an OAuth2 / JWT resource server.
- Method-level security with `@PreAuthorize`.

## Concepts

Spring Security is the authentication/authorization library for Spring applications. It's older, denser, and more flexible than ASP.NET Core's built-in security - and that flexibility costs you in onboarding.

The mental model:

- An incoming HTTP request passes through a **chain of servlet filters**, configured by a `SecurityFilterChain` bean.
- Filters perform authentication (extract a token, look up a user), then authorization (allow / deny).
- After filtering, the request reaches Spring MVC's dispatcher.
- A `SecurityContext` (thread-local) carries the authenticated principal through the request.

The .NET parallel is the middleware pipeline: `app.UseAuthentication(); app.UseAuthorization();`. Spring's filter chain is more granular and more configurable.

### Configuring the filter chain

Spring Security 6 (Spring Boot 3) uses a bean-style configuration. No more inheriting `WebSecurityConfigurerAdapter` (which is removed in 6).

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain api(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())                  // stateless API
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/actuator/health/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .build();
    }
}
```

What's happening:
- `csrf().disable()` - appropriate for stateless REST APIs that don't use cookies. Keep it on for server-rendered HTML with forms.
- `authorizeHttpRequests` - declares per-path authorization.
- `oauth2ResourceServer().jwt(...)` - accept JWT bearer tokens, validating against the issuer's JWK set.
- `STATELESS` - don't create HTTP sessions; rely on tokens for every request.

The chained builder is reminiscent of ASP.NET Core's middleware DSL but more verbose. Read top to bottom; ordering of `requestMatchers` matters (first match wins).

### JWT resource server

The `oauth2ResourceServer().jwt()` path expects:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://auth.example.com
          # alternatively jwk-set-uri for the JWKS endpoint directly
```

Spring fetches the issuer's metadata, validates incoming `Authorization: Bearer <token>` headers, and populates the `SecurityContext` with the token's claims. The `Authentication` object is a `JwtAuthenticationToken`; `jwt.getClaim("scope")` extracts scopes.

To map scopes to Spring's `GrantedAuthority` model:

```java
@Bean
public JwtAuthenticationConverter jwtAuthConverter() {
    var grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
    grantedAuthoritiesConverter.setAuthorityPrefix("SCOPE_");
    grantedAuthoritiesConverter.setAuthoritiesClaimName("scope");

    var converter = new JwtAuthenticationConverter();
    converter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
    return converter;
}
```

Now scopes like `orders:read` become authorities `SCOPE_orders:read`, usable in expressions:

```java
.requestMatchers(HttpMethod.GET, "/api/orders/**").hasAuthority("SCOPE_orders:read")
```

### Method-level security

`@PreAuthorize` annotations on service or controller methods enforce checks before the method runs. Enable with `@EnableMethodSecurity`:

```java
@Configuration
@EnableMethodSecurity
public class MethodSecurityConfig {}

@Service
public class OrderService {

    @PreAuthorize("hasAuthority('SCOPE_orders:write')")
    public Order create(NewOrder req) { /* ... */ }

    @PreAuthorize("#id == authentication.principal.subject or hasRole('ADMIN')")
    public Order findById(long id) { /* ... */ }
}
```

The Spring Expression Language (SpEL) inside `@PreAuthorize` is powerful - it can reference parameters (`#id`), the authentication object, and built-in functions (`hasRole`, `hasAuthority`).

The .NET equivalent is `[Authorize(Policy = "...")]` plus a policy registration. Spring is more expression-driven; .NET more policy-driven. Both shapes work.

### Password-based login (when relevant)

For server-rendered apps or admin consoles, configure form login:

```java
@Bean
public SecurityFilterChain admin(HttpSecurity http) throws Exception {
    return http
        .securityMatcher("/admin/**")
        .authorizeHttpRequests(a -> a.anyRequest().hasRole("ADMIN"))
        .formLogin(Customizer.withDefaults())
        .logout(Customizer.withDefaults())
        .build();
}
```

You can have **multiple `SecurityFilterChain` beans**: one for `/api/**`, one for `/admin/**`. Each chain has its own `securityMatcher` and its own authentication mechanism.

### Password encoders

Never store passwords in plaintext. Spring provides several password encoders:

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();   // or Argon2PasswordEncoder for new code
}
```

Argon2 is the modern recommendation; BCrypt is the conservative default. Both are slow on purpose, which defeats brute-force attempts.

### CSRF, CORS, and sensible defaults

- **CSRF** is enabled by default. Disable only for stateless APIs that don't accept browser cookies.
- **CORS** is configured separately, via `CorsConfigurationSource`:

  ```java
  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
      var cfg = new CorsConfiguration();
      cfg.setAllowedOrigins(List.of("https://app.example.com"));
      cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
      cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
      var src = new UrlBasedCorsConfigurationSource();
      src.registerCorsConfiguration("/api/**", cfg);
      return src;
  }
  ```

  Then enable in the chain: `.cors(Customizer.withDefaults())`.

- **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.) are added by default - Spring Security's sensible defaults. Customize via `.headers(...)`.

## Walkthrough

A complete JWT-protected API:

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health/**", "/actuator/prometheus").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter())))
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthConverter() {
        var auth = new JwtGrantedAuthoritiesConverter();
        auth.setAuthorityPrefix("SCOPE_");
        auth.setAuthoritiesClaimName("scope");
        var conv = new JwtAuthenticationConverter();
        conv.setJwtGrantedAuthoritiesConverter(auth);
        return conv;
    }
}

@RestController
@RequestMapping("/api/orders")
class OrderController {

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_orders:read')")
    public Order get(@PathVariable long id, @AuthenticationPrincipal Jwt jwt) {
        // jwt.getClaim("sub") gives the user id
        return service.findById(id).orElseThrow();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_orders:write')")
    public ResponseEntity<Order> create(@Valid @RequestBody NewOrder body) { /* ... */ }
}
```

`@AuthenticationPrincipal Jwt jwt` injects the decoded JWT into the controller method. Spring's argument resolver handles it automatically.

## How it fits together

```mermaid
flowchart LR
  req[HTTP request] --> filter1[CORS filter]
  filter1 --> filter2[JWT auth filter]
  filter2 -->|extract Bearer| jwt[Validate JWT signature/exp]
  jwt --> ctx[SecurityContext set]
  ctx --> filter3[Authorization filter]
  filter3 -->|allow| mvc[MVC dispatcher]
  filter3 -.->|deny| 403[403 Forbidden]
  mvc --> ctrl[Controller]
  ctrl --> pre[@PreAuthorize check]
  pre -->|allow| business[Business logic]
  pre -.->|deny| 403
```

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| 401 on every endpoint after adding Security | Default-deny once Security is on the classpath. | Explicitly `permitAll()` public endpoints. |
| CSRF blocks POSTs from a non-browser client | CSRF on by default. | Disable for stateless APIs; keep for forms. |
| JWT validation fails with "invalid issuer" | Wrong `issuer-uri`. | Match the `iss` claim exactly. |
| Authority check doesn't match scope | Default authority prefix is `SCOPE_` but you compared against `orders:read`. | Use `SCOPE_orders:read` or set a custom prefix. |
| `@PreAuthorize` ignored | `@EnableMethodSecurity` missing. | Add it to a `@Configuration` class. |

## Exercises

1. Add Spring Security to a service and configure JWT resource server with a sample issuer (e.g. Keycloak or Auth0 dev tenant). Confirm 401 without a token, 200 with a valid one.
2. Add `@PreAuthorize` to two endpoints with different scopes. Issue tokens with each scope and verify the authorization decisions.
3. Configure CORS for a single frontend origin. Confirm preflight `OPTIONS` requests succeed and cross-origin `POST`s work from your dev frontend.

## Recap & next

- Spring Security 6 configures via `SecurityFilterChain` beans, not class inheritance.
- `oauth2ResourceServer().jwt(...)` is the standard JWT setup for stateless APIs.
- `@PreAuthorize` + `@EnableMethodSecurity` enables expression-driven method-level checks.
- Disable CSRF for stateless APIs only; keep it on for form-based apps.
- Always configure CORS explicitly; never set `Access-Control-Allow-Origin: *` for endpoints behind authentication.

Next, **Java interview survival kit** - the idioms, gotchas, and conventions interviewers test.
{% endraw %}
