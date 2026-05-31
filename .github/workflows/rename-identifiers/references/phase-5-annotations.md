# Phase 5 — Annotations Format

Emit a single JSON object. Order `findings` by file path alphabetically, then by line number ascending within each file.

```json
{
  "summary": "6 renaming findings: 1 CRITICAL, 3 HIGH, 2 MEDIUM",
  "findings": [
    {
      "file": "src/auth.ts",
      "line": 5,
      "category": "CIPHER",
      "severity": "HIGH",
      "oldName": "usr",
      "proposedName": "user",
      "reason": "abbreviation with a direct expansion"
    },
    {
      "file": "src/billing.ts",
      "line": 42,
      "category": "VOID",
      "severity": "CRITICAL",
      "oldName": "data",
      "proposedName": "invoiceLineItems",
      "reason": "name carries no semantic content; holds an array of invoice line items"
    },
    {
      "file": "src/billing.ts",
      "line": 61,
      "category": "SERIES",
      "severity": "MEDIUM",
      "oldName": "result1",
      "proposedName": "chargeAttemptResult",
      "reason": "ordinal suffix encodes position, not concept; holds the outcome of the charge attempt"
    },
    {
      "file": "src/billing.ts",
      "line": 62,
      "category": "SERIES",
      "severity": "MEDIUM",
      "oldName": "result2",
      "proposedName": "refundConfirmation",
      "reason": "ordinal suffix encodes position, not concept; holds the confirmation returned after refund"
    },
    {
      "file": "src/billing.ts",
      "line": 87,
      "category": "LIE",
      "severity": "CRITICAL",
      "oldName": "userList",
      "proposedName": "userCount",
      "reason": "List suffix claims a collection; actually holds a scalar count"
    },
    {
      "file": "src/hand.ts",
      "line": 12,
      "category": "CHIMERA",
      "severity": "HIGH",
      "oldName": "CardHandSuit",
      "proposedName": "StartingHand",
      "reason": "three-segment name has no coherent single referent; implementation models a two-card starting hand"
    }
  ]
}
```

**Field reference:**
- `summary` — one sentence for the PR-level comment: total count + breakdown by severity
- `findings[].file` — relative file path
- `findings[].line` — declaration line number (not a usage site)
- `findings[].category` — taxonomy category (VOID, LIE, CIPHER, SERIES, FRAGMENT, CHIMERA)
- `findings[].severity` — CRITICAL, HIGH, or MEDIUM
- `findings[].oldName` — current identifier
- `findings[].proposedName` — recommended replacement
- `findings[].reason` — one sentence per the rules in `phase-5-shared.md`

**Rules:**
- SERIES siblings each get their own entry in `findings` with an individually tailored reason
- Use the line number where the identifier is *declared*, not where it is used
- Omit exempted names silently — no extra fields or null entries
- When `--min-severity` is active, omit suppressed findings silently and reflect only the included findings in `summary`
- Output must be valid JSON — no trailing commas, no comments, no prose outside the object