# Detection Patterns — Primitive Obsession

Patterns where raw primitives are used in place of small domain types, erasing invariants, enabling accidental misuse, and scattering validation logic across the codebase. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `../shared/suppression-rules.md` before reporting.

## 1. Two distinct domain identifiers share the same primitive type

```ts
function transferFunds(fromAccountId: string, toAccountId: string, amount: number) {
  ...
}

// Nothing prevents this at the call site:
transferFunds(toAccountId, fromAccountId, amount);   // silently swapped
```

When `userId`, `accountId`, `orderId`, and `sessionId` are all `string`, the type system cannot detect transposition. A branded or nominal type (`type AccountId = string & { _brand: "AccountId" }`) catches this class of bug at compile time.

## 2. Validation of the same primitive repeated at multiple call sites

```ts
function createUser(email: string) {
  if (!email.includes("@")) throw new Error("Invalid email");
  ...
}

function updateEmail(userId: string, email: string) {
  if (!email.includes("@")) throw new Error("Invalid email");   // duplicated
  ...
}

function sendInvite(email: string) {
  if (!email.includes("@")) throw new Error("Invalid email");   // duplicated again
  ...
}
```

The same invariant — "this string must be a valid email" — is enforced in three places. An `EmailAddress` type that validates once at construction centralises the rule. When the validation logic needs updating, there is one place to change rather than finding every copy.

## 3. A number with a constrained valid range passed as a plain `number`

```ts
function setDiscount(percent: number) {
  // valid range is 0–100, but nothing enforces it
  applyDiscount(price, percent / 100);
}

function calculateTax(rate: number) {
  // should be 0.0–1.0, but callers may pass 15 instead of 0.15
  return subtotal * rate;
}
```

Plain `number` communicates no range or unit. A `Percentage` type (0–100) and a `Rate` type (0.0–1.0) are different concepts; using the same primitive makes them interchangeable in ways that silently corrupt calculations.

## 4. A string used as a discriminant or status value instead of an enum

```ts
function processOrder(order: Order) {
  if (order.status === "pendng") { ... }    // typo — "pending" misspelled, silently no-ops
  if (order.status === "Shipped") { ... }   // wrong casing, silently no-ops
}

type Order = {
  status: string;   // any string accepted; typos are valid at the type level
};
```

A `string` status field accepts any value. An enum or union type (`"pending" | "processing" | "shipped" | "cancelled"`) makes typos and casing errors compile-time errors rather than silent runtime no-ops.

## 5. A primitive that carries unit information only in its variable name

```ts
function schedule(delayMs: number, intervalSeconds: number) {
  setTimeout(callback, delayMs);
  setInterval(callback, intervalSeconds);   // bug: should be intervalSeconds * 1000
}
```

Unit disambiguation via naming (`Ms`, `Seconds`, `Px`, `Bytes`) only works when callers read carefully. A `Milliseconds` or `Duration` type with explicit construction (`Duration.seconds(5)`) makes unit mismatches a type error rather than a naming convention violation.

## 6. A coordinate, vector, or range represented as loose positional parameters

```ts
function drawRect(x1: number, y1: number, x2: number, y2: number) { ... }

// Nothing prevents:
drawRect(y1, x1, y2, x2);   // transposed silently
drawRect(x1, y1, width, height);   // wrong interpretation, no error
```

When a concept has multiple components (x/y, start/end, width/height), loose positional parameters are order-sensitive with no type-level enforcement. A `Point`, `Rect`, or `Range` object makes the components self-documenting and transposition impossible to do silently.

## 7. Configuration or options bag typed as `Record<string, any>`

```ts
function connect(options: Record<string, any>) {
  const host = options.hst;       // typo, silently undefined
  const port = options.port;
  const timeout = options.timout; // typo, silently undefined
}
```

`Record<string, any>` accepts any key with any value. A typed options interface catches misspelled keys, wrong value types, and missing required fields at the call site.

## 8. Money represented as a plain `number`

```ts
function charge(amount: number, currency: string) { ... }

charge(9.99, "USD");
charge(999,  "JPY");   // same type, different scale — yen has no subunit
charge(0.1 + 0.2, "USD");  // 0.30000000000000004 — floating-point error
```

Currency amounts require integer representation (cents, pence, smallest denomination), a unit, and protection against floating-point arithmetic. A `Money` type with currency-aware operations prevents the silent precision errors that accumulate in financial calculations.

---

## Patterns to **not** flag

- **Primitive types at system boundaries** — values read from JSON, environment variables, or HTTP query params are necessarily strings at the boundary. The concern is whether they remain raw primitives after parsing; a parse function that returns a domain type is the correct pattern.
- **Internal loop variables and indices** — `i`, `j`, `index`, `count` inside a function body are not domain concepts; they are implementation mechanics. Do not flag.
- **Primitives that genuinely have no invariants** — a `message: string` that truly accepts any non-empty string, or a `count: number` with no valid-range constraint, does not benefit from wrapping.
- **Small utilities and pure functions** — a `clamp(value: number, min: number, max: number)` utility operates on numbers as numbers. Its parameters are not domain identifiers.
- **Already-wrapped types** — if the codebase uses `UserId`, `OrderId`, `EmailAddress` etc., and a new function correctly accepts those types, do not flag. The pattern only applies where a raw primitive is used *instead of* an available domain type.
- **Test code constructing primitives to feed domain types** — test files calling `UserId("abc")` or `new EmailAddress("x@y.com")` are using primitives to construct domain types. That is correct usage, not primitive obsession.