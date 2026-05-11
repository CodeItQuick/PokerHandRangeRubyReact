# Rename Identifiers

Analyze the code below. Classify every identifier using the naming failure taxonomy and output only the report. Do not rewrite the code.

## Phase 1 — Read and Inventory

The scope is the code in `{{code}}`. Work only from that code.

Read through the entire code and note every identifier: `const`/`let`/`var` declarations, function parameters, callback arguments, destructured names, class fields, class names, method names, and exported names. Note what each one actually holds — not just its declared type, but its domain meaning in context.

## Phase 1b — Identify the Domain

Before classifying, establish the domain vocabulary:

1. Read `describe`/`it` strings, comments, and method implementations — what do they compute or produce?
2. Extract recurring nouns and verbs — these are the domain terms (e.g. a poker app uses *startingHand*, *holeCards*, *suit*, *rank*).
3. Every proposed name must be drawn from these terms.

**Existing identifiers are suspects, not authorities.** A class named `CardHandSuit` does not establish that "CardHandSuit" is a real domain concept — read the implementation to determine what it actually models.

## Phase 2 — Classify Every Identifier

Assign each identifier the **first** matching category in priority order: **LIE → INVERSE → CHIMERA → MIMIC → CIPHER → SERIES → FRAGMENT → MIRAGE → ECHO → VOID**.

| Category | Severity | Detection |
|----------|----------|-----------|
| **LIE** | CRITICAL | Boolean prefix (`is`, `has`, `should`, `can`) on a non-boolean; collection suffix (`List`, `Array`, `Set`, `Map`) on a scalar; domain term applied to a different concept |
| **VOID** | CRITICAL | Name ∈ `data`, `result`, `res`, `obj`, `temp`, `val`, `x`, `a`, `b`, `cb`, `fn`, `thing`, `stuff`, `info`, `item`, `value`, `response`; single letter outside a loop counter; expansion still means nothing |
| **INVERSE** | HIGH | Boolean name uses negating prefix/adjective (`isNot`, `hasNo`, `disabled`, `hidden`) where the positive form is the natural default; dominant usage is `if (!name)` |
| **CHIMERA** | HIGH | Name has 3+ PascalCase segments, OR two domain terms concatenated without a recognized relationship (`CardHandSuit`, `UserDataManager`, `PaymentProcessingHelper`) |
| **MIMIC** | HIGH | Name references a concrete type, format, or mechanism instead of the domain concept (`sqlRow`, `jsonObject`, `arrayOfStrings`, `mapOfIds`) |
| **CIPHER** | HIGH | Direct abbreviation where expansion yields the complete correct name: `usr`→`user`, `mgr`→`manager`, `svc`→`service`, `cfg`→`config`, `ctx`→`context`, `btn`→`button`, `idx`→`index` |
| **FRAGMENT** | MEDIUM | Structural role word with no domain noun: `expected`, `actual`, `output`, `input`, `handler`, `processor`, `manager`, `helper`, `wrapper`, `request`, `payload` |
| **SERIES** | MEDIUM | `<base><digit>+` pattern (`result1`, `result2`) with at least one sibling sharing the same base |
| **MIRAGE** | MEDIUM | Name's implied generality mismatches its scope — broad name in a narrow scope, or specific name in a shared scope |
| **ECHO** | MEDIUM | Valid domain noun that maps to 2+ distinct concepts with no qualifier to disambiguate (`account`, `record`, `period`) |

**Expansion test:** if a CIPHER candidate's expansion is itself void (`cb` → `callback`), classify as VOID instead.

**Skip entirely:** loop counters (`i`, `j`, `k`), universally understood abbreviations (`id`, `url`, `html`, `json`, `err`), and names that are genuinely unambiguous in context.

## Output

Group by category, severity order (CRITICAL first, then HIGH, then MEDIUM). One block per category. No prose, no rewritten code.

```
LIE [CRITICAL]
  userList → userCount
    Why: List suffix claims a collection; holds a scalar count

VOID [CRITICAL]
  data → invoiceLineItems
    Why: name carries no semantic content; holds an array of invoice line items
  cb → onPaymentComplete
    Why: expansion "callback" is itself void; holds the callback invoked after payment settles

CHIMERA [HIGH]
  CardHandSuit → StartingHand
    Why: three-segment name has no coherent single referent; implementation models a two-card starting hand

CIPHER [HIGH]
  usr → user
    Why: direct abbreviation with a recoverable expansion

FRAGMENT [MEDIUM]
  expected → expectedChargeTotal
    Why: structural word with no domain noun; belongs to the charge total assertion

SERIES [MEDIUM]
  result1 → chargeAttemptResult
  result2 → refundConfirmation
    Why: ordinal suffixes encode position, not concept; each holds a distinct domain value

SKIPPED
  err   — exempt (universally understood in catch context)
```

Omit any category that has no entries. For SERIES, list all siblings under one block with a shared Why. The Why must state the category's root cause applied to this specific identifier — one sentence, concrete.

---

{{code}}