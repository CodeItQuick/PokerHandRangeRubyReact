# Suppression Rules — Maintainability Passes

Pass-specific suppressions for: `primitive-obsession`, `feature-envy`, `mixed-abstraction-levels`.

Apply [`shared/suppression-rules.md`](../shared/suppression-rules.md) first, then the relevant section below.

---

## `primitive-obsession` suppressions

### S-PO-1. The primitive appears in only one place with no sibling domain concepts

A single `userId: string` with no other string-typed domain IDs in the same scope. Interchangeability requires at least two distinct concepts that could be confused.

### S-PO-2. The codebase uses primitives uniformly throughout

If no domain types are wrapped anywhere in the surrounding codebase, flagging a single primitive in isolation creates noise with no actionable precedent.

### S-PO-3. A branded or opaque type is already in use

```ts
type UserId = string & { readonly __brand: "UserId" };
```

The type system already enforces the boundary. No additional concern.

### S-PO-D1. Domain concept is local and not passed across module boundaries (soft — downgrade)

A `count: number` used within a single function. Downgrade and ask whether the invariant is simple enough to stay as a primitive.

### S-PO-A1. Two distinct domain concepts share the same primitive type in a public function signature (do NOT suppress)

`userId: string` and `orderId: string` as adjacent parameters. Callers can silently transpose them with no compile error.

### S-PO-A2. Validation logic for the same primitive duplicated at three or more call sites (do NOT suppress)

The scatter is concrete evidence the invariant should be encapsulated once.

---

## `feature-envy` suppressions

### S-FE-1. Legitimate orchestration function

A service layer, use-case handler, or command handler whose explicit job is to coordinate between multiple domain objects. Flag only when the function is dominated by one foreign object's data, not when it genuinely orchestrates several.

### S-FE-2. Mapper or serializer at a layer boundary

Functions that convert domain objects to DTOs, API payloads, or database rows are expected to read many fields. The conversion is the job; field access is expected.

### S-FE-3. Framework-constrained function

Controllers, resolvers, and event handlers must accept the types the framework provides. The envy may be real but restructuring is not always possible.

### S-FE-4. Short accessor — fewer than three field accesses on a single foreign object

One or two field accesses do not constitute envy. Three or more on the same object, with no `this` reference, is the threshold.

### S-FE-D1. Function belongs elsewhere but moving it is a large refactor (soft — downgrade)

The displacement is real but the fix spans multiple files. Downgrade to `medium` and ask as a design question rather than a blocking comment.

### S-FE-A1. Three or more distinct fields read from one foreign object while `this` is not referenced (do NOT suppress)

Core evidence. Flag.

### S-FE-A2. Function traverses two or more levels into a foreign object's structure (do NOT suppress)

`order.customer.contactInfo.email` — deep navigation couples the function to internal implementation details.

---

## `mixed-abstraction-levels` suppressions

### S-MAL-1. Framework-imposed bridging

Express handlers, GraphQL resolvers, and CLI commands are designed to bridge levels. A handler that reads `req.body`, calls a service, and sets `res.status` is following the framework pattern.

### S-MAL-2. Small function where the level difference is negligible

A 5-line function that calls one high-level method and does one low-level check. The cognitive cost of the mix is negligible.

### S-MAL-3. Intentional low-level module

A module explicitly responsible for serialization, encoding, or protocol handling. Mixed levels is a concern only when a higher-level module unexpectedly drops to this level.

### S-MAL-4. Single audit log line at a domain event

`logger.info("Order completed", { orderId })` at the end of a business function is an audit trail, not a level violation.

### S-MAL-D1. Inline block that is simple and called only once (soft — downgrade)

A contiguous block that could extract to a named helper but would only be called from one place and the logic is short. Downgrade and ask whether the readability benefit of extraction is worth the added indirection.

### S-MAL-A1. Raw SQL, HTTP details, or database error codes inside a service-layer function (do NOT suppress)

Strong signal of a layer violation. Flag.

### S-MAL-A2. Infrastructure setup inside a function that is supposed to execute work (do NOT suppress)

Creating loggers, connection pools, or queues inside a function that should orchestrate business logic. The setup belongs at the composition root or module boundary.