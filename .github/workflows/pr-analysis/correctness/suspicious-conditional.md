# Detection Patterns — Suspicious Conditional

Patterns that frequently produce broken or meaningless conditionals. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the suspicious-conditional suppression rules in `references/suppression-rules.md` before reporting.

## 1. Off-by-one boundary operator (`>` vs `>=`, `<` vs `<=`)

```ts
for (let i = 0; i < items.length - 1; i++) { ... }  // skips last item
if (retries > MAX_RETRIES) { ... }                    // runs one extra iteration
if (age > 18) { ... }                                 // excludes exactly-18
```

Boundary errors are invisible at runtime until an edge-case input triggers the missing or extra iteration. Check whether sibling code, tests, or a stated invariant implies a different operator.

## 2. Self-comparison (always true or always false)

```ts
if (x === x) { ... }
if (items.length !== items.length) { ... }
```

A value compared to itself is always `true` for `===`/`==` (except `NaN`) and always `false` for `!==`/`!=`. Almost always a copy-paste error where one operand should differ.

## 3. Duplicate condition in an `if`/`else if` chain

```ts
if (status === "active") { enable(); }
else if (status === "pending") { queue(); }
else if (status === "active") { log(); }   // duplicate — dead branch
```

The repeated condition can never be reached. The branch body is either dead code or the condition was meant to be something else.

## 4. Negation of the immediately preceding condition

```ts
if (isReady) { start(); }
else if (!isReady) { wait(); }  // `else if (!isReady)` is always true when the else executes
```

An `else if` that negates the `if` condition is always true — equivalent to a plain `else`. The intent was probably a different condition.

## 5. Condition comparing a non-nullable value to `null` or `undefined`

```ts
const count = items.length;      // number, never null
if (count === null) { ... }      // dead branch
if (count !== undefined) { ... } // always true
```

When the type is non-nullable, a null/undefined comparison is always the same result.

## 6. Comparing a boolean to a string literal

```ts
const isEnabled: boolean = getFlag();
if (isEnabled === "true") { ... }   // always false — boolean is never a string
```

Boolean values are never string `"true"` or `"false"`. The comparison is always `false`.

## 7. Assignment inside a condition (unintended `=` instead of `===`)

```ts
if (user = getUser()) { ... }   // assigns, then tests truthiness of the result
```

Almost always a typo for `===`. The exception is C-style intentional assignment-in-condition, which must be documented to suppress.

## 8. Bitwise operator used instead of logical operator

```ts
if (isAdmin & hasPermission) { ... }   // & is bitwise AND, not logical &&
if (isActive | isPending) { ... }      // | is bitwise OR, not logical ||
```

`&` and `|` evaluate both sides and do not short-circuit. On boolean operands the result is usually the same, but the intent is almost always `&&` / `||`. On non-boolean operands the semantics differ.

## 9. Condition that tests a property that cannot exist on the type

```ts
type Response = { data: string; status: number };
const res: Response = await fetch();
if (res.error) { ... }    // `error` does not exist on Response — always undefined/falsy
```

Accessing an absent property is always `undefined`, making the condition always falsy.

## 10. Logical operator precedence confusion

```ts
if (a || b && c) { ... }      // parsed as a || (b && c), not (a || b) && c
if (!a && b || c) { ... }     // parsed as (!a && b) || c, not !a && (b || c)
```

`&&` binds tighter than `||`, producing a different evaluation order than the author likely intended. Flag when the non-parenthesized form differs from the form the author probably meant, supported by context.

## 11. Redundant double negation on a boolean

```ts
if (!!isActive) { ... }        // equivalent to if (isActive)
if (!(!hasPermission)) { ... }
```

Double negation is a no-op when the value is already boolean. Flag only when type evidence confirms the value is `boolean`.

## 12. Short-circuit always resolving to one operand due to a literal

```ts
const value = true || expensiveCall(); // always `true`; right side is dead code
const result = null && process(data);  // always `null`; right side is dead code
```

When the left operand is a literal that short-circuits unconditionally, the right operand is dead code. Flag when the left operand is a literal (not a variable).

---

## Patterns to **not** flag

- `NaN !== NaN` — defined behavior; only flag when the operand cannot be `NaN`
- Intentional assignment-in-condition with a comment: `while ((line = readline()))` documented as intentional
- `if (DEBUG) { ... }` — feature flags and compile-time constants are intentionally always-true or always-false
- `if (process.env.NODE_ENV === "test") { ... }` — environment guards
- Defensive `!== null` on externally-sourced data (`JSON.parse`, `any`-typed API responses)
- Double negation for intentional boolean coercion of a non-boolean: `!!maybeString`