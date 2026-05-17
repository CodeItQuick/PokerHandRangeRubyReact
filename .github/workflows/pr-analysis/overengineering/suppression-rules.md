# Suppression Rules — Overengineering Passes

Pass-specific suppressions for: `boolean-flag-splitter`, `passthrough-wrapper`.

Apply [`shared/suppression-rules.md`](../shared/suppression-rules.md) first, then the relevant section below.

---

## `boolean-flag-splitter` suppressions

### S-BFS-1. The flag selects a minor output variation with shared core logic

```ts
function formatDate(date: Date, includeTime: boolean): string {
  const base = date.toLocaleDateString();
  return includeTime ? `${base} ${date.toLocaleTimeString()}` : base;
}
```

Both branches share the same core logic; the flag appends an optional suffix. The split is cosmetic, not fundamental.

### S-BFS-2. The flag is passed as a runtime variable, not a literal

```ts
const detailed = config.verboseMode;
renderReport(data, detailed);
```

When callers pass a variable rather than a literal, the flag is a genuine runtime toggle, not a static decision in disguise.

### S-BFS-3. The function is a well-known idiom

`stringify(value, pretty: boolean)`, `serialize(data, compact: boolean)` — canonical patterns recognized across the ecosystem. Splitting these would break familiarity.

### S-BFS-D1. Branches share significant setup but diverge at the end (soft — downgrade)

Two branches that share 70%+ of their code and diverge only in the final step. Downgrade to `medium` and ask whether the variation warrants a second function or is small enough to stay.

### S-BFS-A1. Two branches have different I/O or fundamentally different control flow (do NOT suppress)

One branch reads from a file, the other from HTTP. Or one branch returns early, the other iterates. The operations are different in kind, not just in degree.

### S-BFS-A2. Flag is threaded through intermediate functions that don't use it directly (do NOT suppress)

Threading through two or more layers without direct use is a strong signal that two separate call chains should exist.

---

## `passthrough-wrapper` suppressions

### S-PW-1. The wrapper adapts the calling convention

Parameter reordering, partial application, default argument injection, name adaptation for a different interface, or narrowing a union type to a specific member. The wrapper is doing translation work.

### S-PW-2. The wrapper exists to enable dependency injection or testability

```ts
class Notifier {
  constructor(private mailer: Mailer) {}
  send(to: string, body: string) { return this.mailer.send(to, body); }
}
```

The wrapper makes `Notifier` mockable independently of `Mailer`. The indirection is the point.

### S-PW-3. The wrapper enforces an interface or base class contract

A method that implements an interface by delegating to an injected collaborator. The delegation satisfies the contract; there is no redundancy.

### S-PW-4. The wrapper adds any cross-cutting concern

Logging, metrics, retry, caching, error translation, access control — even if small — mean the wrapper is not a pure passthrough.

### S-PW-D1. Wrapper has an aspirational name suggesting planned behavior (soft — downgrade)

`processPayment` currently only calls `gateway.charge()` but the name implies future expansion. Downgrade and ask whether planned behavior is imminent or speculative.

### S-PW-A1. Parameters map 1:1 and callers could import the target directly (do NOT suppress)

No reordering, defaulting, or narrowing. Flag as `Suggested:` — the author may have a reason, so ask rather than assert.