# Comment Format

Review comments are the user-facing output. They must be specific, actionable, and proportional to severity. The structured finding is the source of truth — the comment is just a derivation.

## Structure

```
{Severity}: {what may fail or is wrong and where}. {why it may fail or is incorrect}. {suggested action, often as a question}.
```

## Severity labels

- **`Blocking:`** — high confidence, the bug is demonstrable; the change should not merge until addressed.
- **`Suggested:`** — high confidence but not demonstrably broken; author should consider but may have context that makes it OK.
- **`Optional:`** — low-stakes improvement. Use sparingly; usually suppress instead.

Do not use bare statements without a label. The severity label tells the author whether they must act.

## Phrasing rules (all passes)

1. **Name the expression.** Quote it in backticks and cite the line number. The author should be able to find it without re-reading the diff.
2. **State the failure mode or incorrect behavior.** "may throw", "silently discarded", "is always true in this branch" — be concrete.
3. **Cite the evidence.** Mention the source operation, type, or sibling code that makes this suspicious.
4. **End with a question or suggestion**, not a command. The author may have context you don't.
5. **One concern per comment.** Post two comments for two distinct issues, even in the same function. Don't bundle.

## Length

Keep each comment to 2–4 sentences. If you find yourself writing a paragraph, the issue probably needs a design discussion, not a line comment.

---

## Pass-specific examples

### `null-access`

**Good:**

> **Blocking:** `user.name` on line 42 is read before `user` is checked. `users.find(...)` returns `undefined` when no match exists, and the guard at line 47 is unreachable. Could we move the guard above the access, or throw a `UserNotFoundError`?

> **Suggested:** `session.touch()` may throw because `sessions.get(sessionId)` returns `undefined` for unknown sessions. If the session is guaranteed to exist here, could we add an `assertExists` to make that contract explicit?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Type system clearly says nullable, no guard at all | Assert: "`x.y` will throw because `x` is undefined when ..." |
| Type system silenced via `!` or `as` | Ask: "Is `x` guaranteed non-null here? The `!` removes the type error but ..." |
| Source operation can return undefined but you can't see the contract | Ask: "Does `getUser(id)` always return a user, or can it return null?" |
| Guard exists but might not cover all branches | Ask: "Does the guard at line N cover the path through line M?" |

---

### `swallowed-exceptions`

**Good:**

> **Blocking:** The `catch` block at line 58 discards the exception from `writeFile()` without logging or re-throwing. Callers at line 72 proceed to read the file as if the write succeeded. Could we re-throw here, or return a `Result` type so callers can detect the failure?

> **Suggested:** `fetchUser(id).catch(() => {})` at line 34 silently resolves the promise to `undefined`. Any `.then()` consumer downstream will receive `undefined` for a user that failed to load. Should this propagate the rejection, or at least return a typed sentinel the caller can check?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Catch block is completely empty | Assert: "`catch (e) {}` at line N will silently hide any failure from `op()`..." |
| Catch logs but does not re-throw | Assert: "The `catch` logs but the caller has no way to detect the failure..." |
| Catch returns a default whose meaning is ambiguous | Ask: "Does the caller at line N distinguish a genuine empty result from a parse failure?" |
| Re-throw is missing the cause chain | Ask: "Should the original `e` be passed as `{ cause: e }` so the root cause is preserved?" |

---

### `suspicious-conditional`

**Good:**

> **Blocking:** `if (retries > MAX_RETRIES)` at line 37 runs one extra iteration — when `retries` equals `MAX_RETRIES` the condition is still false and the loop body executes again. `retryWithDelay` in the same file uses `>=` for the same invariant. Should this be `>= MAX_RETRIES`?

> **Suggested:** `if (isEnabled === "true")` at line 14 — `isEnabled` is typed as `boolean`, which is never the string `"true"`, so this branch can never execute. Did you mean `=== true`, or is `isEnabled` expected to be a string from an environment variable?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Condition is provably tautological given the type | Assert: "`if (count === null)` can never be true — `count` is `number`." |
| Off-by-one where boundary value is defined by a constant | Assert: "With `>`, the loop executes when `retries === MAX_RETRIES`, which exceeds the intended limit." |
| Duplicate condition in chain | Assert: "The branch at line N is dead — `status === 'active'` is already tested at line M." |
| Operator precedence where intent is unclear | Ask: "Is this `a || (b && c)` or `(a || b) && c`? The current form evaluates as the former." |
| Suspicious boundary where the correct value isn't obvious | Ask: "Should this be `>=` to include the boundary, or is `>` intentional here?" |

---

### `mutation-of-input`

**Good:**

> **Blocking:** `items.sort(comparator)` at line 31 sorts the caller's array in-place. `items` is the parameter — the caller's original array is silently reordered. `transform` in the function name implies a new array is returned. Could we use `[...items].sort(comparator)` instead?

> **Suggested:** `cart.discounts.push(newDiscount)` at line 18 mutates the `discounts` array on the passed `cart` object. If callers expect `applyDiscount` to return a new cart, both the original and the returned reference now have the discount applied. Should this operate on a copy?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| In-place array method (`sort`, `push`, `splice`) on a parameter | Assert: "`items.sort()` mutates the caller's array — callers named `transform*` expect a copy." |
| Property assignment directly on a parameter object | Assert: "`order.status = 'paid'` mutates the object the caller passed — is that the intended contract?" |
| Function name is ambiguous about mutation | Ask: "Does `processCart` guarantee it returns a new cart, or may it mutate the passed one?" |
| Shallow spread that still shares nested objects | Ask: "This spreads `order` but `order.items` is still the same reference — is mutation of `items` safe here?" |

---

### `boolean-flag-splitter`

**Good:**

> **Blocking:** `renderList(items, true)` at line 44 and `renderList(items, false)` at line 67 both pass literal booleans — every call site has already made a static choice. The two branches inside `renderList` differ in their output shape and side effects. Could these be two functions: `renderDetailedList` and `renderSummaryList`?

> **Suggested:** The `verbose` parameter at line 12 controls branches where the two paths share almost no code — one fetches full records, the other returns IDs only. Since every call site passes a literal, would `fetchFull` and `fetchIds` as separate functions make the intent clearer at the call site?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Every call site passes a literal, branches are fundamentally different | Assert: "The `format` flag is always a literal at call sites; the branches differ enough to be separate functions." |
| Branches diverge but share significant setup code | Ask: "Would `exportAsCsv` and `exportAsJson` be clearer than a `format` flag, given how different the branches are?" |
| Flag is passed through an intermediate that doesn't use it | Ask: "Is `includeMetadata` used by `formatReport` directly, or just threaded through to `renderSection`?" |

---

### `passthrough-wrapper`

**Good:**

> **Suggested:** `UserRepository.findById` at line 8 only calls `this.db.users.findById(id)` and returns the result with no transformation, error translation, or added behavior. Callers could import `db.users.findById` directly. Is there planned behavior that makes this wrapper worth keeping?

> **Suggested:** The `notify` method at line 24 maps 1:1 to `emailService.send(to, subject, body)` with no logging, retry, or error handling. If it exists to enable mocking in tests, would injecting `emailService` directly into callers give them more control?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Pure delegation, parameters map 1:1, no cross-cutting concern | Ask: "Does this wrapper add anything callers couldn't get by calling `X` directly?" |
| Wrapper name suggests future behavior | Ask: "Is there planned behavior here, or could callers call `X` directly for now?" |
| Wrapper exists for test isolation | Ask: "If this exists for testability, would injecting `X` directly give callers more flexibility?" |

---

### `implicit-test-ordering`

**Good:**

> **Blocking:** `createdUserId` at line 14 is written by `"creates a user"` and read by `"fetches the created user"` with no `beforeEach` reset. If the fetch test runs first or in isolation, `createdUserId` is `undefined` and the test fails for reasons unrelated to the code under test. Could each test create its own user in a `beforeEach`?

> **Suggested:** `"ships the order"` at line 38 has no arrange step but calls `shipOrder("ord-1")`, relying on a record that `"places an order"` creates. Test runners can run selectively or in randomized order — could `"ships the order"` create its own order instead?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Variable written by test A, read by test B with no reset | Assert: "`sessionId` is set by a different test — this test will fail if run in isolation or after a runner reset." |
| No arrange step, obvious data requirement | Assert: "This test uses `userId = 1` but never creates it — it depends on a prior test having run." |
| `beforeAll` creates mutable shared object | Ask: "Since `cart` is shared across tests and mutated by each one, could `beforeEach` create a fresh instance?" |
| Sequential test names but tests may be self-contained | Ask: "These names imply an order the runner doesn't enforce — could each test arrange its own state?" |

---

### `primitive-obsession`

**Good:**

> **Suggested:** `createInvoice(userId, orderId)` at line 22 takes two `string` parameters. `userId` and `orderId` are interchangeable at the type level — passing them in the wrong order produces no compile error. Branded types (`UserId`, `OrderId`) or an options object would make the transposition impossible.

> **Suggested:** The format check `email.includes("@") && email.length > 3` appears at lines 17, 44, and 89. An `Email` type that enforces the invariant once at construction would eliminate the scatter and prevent unchecked email strings from flowing through the system.

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Two same-type domain IDs in a function signature | Ask: "Could `userId` and `orderId` be branded types so the compiler catches transpositions?" |
| Same validation duplicated at 3+ call sites | Assert: "This format check appears at N call sites — an `Email` type would centralize the invariant." |
| Unconstrained number with a valid range | Ask: "Should `discountRate: number` be constrained to 0–1? A `Rate` type could carry that invariant." |
| Status string used as a discriminant | Ask: "Would a union type (`'active' | 'suspended' | 'deleted'`) be safer than a raw string here?" |

---

### `feature-envy`

**Good:**

> **Suggested:** `formatInvoiceLine` at line 15 reads `order.taxRate`, `order.discountCode`, and `order.discountAmount` while referencing no state of its own — the logic is entirely derived from `Order`. Could this move to `Order` as a method, or to an `OrderFormatter` class in the same module?

> **Suggested:** `isUserActive` in `user-utils.ts` at line 8 reads `user.status`, `user.deletedAt`, and `user.emailVerified`. This looks like a displaced method — `user.isActive()` would be more discoverable and keep the `User` invariants centralized. Is there a reason this lives outside the `User` class?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Function reads 3+ fields of one object, `this` not referenced | Ask: "Could this move to `X` as a method, since it's entirely derived from `X`'s data?" |
| Utility file accumulating single-type projections | Ask: "These helpers each take `User` and derive a value — would they be more discoverable as `User` methods?" |
| Deep navigation into a nested structure | Ask: "Does `order.customer.contactInfo.email` need to be accessed here, or could `Order` expose a `recipientEmail` property?" |

---

### `mixed-abstraction-levels`

**Good:**

> **Suggested:** `completeOrder` at line 12 calls `validateOrder` and `chargeCustomer` (domain operations), then constructs HTTP headers, base64-encodes a body, and calls `fetch` directly (protocol operations). Could the low-level block extract to `submitToFulfillment(order, payment)` to keep this function at one abstraction level?

> **Suggested:** `processRefund` at line 28 traverses `order.items.filter(...)` and a `reduce` over prices inline, then calls `issueRefund`. Does `processRefund` need to know about item flags and timestamps, or could `order.calculateRefundAmount()` encapsulate the traversal?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Business function with inline HTTP/SQL | Ask: "Could the `fetch` call extract to `submitToFulfillment()` to keep this function at the domain level?" |
| Orchestrator dipping into data structure internals | Ask: "Could `order.calculateRefundAmount()` encapsulate the item traversal so `processRefund` stays domain-level?" |
| Database error code in a service-layer catch | Ask: "Is `23505` a PostgreSQL unique-violation code? Could the repository layer translate this to `DuplicateAccountError`?" |
| Infrastructure setup inside a worker function | Ask: "Could the logger and pool construction move to a factory or composition root so `runJob` contains only execution logic?" |

---

### `overly-clever-one-liner`

**Good:**

> **Suggested:** `~arr.indexOf(x)` at line 18 returns a truthy value when `x` is found and `0` (falsy) when it's not, by exploiting `~(-1) === 0`. This is not a widely recognized idiom — `arr.includes(x)` expresses the same intent directly. Could we use `includes`?

> **Suggested:** The nested ternary at line 31 encodes four status labels across three levels of `? :`. Tracing which label maps to which status requires multiple reads. An object lookup (`STATUS_LABELS[status] ?? "Unknown"`) or `if/else if` chain would be immediately scannable.

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| `~indexOf` or bit shift for non-bit purpose | Ask: "Is `~arr.indexOf(x)` intentional? `arr.includes(x)` would express the same thing more clearly." |
| Nested ternary with 2+ levels | Ask: "This ternary has N levels — would an `if/else if` chain or lookup object be easier to scan?" |
| 4+ chained methods with no named intermediates | Ask: "Could the result after `filter` be named so the data shape at each step is explicit?" |
| Side effect hidden in `&&`/`||` short-circuit | Ask: "Is the mutation in `items.length || items.push(default)` intentional? An `if` would make the control flow explicit." |

---

### `implicit-boolean-coercion`

**Good:**

> **Blocking:** `{count && <span>{count} items</span>}` at line 44 renders `"0"` as a text node when `count` is zero, because `0` is falsy but React renders numeric falsy values. Could we use `{count > 0 && <span>...}` or `{Boolean(count) && ...}`?

> **Suggested:** `const port = config.port || 3000` at line 12 will use `3000` when `config.port` is `0`. Port `0` is a valid OS-assigned value. If the intent is "use the default only when not set", `config.port ?? 3000` would be safer.

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| JSX `{count && ...}` where `count` is `number` | Assert: "`{count && ...}` renders `"0"` as text when count is zero — could we use `count > 0 &&`?" |
| `||` default where `0` or `""` is a valid domain value | Ask: "If `port` can legitimately be `0`, should this use `??` instead of `||`?" |
| `.filter(Boolean)` on an array that may contain `0` or `""` | Ask: "Does this array ever contain `0` or `''` as valid values? `.filter(Boolean)` would silently remove them." |
| Bare truthiness check on a `number` parameter | Ask: "If `limit` can be `0`, `if (!limit)` treats it as missing — is `limit == null` the right check?" |

---

### `inconsistent-abstraction-in-name`

**Good:**

> **Suggested:** In `orders/service.ts`, `createOrder` and `updateOrder` use domain vocabulary, but `deleteFromOrdersTable` at line 34 names a SQL operation. A reader browsing the module can't tell which layer they're in. Could this be `deleteOrder` to match the sibling naming?

> **Suggested:** `httpResponse`, `jsonPayload`, and `dbRecord` at lines 12–14 are infrastructure names inside `processPayment`, a business function. Names like `chargeResult`, `paymentConfirmation`, and `savedPayment` would describe what these values *mean* rather than how they arrived. Does the current naming make the business logic harder to follow?

**When to ask vs. assert:**

| Situation | Phrasing |
|---|---|
| Sibling functions mixing domain and persistence vocabulary | Ask: "Could `deleteFromOrdersTable` be renamed `deleteOrder` to match `createOrder` and `updateOrder`?" |
| Infrastructure variable names inside business logic | Ask: "Would `chargeResult` be clearer than `httpResponse` here — it names the value's meaning rather than its transport?" |
| Function name encodes storage or transport mechanism | Ask: "Does `fetchUserFromDatabaseByPrimaryKey` need to advertise the mechanism? `getUser(id)` would hide the detail." |
| Query-named function with side effects | Ask: "Does `getUser` also write to the audit log? If so, should the name or the side effect change?" |

---

## Examples — bad (all passes)

> ❌ "This might be null." — vague, no location, no action.

> ❌ "Add error handling." — no rationale, no severity.

> ❌ "This condition looks wrong." — vague, no expression named, no failure mode.

> ❌ "**Blocking:** This is broken." — no explanation, no actionable fix.

> ❌ "**Suggested:** Why didn't you handle this?" — accusatory tone. Comment on the code, not the person.