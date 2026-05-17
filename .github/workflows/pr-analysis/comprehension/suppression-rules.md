# Suppression Rules — Comprehension Passes

Pass-specific suppressions for: `overly-clever-one-liner`, `inconsistent-abstraction-in-name`.

Apply [`shared/suppression-rules.md`](../shared/suppression-rules.md) first, then the relevant section below.

---

## `overly-clever-one-liner` suppressions

### S-OCL-1. Established single-expression idiom

`arr.includes(x)`, `x ?? default`, `obj?.prop`, `Math.min(a, b)`, `(n & 1) === 0`, `!!value`, `+string`. Readable because universally recognized.

### S-OCL-2. Short ternary for a two-way choice with no nesting

`const label = isActive ? "Active" : "Inactive"` — one condition, two short branches, immediately legible.

### S-OCL-3. Two or three chained array methods where the data shape is obvious

`users.filter(u => u.active).map(u => u.email)` — the shape does not require tracing.

### S-OCL-4. Performance-critical code with an adjacent explaining comment

A bit trick in a tight loop with a comment explaining why the idiom was chosen. The tradeoff is documented.

### S-OCL-D1. Three-deep chain where an intermediate name would help (soft — downgrade)

Three methods chained where the middle result's shape is non-obvious. Downgrade and suggest naming the intermediate.

### S-OCL-A1. Nested ternaries — two or more levels (do NOT suppress)

Always flag. The saving is one line; the cost is every future reader.

### S-OCL-A2. `~indexOf` or bit shift for a non-bit purpose (do NOT suppress)

Not universally recognized idioms. Flag and suggest the readable equivalent.

### S-OCL-A3. Side effect hidden inside `&&` or `||` short-circuit (do NOT suppress)

Mutations, assignments, and function calls with side effects hidden in a logical expression are always worth flagging.

---

## `inconsistent-abstraction-in-name` suppressions

### S-IAN-1. Single isolated name with no siblings to contrast against

A naming inconsistency needs at least one sibling name in the same scope to confirm the pattern. A lone outlier is weak evidence — suppress unless the name itself encodes a mechanism in a clearly business-level context.

### S-IAN-2. Framework-imposed naming

Controllers, resolvers, CLI handlers, and middleware often use technical names because the framework requires it (`handleRequest`, `resolveQuery`).

### S-IAN-3. Accepted domain shorthands

`req`, `res`, `ctx`, `dto`, `db`, `repo`, `tx` — conventional abbreviations used consistently across the codebase. Not abstraction violations.

### S-IAN-4. Established ORM or persistence idioms

`getOrCreate`, `findOrCreate`, `upsert` — well-known patterns whose compound verb is conventional, not surprising.

### S-IAN-D1. Single function with a mechanism-encoding name but no siblings to confirm the pattern (soft — downgrade)

Downgrade and ask whether the name could be simplified to hide the mechanism, without asserting there is a pattern.

### S-IAN-A1. Two or more sibling functions in the same module mixing domain and persistence vocabulary (do NOT suppress)

Multiple instances confirm a systemic naming inconsistency.

### S-IAN-A2. Function named as a query (`get`, `find`, `is`, `has`) that has documented or visible side effects (do NOT suppress)

The name creates a false expectation of purity that callers will act on.