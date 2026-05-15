# Phase 5 — Annotations Format

Emit one line per finding. No grouping, no blocks, no prose. Order by file path alphabetically, then by line number ascending within each file.

```
src/auth.ts:5: CIPHER `usr` → `user` — abbreviation with a direct expansion
src/billing.ts:42: VOID `data` → `invoiceLineItems` — name carries no semantic content; holds an array of invoice line items
src/billing.ts:61: SERIES `result1` → `chargeAttemptResult` — ordinal suffix encodes position, not concept; holds the outcome of the charge attempt
src/billing.ts:62: SERIES `result2` → `refundConfirmation` — ordinal suffix encodes position, not concept; holds the confirmation returned after refund
src/billing.ts:87: LIE `userList` → `userCount` — List suffix claims a collection; actually holds a scalar count
src/hand.ts:12: CHIMERA `CardHandSuit` → `StartingHand` — three-segment name has no coherent single referent; implementation models a two-card starting hand
```

**Line format:** `<file>:<line>: <CATEGORY> \`<oldName>\` → \`<proposedName>\` — <one-sentence reason>`

**Rules:**
- One line per identifier — SERIES siblings each get their own line with an individually tailored reason
- The reason follows the rules in `phase-5-shared.md`
- Use the line number where the identifier is *declared*, not where it is used
- No Skipped section — omit exempted names silently
- No suppression summary line when `--min-severity` is active — omit findings silently so output remains clean for machine consumption