# Phase 4 — Choose Good Replacements

## How to Find the Right Name

The fix rules below tell you *what to do*. This process tells you *how to think* when doing it.

JB Rainsberger describes name improvement as three steps that must be taken in order:

1. **Discover structure** — read the implementation without prejudice. Ignore the existing name entirely. What does this code actually hold, compute, or produce? What values flow in and out? What invariants does it maintain?

2. **Understand structure** — make sense of what you observed. What concept is being modeled? What relationships and patterns does it participate in?

3. **Realise purpose** — name the *purpose*, not the mechanism. A function that divides one number by another and multiplies by 100 doesn't "divide and multiply" — its purpose is to compute a *rate*. The name belongs at this level.

**Which steps each category requires:**

| Category | Steps needed | Why |
|----------|-------------|-----|
| CIPHER, INVERSE | 3 only | The correct concept is already present in the name — just encoded or inverted |
| LIE, SERIES | 2–3 | You know the type or position; determine purpose and name it |
| FRAGMENT, MIRAGE | 2–3 | Understand which domain concept the structural word belongs to, then qualify |
| VOID, CHIMERA, MIMIC, ECHO | 1–2–3 | The existing name gives no reliable starting point; you must read the implementation to discover and understand before you can name |

When a fix feels uncertain, the answer is almost always that you stopped too early — at structure, not purpose.

All replacements must draw from the domain vocabulary identified in Phase 1b.

---

## Fix Rules by Category

**VOID** — What does the identifier actually hold? Name that thing using a domain noun from the vocabulary list.
- `data` → `invoiceLineItems` (held an array of line items)
- `result` → `chargeResult` (held the outcome of a charge operation)
- `cb` → `onPaymentComplete` (void because expansion "callback" is itself void; named by what it is called when)

**LIE** — What does the identifier actually hold? Identify the true type, cardinality, and domain role; use all three.
- `userList` (holds a count) → `userCount`
- `isValid` (holds a string) → `validationMessage`
- `invoiceId` (holds a full object) → `invoice`

**CHIMERA** — Read the implementation. What single concept does the code model? Name that concept. Do not reuse the old constituent terms — they may themselves be wrong.
- `CardHandSuit` (models a two-card starting hand) → `StartingHand`
- `UserDataManager` (manages a session) → `SessionManager`
- `PaymentProcessingHelper` (formats a payment request) → `PaymentRequestFormatter`

**CIPHER** — Spell out the abbreviation.
- `usr` → `user`
- `mgr` → `manager`
- `svc` → `service`
- `cfg` → `config`

**FRAGMENT** — Prepend or append the domain noun that the structural word belongs to.
- `expected` → `expectedChargeTotal`
- `actual` → `actualChargeTotal`
- `handler` → `paymentHandler`
- `payload` → `webhookPayload`

**SERIES** — Identify what makes each numbered item conceptually distinct from its siblings; name the distinction.
- `result1` / `result2` (first is charge attempt, second is refund confirmation) → `chargeAttemptResult` / `refundConfirmation`
- `action1` / `action2` (first dispatches, second resets) → `dispatchAction` / `resetAction`

---

## Universal Constraints

**Boolean variables:** always prefix with `is`, `has`, `should`, or `can` followed by a domain term. A boolean fix that removes a false prefix (LIE) must also add the correct one.

**Callback parameters:** name what the callback receives, not that it is a callback. `.map(x => ...)` → `.map(invoice => ...)`.

**Cross-context consistency:** if the same logical value flows from production code into a test, its name must be the same or compositionally related in both. Do not rename them to unrelated terms.

**Domain-consistency check:** before finalising any replacement, ask — "Would a developer who knows this domain immediately understand what this variable holds?" If the answer requires knowing the implementation, the name is still wrong.

**Class and module renames (CHIMERA/VOID on class names):** derive the replacement from what the class actually models — read the constructor, fields, and methods. Do not compose the replacement from terms already in the old name.