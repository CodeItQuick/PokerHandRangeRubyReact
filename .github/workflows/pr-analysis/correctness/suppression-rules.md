# Suppression Rules — Correctness Passes

Pass-specific suppressions for: `null-access`, `swallowed-exceptions`, `suspicious-conditional`, `mutation-of-input`, `implicit-boolean-coercion`, `implicit-test-ordering`.

Apply [`shared/suppression-rules.md`](../shared/suppression-rules.md) first, then the relevant section below.

---

## `null-access` suppressions

### S-NA-1. Optional chaining is used

```ts
return user?.profile?.name;
```

`?.` already handles the missing case.

### S-NA-2. Nullish coalescing supplies a default

```ts
return (user ?? defaultUser).name;
const name = user?.name ?? "Anonymous";
```

### S-NA-3. Inline guard on the same expression

```ts
return user && user.name;
return user ? user.name : null;
```

### S-NA-4. Earlier guard returns, throws, or continues

```ts
const user = users.find(u => u.id === id);
if (!user) throw new NotFound();
return user.name;   // safe
```

Also covered: `return null`, `continue`, `assertExists(user)`, `invariant(user, "...")`, `assert(user)`.

### S-NA-5. Value provably non-nullable

Locally constructed value with a non-nullable type, or a function with a non-nullable return type.

### S-NA-6. Type-checker would already error

If TypeScript with `strictNullChecks` would flag this, do not duplicate the type checker's job. Only report when the type system is being silenced (`!`, `as`, `any`) or is not in use.

### S-NA-D1. Non-null assertion with adjacent explanatory comment (soft — downgrade)

```ts
// Safe: caller guarantees user exists in this code path
const user = users.find(u => u.id === id)!;
```

Downgrade `high` to `medium`. If the comment is missing, do not downgrade.

### S-NA-D2. Contract-style parameter name (soft — downgrade)

```ts
function greet(requiredUser: User | undefined) { return requiredUser.name; }
```

Downgrade and phrase as a question about whether the parameter type should be tightened.

### S-NA-D3. Private helper whose one visible caller already guards (soft — downgrade)

If the caller is visible in the diff and guards before the call, downgrade. If the caller is not visible, do not downgrade.

### S-NA-A1. Guard on a *different* property (do NOT suppress)

```ts
if (user.id) { return user.profile.name; }  // guards id, not profile
```

### S-NA-A2. Guard inside a callback that runs later (do NOT suppress)

```ts
setTimeout(() => { if (!user) return; }, 100);
return user.name;  // synchronous, guard runs after
```

### S-NA-A3. Boolean coercion of a falsy-but-defined value (do NOT suppress)

```ts
if (user.count) { return data[user.count].name; }  // count may be 0
```

### S-NA-A4. Type assertion that lies (do NOT suppress)

```ts
const user = users.find(u => u.id === id) as User;
```

`as` is not a runtime check. Treat the same as a non-null assertion without a comment.

---

## `swallowed-exceptions` suppressions

### S-SE-1. The error is re-thrown or propagated

Any `throw` in the catch body — direct re-throw or `throw new Err("msg", { cause: e })` — means the error is not swallowed.

### S-SE-2. The error is passed to a continuation

```ts
callback(err); reject(err); next(err); observer.error(err);
```

Handed off to a downstream handler; the catch is a translation layer.

### S-SE-3. Best-effort / cleanup code with no caller dependency

```ts
async function closeConnection() {
  try { await conn.close(); } catch { /* may already be closed */ }
}
```

When the operation is a finalizer and callers do not check its return value, suppress.

### S-SE-4. Catch calls a clearly-named error-handling function

`handleError(err)`, `reportToSentry(err)`, `logError(err)`, `captureException(err)`, `trackError(err)`. Ambiguous names like `process(err)` do not qualify.

### S-SE-5. Error is recorded in observable state

```ts
this.error = err; this.status = "failed";
```

The exception is converted to a signal the caller can read — not swallowed.

### S-SE-D1. Log-only at `warn` or `error` level (soft — suppress)

`logger.error(...)` / `logger.warn(...)` makes the failure visible in observability tooling. Suppress. A bare `console.log` does not qualify.

### S-SE-D2. Returns a typed sentinel the caller visibly checks (soft — suppress)

If the caller is visible in the diff and checks the sentinel value, suppress.

### S-SE-D3. Retry wrapper that re-throws on the final attempt (soft — suppress)

```ts
for (let i = 0; i < 3; i++) {
  try { return await op(); }
  catch (e) { if (i === 2) throw e; await sleep(delay); }
}
```

### S-SE-A1. Log-only at `console.log` or `logger.debug` (do NOT suppress)

Not error handling. Still flag.

### S-SE-A2. Conditional re-throw (do NOT suppress)

```ts
if (shouldRethrow) throw err;
```

May silently swallow. Still flag.

### S-SE-A3. Error assigned to an unused local (do NOT suppress)

```ts
const ignored = err;
```

Not handling. Still flag.

### S-SE-A4. Re-thrown without cause chain (do NOT suppress)

```ts
throw new Error("Something went wrong");  // `e` not included
```

Flag at `medium` with a suggested fix to add `{ cause: e }`.

---

## `suspicious-conditional` suppressions

### S-SC-1. Compile-time or environment constant

```ts
if (process.env.NODE_ENV === "production") { ... }
if (DEBUG) { ... }
if (__DEV__) { ... }
```

Intentionally always-true or always-false per build; the "dead branch" is tree-shaken.

### S-SC-2. Feature flag or kill switch

```ts
if (FEATURE_NEW_CHECKOUT) { ... }
if (flags.isEnabled("dark-mode")) { ... }
```

Designed to be toggled; the branch is live by intent.

### S-SC-3. `NaN` self-comparison as an `isNaN` check

```ts
if (value !== value) { ... }
```

Canonical pre-ES6 idiom. Only flag when the operand cannot be `NaN` (e.g., `items.length`).

### S-SC-4. Intentional assignment-in-condition with documentation

```ts
while ((chunk = stream.read()) !== null) { ... }
```

Idiomatic in streaming/parsing loops. Suppress when it is a known idiom or a comment signals intent.

### S-SC-5. Double negation for boolean coercion of a non-boolean

```ts
const isVisible = !!element.offsetParent;
```

`!!` on a non-boolean is intentional coercion. Only flag `!!` when the operand is already `boolean`.

### S-SC-6. Defensive null check on `any`-typed or externally-sourced data

```ts
const parsed = JSON.parse(raw) as Config;
if (parsed.field !== null) { ... }
```

TypeScript type is not authoritative here; the check may be legitimately defensive.

### S-SC-7. Established JS idiom guards

```ts
if (typeof value === "undefined") { ... }
if (value == null) { ... }   // intentional loose equality
```

Do not flag as broken null comparison.

### S-SC-D1. Off-by-one where boundary is established by tests or assertions (soft — downgrade)

Downgrade from `high` to `medium`; phrase as a question.

### S-SC-D2. Redundant guard with a forward-looking comment (soft — downgrade)

```ts
// Guard here for future callers
if (count < 0) return;
```

Downgrade and ask: "Is this guard needed today, or could it be an assertion?"

### S-SC-D3. Precedence issue where result is identical for all current inputs (soft — downgrade)

If `a || b && c` and `(a || b) && c` produce the same result for all reachable values, downgrade to `medium`. Code is misleading but not immediately broken.

### S-SC-A1. `else if` that negates the `if` (do NOT suppress)

```ts
if (isReady) { ... } else if (!isReady) { ... }
```

Always true in the else branch; never intentional.

### S-SC-A2. Duplicate condition with a different body (do NOT suppress)

```ts
if (status === "active") { enable(); }
else if (status === "active") { log(); }
```

Different bodies confirm copy-paste intent; still flag.

### S-SC-A3. Bitwise operator on boolean operands without a comment (do NOT suppress)

```ts
if (isAdmin & hasPermission) { ... }
```

Extremely rare intentional use must be documented. Without a comment, flag.

### S-SC-A4. Self-comparison on a non-float value (do NOT suppress)

```ts
if (items.length !== items.length) { ... }
if (userId === userId) { ... }
```

The NaN-check idiom applies only to values that can actually be `NaN`.

---

## `mutation-of-input` suppressions

### S-MOI-1. Function name signals mutation

`sort`, `mutate`, `update`, `fill`, `assign`, `set`, `modify`, `append`, `remove`, `clear`, `reset` in the function name. Callers are warned by the name that mutation is the contract.

### S-MOI-2. Parameter type is a builder or accumulator

`Buffer`, `WritableStream`, `StringBuilder`, `Set`, `Map`, or any type whose documented contract is to be mutated in place. These types exist to be written to.

### S-MOI-3. Return type is `void` and name is imperative

A `void` function with an imperative name (`populate`, `fill`, `initialize`) signals that mutation is the intended API surface.

### S-MOI-4. Object is created immediately before the call with no prior reference

```ts
const arr = [];
populateWithDefaults(arr);
```

The caller holds no prior reference to the object, so the mutation is not observable by any other holder.

### S-MOI-D1. Ambiguous function name (soft — downgrade)

`process(item)`, `handle(item)` — name neither signals nor rules out mutation. Downgrade to `medium` and ask the author to clarify the contract.

### S-MOI-A1. In-place array method used on a parameter when function name implies a copy (do NOT suppress)

`sort`, `reverse`, `splice`, `push` directly on a parameter when the function is named `transform`, `filter`, `map`, or similar. The name implies a pure transformation; the implementation mutates.

### S-MOI-A2. Return value is the same reference as the input (do NOT suppress)

```ts
function addItem(cart: Cart, item: Item): Cart {
  cart.items.push(item);
  return cart;   // same reference
}
```

Returning the mutated input while the signature suggests a pure transformation is the highest-confidence form of this pattern.

---

## `implicit-boolean-coercion` suppressions

### S-IBC-1. Value typed as `string | null | undefined` and empty string should be treated as absent

```ts
if (name) { ... }  // name: string | null | undefined
```

When the intent is "does this string exist and have content", the truthiness check is idiomatic and correct. Only flag when empty string is a plausible valid value in the domain.

### S-IBC-2. `||` for a boolean default where the left side is always boolean

`const enabled = flag || false` — `false` is the only falsy value in boolean space; the default correctly replaces it.

### S-IBC-3. `&&` in JSX where the condition is a boolean expression

`{isVisible && <Component />}` — `false && ...` renders nothing. Risk only exists when the left side is a non-boolean type.

### S-IBC-4. `.filter(Boolean)` on an array typed as `(T | null | undefined)[]`

Objects and class instances are always truthy; `.filter(Boolean)` removes only `null` and `undefined`. Correct when the element type cannot include `0`, `""`, or `false`.

### S-IBC-5. `??` already used in place of `||`

The author is already handling the nullish-vs-falsy distinction correctly.

### S-IBC-D1. Truthiness on `boolean | undefined` where the `false`/`undefined` distinction may matter (soft — downgrade)

Downgrade and ask whether the caller ever needs to distinguish "explicitly disabled" (`false`) from "not configured" (`undefined`).

### S-IBC-A1. `||` default where `0` or `""` is a plausible valid domain value (do NOT suppress)

`const count = options.count || 10` where `0` means "no items." Flag and suggest `??`.

### S-IBC-A2. JSX `{count && ...}` where `count` is typed as `number` (do NOT suppress)

Renders `"0"` as a text node when `count` is zero. Flag.

### S-IBC-A3. `.filter(Boolean)` on an array that may contain `0`, `""`, or `false` as valid members (do NOT suppress)

Silently drops valid values. Flag.

---

## `implicit-test-ordering` suppressions

### S-ITO-1. `beforeEach` recreates all state referenced by the test

Every variable read by the test is freshly initialized in `beforeEach`. The test is fully self-contained regardless of execution order.

### S-ITO-2. Test framework enforces sequence declaratively

`jest-sequential`, `--runInBand` with explicit ordering configuration, or a framework with declared test dependencies. If the ordering is enforced, not assumed, suppress.

### S-ITO-3. `beforeAll` seeds read-only reference data

A `beforeAll` that creates lookup tables, seeds a schema, or spins up a server — and no test mutates the result. Suppress when the shared resource is treated as read-only.

### S-ITO-4. Scenario test explicitly documented as sequential

A `describe` block with a comment stating the tests are a declared lifecycle sequence. Suppress and leave a note about the tradeoff of not using `beforeEach`.

### S-ITO-D1. Sequential test names but tests are independently self-contained (soft — downgrade)

Names use numbers but each test has its own arrange step. Downgrade and suggest removing the numbering to avoid implying an order.

### S-ITO-A1. `beforeAll` creates a mutable shared object that tests write to (do NOT suppress)

Any mutation of the shared resource makes execution order matter.

### S-ITO-A2. Test has an obvious data requirement with no arrange step (do NOT suppress)

A test that uses a record ID it never creates. Even if a prior test happens to produce it, the ordering dependency is real.