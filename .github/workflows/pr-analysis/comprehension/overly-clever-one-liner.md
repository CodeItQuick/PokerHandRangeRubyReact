# Detection Patterns — Overly Clever One-Liner

Patterns where code is compressed into a single expression that requires significant mental effort to parse, and where two or three named lines would be immediately clear. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `../shared/suppression-rules.md` before reporting.

## 1. Nested ternaries replacing a simple if/else chain

```ts
const label = status === "active" ? "Active" : status === "pending" ? "Pending" : status === "cancelled" ? "Cancelled" : "Unknown";

const discount = user.isPremium ? user.loyaltyYears > 5 ? 0.2 : 0.1 : user.hasPromoCode ? 0.05 : 0;
```

Nested ternaries read right-to-left and require tracking parentheses that aren't there. An `if`/`else if` chain or a lookup object communicates the same logic at a glance. The saving is one line; the cost is every future reader.

## 2. Chained array methods that obscure the intent

```ts
const result = data.filter(x => !x.deleted).reduce((m, x) => ({ ...m, [x.id]: x }), {});

const topEmails = users.sort((a, b) => b.score - a.score).slice(0, 5).map(u => u.email).filter(Boolean);
```

Each individual method is readable in isolation, but chaining four or more transformations on one line forces the reader to trace the data shape through every step without any named intermediate. Breaking the chain with named variables (`const activeUsers`, `const topFive`) documents what each step produces.

## 3. Bitwise or arithmetic tricks in place of readable conditionals

```ts
const isEven = (n & 1) === 0;               // readable — common idiom
const clamped = Math.min(Math.max(v, 0), 100); // readable — common idiom

const sign = (n >> 31) | 1;                 // sign of n via bit shift — non-obvious
const isPowerOfTwo = n && !(n & (n - 1));   // clever bit trick — requires domain knowledge
const index = ~arr.indexOf(x);              // ~-1 === 0 (falsy); ~n === -(n+1) (truthy) — surprising
```

Bit tricks and arithmetic shortcuts are occasionally the right tool in a performance-critical path, but in general application code they trade readability for minimal gains. `n < 0 ? -1 : 1` is clearer than `(n >> 31) | 1`; `arr.includes(x)` is clearer than `~arr.indexOf(x)`.

## 4. Destructuring used to perform computation rather than to extract values

```ts
const [,, third] = arr;                         // fine — extracting a specific position

const { length: count, 0: first, [count - 1]: last } = arr;  // computed key in destructure — confusing

const { a: { b: { c } } } = obj;               // triple-nested destructure — hard to read the shape
```

Destructuring is clear when it extracts named values from a known shape. Using computed keys, skipping many positions with commas, or nesting three levels deep turns a convenience syntax into a puzzle.

## 5. Logical operators used for control flow instead of conditionals

```ts
user.isAdmin && deleteAllRecords();           // side effect hidden in short-circuit
config.debug || (config.debug = true);        // assignment hidden in logical OR
items.length || items.push(defaultItem);      // mutation hidden in short-circuit
```

`&&` and `||` as control flow are concise but hide intent. Side effects — function calls, assignments, mutations — inside short-circuit expressions require the reader to know both the value semantics and the control-flow semantics simultaneously. An `if` statement makes the intent explicit.

## 6. Comma operator or IIFE used to squeeze multiple operations onto one line

```ts
const result = (validate(input), transform(input), save(input));  // comma operator — last value returned

const parsed = (() => { try { return JSON.parse(raw); } catch { return null; } })();  // IIFE for inline try/catch
```

The comma operator evaluates each expression for side effects and returns the last value — a behaviour most JS developers have never needed and will not immediately recognise. An IIFE for an inline try/catch compresses a five-line pattern into one dense expression that can't be stepped through easily in a debugger.

## 7. Regex used for parsing where a named function or split would be clearer

```ts
const port = +url.match(/:(\d+)/)?.[1] ?? 80;

const [, year, month, day] = date.match(/(\d{4})-(\d{2})-(\d{2})/) ?? [];

const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  // fine — common idiom
```

A regex embedded in an expression is read twice: once to understand the surrounding expression, and once to understand the pattern. When the match result is immediately destructured and coerced in the same line, the combined expression is harder to debug than a named function (`parsePort(url)`, `parseDate(date)`) that can be tested independently.

## 8. Object spread or `Object.assign` used to perform conditional updates in one expression

```ts
const config = { ...defaults, ...( env === "prod" && { timeout: 30_000, retries: 5 } ), ...overrides };

const updated = Object.assign({}, base, condition1 && extra1, condition2 && extra2);
```

Spreading a `false` value is a well-known pattern, but multiple conditional spreads in one expression make it hard to reason about which keys are present and under what conditions. Named variables for each conditional layer, or an explicit `if` block that builds the object, communicate the conditions and their effects more directly.

---

## Patterns to **not** flag

- **Established single-expression idioms** that every JS/TS developer recognises: `arr.includes(x)`, `x ?? default`, `obj?.prop`, `Math.min(a, b)`, `(n & 1) === 0`, `!!value`, `+string`. These are readable precisely because they are idioms.
- **Short ternaries for simple two-way choices** with no nesting: `const label = isActive ? "Active" : "Inactive"` — one condition, two short branches, immediate to read.
- **Array methods chained two or three deep** where each step's output is obvious from the previous: `users.filter(u => u.active).map(u => u.email)` — the data shape is not hard to track.
- **Functional pipelines in a codebase that uses them consistently** — if the codebase uses `pipe` or `compose` throughout, multi-step chains are idiomatic rather than clever.
- **Performance-critical code with a comment** — a bit trick in a tight loop with an adjacent comment explaining why is a legitimate tradeoff, not cleverness for its own sake.
- **Code-generated or DSL expressions** — output from tools, query builders, or schema definitions may be dense by necessity.