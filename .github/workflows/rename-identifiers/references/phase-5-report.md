# Phase 5 — Report Format

Group findings by severity (CRITICAL first, then HIGH, then MEDIUM). Within each group, one block per category containing all findings for that category:

```
VOID [CRITICAL]
  data → invoiceLineItems
    Why: name carries no semantic content; holds an array of invoice line items
    Scope: src/billing.ts (3 occurrences), src/billing.test.ts (1 occurrence)

  cb → onPaymentComplete
    Why: expansion "callback" is itself void; holds the callback invoked after payment settles
    Scope: src/billing.ts (2 occurrences)

LIE [CRITICAL]
  userList → userCount
    Why: List suffix claims a collection; actually holds a scalar count
    Scope: src/users.ts (5 occurrences), src/index.ts (1 occurrence)

  isValid → validationMessage
    Why: is prefix claims a boolean; actually holds a string message
    Scope: src/validation.ts (4 occurrences), src/validation.test.ts (2 occurrences)

CHIMERA [HIGH]
  CardHandSuit → StartingHand
    Why: three-segment name has no coherent single referent; implementation models a two-card starting hand
    Scope: src/hand.ts (8 occurrences), src/hand.test.ts (3 occurrences)

CIPHER [HIGH]
  usr → user
    Why: abbreviation with a direct expansion; no domain inference required
    Scope: src/auth.ts (6 occurrences)

FRAGMENT [MEDIUM]
  expected → expectedChargeTotal
    Why: structural word with no domain noun; belongs to the charge total assertion
    Scope: src/billing.test.ts (4 occurrences)

SERIES [MEDIUM]
  result1 → chargeAttemptResult
  result2 → refundConfirmation
    Why: ordinal suffixes encode position, not concept; each holds a distinct domain value
    Scope: src/billing.ts (result1: 2 occurrences, result2: 2 occurrences)
```

**Format rules:**
- `oldName → proposedName` on the first line of each entry
- `Why:` — one sentence per the rules in `phase-5-shared.md`
- `Scope:` lists every file containing the identifier with occurrence counts
- For SERIES, group siblings under one block with a shared Why and per-name scope breakdown
- No prose outside the blocks

**Severity filtering:** when findings are suppressed by `--min-severity`, append a summary line after the last block:

```
(N MEDIUM findings suppressed — run without --min-severity to see all)
```

**Skipped suspects:** if you considered a name and rejected it, append a Skipped section at the end:

```
Skipped
  err   — considered VOID; exempt (universally understood in catch context)
  id    — considered CIPHER; exempt (universally understood abbreviation)
```