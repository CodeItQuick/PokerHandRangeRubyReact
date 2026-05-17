# Suppression Rules — Shared

A noisy reviewer is worse than a quiet one. **When in doubt, suppress.** Apply these shared suppressions first, then the pass-specific rules in the relevant category file.

**Category suppression files:**
- [`correctness/suppression-rules.md`](../correctness/suppression-rules.md) — null-access, swallowed-exceptions, suspicious-conditional, mutation-of-input, implicit-boolean-coercion, implicit-test-ordering
- [`overengineering/suppression-rules.md`](../overengineering/suppression-rules.md) — boolean-flag-splitter, passthrough-wrapper
- [`maintainability/suppression-rules.md`](../maintainability/suppression-rules.md) — primitive-obsession, feature-envy, mixed-abstraction-levels
- [`comprehension/suppression-rules.md`](../comprehension/suppression-rules.md) — overly-clever-one-liner, inconsistent-abstraction-in-name

---

## Shared suppressions (apply to all passes)

### S-ALL-1. The candidate is in unchanged code

If the line in question is not part of the diff, do not report it. This skill reviews *what changed*. Pre-existing issues are out of scope unless the user explicitly asks.

### S-ALL-2. Test code intentionally exercising a failure path

```ts
it("throws when user is missing", () => { ... });
await expect(fn()).rejects.toThrow();
expect(() => user.name).toThrow();
```

Tests that deliberately trigger failure are not bugs — they are assertions on failure behavior.

### S-ALL-3. The pattern is documented as intentional

An adjacent comment that states *why* the code is safe or intentional — not merely "intentional" — is sufficient to suppress. The comment must give the reason, not just assert intent.