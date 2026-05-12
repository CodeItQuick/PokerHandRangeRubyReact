# PR Review: Identifier Quality Analysis

Review the git diff for poorly named identifiers. Do not suggest renames or fixes — only identify and rate.

## Step 1 — Identify the Domain

Establish the domain vocabulary from the diff context:

1. Read test `describe`/`it` strings, file path segments, and method implementations to extract real domain terms.
2. Every identifier must be evaluated against this vocabulary — not against other identifiers in the code.
3. **Existing identifiers are suspects, not authorities.** A class named `CardHandSuit` does not prove that is a valid domain concept. Read the implementation to determine what concept it actually models.

**Behavior-derived terms.** For each non-trivial function or method, ask: *what does this compute or produce, independent of what it is called?* Name the concept from the operation, not the label already applied to it.

## Step 2 — Score Every Identifier

Rate every identifier visible in the diff. Score every `const`/`let`/`var` declaration, function parameter, callback argument, destructured name, class field, class name, method name, and exported name — existing class and function names are not exempt.

Assign the **first** category whose detection rule matches, evaluated in priority order: LIE → INVERSE → CHIMERA → MIMIC → CIPHER → SERIES → FRAGMENT → MIRAGE → ECHO → VOID.

**Scoring inside a class or function:** score each identifier by what it actually does or holds, independent of the enclosing scope's name. A mis-named class does not legitimize mis-named fields.

---

### LIE — *False semantic content* `[CRITICAL]`

**Root cause:** The name makes a specific, verifiable claim about type, shape, or domain role that is factually wrong.

**Detection:** any mismatch between name and value:
- Boolean prefix (`is`, `has`, `should`, `can`) on a non-boolean value
- Collection suffix (`List`, `Array`, `Set`, `Map`) on a scalar or non-collection
- Domain-specific term applied to a different domain concept (e.g., `userList` holds a count, `invoiceId` holds a full object)

---

### INVERSE — *Polarity mismatch* `[HIGH]`

**Root cause:** The name expresses the wrong boolean polarity, forcing double-negation at every call site.

**Detection:** boolean name uses a negating prefix or adjective — `isNot`, `hasNo`, `cannot`, `notX`, `disabled`, `hidden`, `excluded` — where the positive form is the natural default. Confirm: if the dominant usage pattern is `if (!name)` rather than `if (name)`, the polarity is inverted.

---

### CHIMERA — *Incoherent term combination* `[HIGH]`

**Root cause:** Assembled from multiple valid domain terms whose concatenation maps to no single coherent concept.

**Detection:** name has 3+ PascalCase segments, OR two domain terms concatenated without a recognized relationship (e.g., `CardHandSuit`, `UserDataManager`, `PaymentProcessingHelper`). Confirm: read the implementation — if the code models one concept with a simpler name, it is a CHIMERA.

---

### MIMIC — *Implementation leaking through the name* `[HIGH]`

**Root cause:** The name describes mechanism or data structure rather than the domain concept.

**Detection:** name references a concrete type, storage format, or mechanism — `sqlRow`, `jsonObject`, `arrayOfStrings`, `rawBytes`, `mapOfIds`. Confirm: if removing the implementation word leaves a valid domain name, it is a MIMIC.

---

### CIPHER — *Correct content, encoded* `[HIGH]`

**Root cause:** The name abbreviates a term where spelling it out produces the complete, correct name.

**Detection:** name matches a known abbreviation where expansion yields a complete, meaningful name: `usr`→`user`, `mgr`→`manager`, `svc`→`service`, `cfg`→`config`, `prc`→`process`, `ctx`→`context`, `btn`→`button`, `idx`→`index`. If expansion still yields a void or fragment, classify as VOID or FRAGMENT instead.

---

### SERIES — *Ordinal encoding instead of semantic content* `[MEDIUM]`

**Root cause:** The name encodes position rather than the identifier's distinct conceptual role.

**Detection:** name matches `<base><digit>+` (e.g., `result1`, `result2`, `action1`) AND at least one sibling exists sharing the same base.

---

### FRAGMENT — *Structural role without domain qualification* `[MEDIUM]`

**Root cause:** Correctly names a structural role but omits the domain concept it belongs to.

**Detection:** name ∈ structural role set — `expected`, `actual`, `output`, `input`, `handler`, `processor`, `manager`, `helper`, `wrapper`, `request`, `payload` — with no domain noun attached.

---

### MIRAGE — *Scope-generality mismatch* `[MEDIUM]`

**Root cause:** The name's implied generality does not match the identifier's actual scope.

**Detection:** module- or class-level identifier with a name implying specificity (`currentUser`, `activeRequest`) where no outer context pins it; OR function-local identifier with a name implying application-wide relevance (`appConfig`, `globalSettings`) where it is only used in one place.

---

### ECHO — *Unresolved domain ambiguity* `[MEDIUM]`

**Root cause:** A valid domain noun that maps to two or more distinct concepts with nothing to resolve the ambiguity.

**Detection:** name maps to 2+ distinct domain concepts with no qualifier — `account` (user vs. financial), `record` (database row vs. audit entry), `period` (billing vs. time). Confirm: if a new reader could reasonably interpret it two different ways, it is an ECHO.

---

### VOID — *No semantic content* `[CRITICAL]`

**Root cause:** The name carries zero information.

**Detection:** name ∈ canonical void set: `data`, `result`, `res`, `obj`, `temp`, `val`, `x`, `a`, `b`, `cb`, `fn`, `thing`, `stuff`, `info`, `item`, `value`, `response` (unqualified); OR name is a single letter outside a loop counter; OR expansion of the name in any domain still means nothing. Note: if a CIPHER candidate's expansion is itself void (`cb`→`callback`, `fn`→`function`), classify as VOID, not CIPHER.

---

## Severity Summary

| Category | Severity | Root cause |
|----------|----------|------------|
| LIE      | CRITICAL | False information |
| VOID     | CRITICAL | No information |
| INVERSE  | HIGH     | Inverted polarity |
| CHIMERA  | HIGH     | Incoherent combination |
| MIMIC    | HIGH     | Implementation exposed instead of concept |
| CIPHER   | HIGH     | Encoded information |
| FRAGMENT | MEDIUM   | Incomplete information |
| SERIES   | MEDIUM   | Positional, not conceptual |
| MIRAGE   | MEDIUM   | Wrong scope generality |
| ECHO     | MEDIUM   | Ambiguous domain term |

### Skip entirely

Loop counters (`i`, `j`, `k`), universally understood abbreviations (`id`, `url`, `html`, `json`, `err`), and names that are genuinely unambiguous in context. `err` in `.catch(err => ...)` is fine. `e` in `.catch(e => ...)` is VOID.

## Output Format

Return ONLY valid JSON with no other text. The JSON must have exactly two fields:

- `"summary_table"`: a markdown table string listing every rated identifier with columns: Identifier, File, Line, Category, Severity, Reason. Include ALL rated identifiers (MEDIUM through CRITICAL).
- `"inline_comments"`: an array of inline comment objects for CRITICAL identifiers only (LIE and VOID). Each object must have: `"path"` (file path), `"line"` (line number in the new file, must exist in the diff), `"side"` (always `"RIGHT"`), `"body"` (the category name, why it qualifies, and what domain concept it should represent).

Example:
```json
{
  "summary_table": "| Identifier | File | Line | Category | Severity | Reason |\n|---|---|---|---|---|---|\n| `x` | src/foo.js | 12 | VOID | CRITICAL | Single-letter parameter carries no semantic content |",
  "inline_comments": [
    {"path": "src/foo.js", "line": 12, "side": "RIGHT", "body": "**VOID (CRITICAL):** `x` carries no semantic content. Based on the domain context, this likely represents a card rank or player action — name it accordingly."}
  ]
}
```