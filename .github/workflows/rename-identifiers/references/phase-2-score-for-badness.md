# Phase 2 — Classify Each Identifier

Apply the taxonomy below to every candidate identifier. Each category has a single root cause and a single fix rule — classification and fix strategy are inseparable. Assign the **first** category whose detection rule matches, evaluated in priority order: LIE → INVERSE → CHIMERA → MIMIC → CIPHER → SERIES → FRAGMENT → MIRAGE → ECHO → VOID.

**Scope:** every `const`/`let`/`var` declaration, function parameter, callback argument, destructured name, class field, class name, method name, and exported name. Existing class and function names are not exempt — they are often the worst offenders.

---

## The Ten Categories

### LIE — *False semantic content* `[CRITICAL]`

**Root cause:** The name makes a specific, verifiable claim about type, shape, or domain role that is factually wrong. The reader is actively misled.

**Detection:** any of the following mismatches between name and value:
- Boolean prefix (`is`, `has`, `should`, `can`) on a non-boolean value
- Collection suffix (`List`, `Array`, `Set`, `Map`) on a scalar or non-collection
- Domain-specific term applied to a different domain concept (e.g., `userList` holds a count, `invoiceId` holds a full object)

**Fix rule:** identify the actual type, cardinality, and domain role of the identifier; replace with a name that matches all three.

---

### VOID — *No semantic content* `[CRITICAL]`

**Root cause:** The name carries zero information. Expanding or reading it tells the reader nothing about what the identifier represents.

**Detection:** name ∈ canonical void set: `data`, `result`, `res`, `obj`, `temp`, `val`, `x`, `a`, `b`, `cb`, `fn`, `thing`, `stuff`, `info`, `item`, `value`, `response` (unqualified); OR name is a single letter outside a loop counter; OR the expansion of the name in any domain still means nothing.

**Expansion test:** if a CIPHER candidate's expansion is itself void (`cb` → `callback`, `fn` → `function`), classify it as VOID, not CIPHER.

**Fix rule:** identify what the identifier actually holds; replace with a domain noun that names that thing directly.

---

### INVERSE — *Polarity mismatch* `[HIGH]`

**Root cause:** The name expresses the wrong boolean polarity, forcing double-negation at every call site. The type is correct; the orientation is backwards.

**Detection:** boolean name uses a negating prefix or adjective — `isNot`, `hasNo`, `cannot`, `notX`, `disabled`, `hidden`, `excluded` — where the positive form is the natural default in the codebase. Confirm: if the dominant usage pattern is `if (!name)` rather than `if (name)`, the polarity is inverted.

**Fix rule:** invert both the boolean value and the name together. `isNotReady` → `isPending`; `disabled` → `enabled`. Never flip just the name.

---

### CHIMERA — *Incoherent term combination* `[HIGH]`

**Root cause:** The name is assembled from multiple valid domain terms, but their concatenation does not map to any single coherent concept in the domain model. Sounds meaningful; forces the reader to open the implementation.

**Detection:** name has 3+ PascalCase segments, OR two domain terms are concatenated without a recognized relationship pattern (e.g., `CardHandSuit`, `UserDataManager`, `PaymentProcessingHelper`). Confirm: read the implementation — if the code models a single coherent concept with a simpler name, the identifier is a CHIMERA.

**Fix rule:** read the implementation to identify the one real domain concept being modeled; name the concept directly, discarding the old constituent terms entirely.

---

### MIMIC — *Implementation leaking through the name* `[HIGH]`

**Root cause:** The name describes the mechanism or data structure rather than the domain concept being modeled. The reader learns how the value is stored, not what it represents.

**Detection:** name references a concrete type, storage format, or mechanism when a domain concept exists — `sqlRow`, `jsonObject`, `arrayOfStrings`, `rawBytes`, `mapOfIds`. Confirm: if removing the implementation word leaves a valid domain name, it is a MIMIC.

**Fix rule:** replace with the domain concept name, discarding the implementation reference entirely. `sqlRow` → `invoice`; `mapOfIds` → `attendeeIndex`.

---

### CIPHER — *Correct content, encoded* `[HIGH]`

**Root cause:** The name abbreviates a term where spelling it out in full produces the complete, correct name — no domain inference required. The meaning is present but locked.

**Detection:** name matches a known abbreviation pattern where expansion yields a complete, meaningful name on its own: `usr`→`user`, `mgr`→`manager`, `svc`→`service`, `cfg`→`config`, `prc`→`process`, `ctx`→`context`, `btn`→`button`, `idx`→`index`. If expansion still yields a void or fragment, classify as VOID or FRAGMENT instead.

**Fix rule:** spell out the abbreviation in full.

---

### SERIES — *Ordinal encoding instead of semantic content* `[MEDIUM]`

**Root cause:** The name encodes position rather than the identifier's distinct conceptual role. Multiple identifiers share a base name differentiated only by number, meaning the author did not know what to call each one.

**Detection:** name matches `<base><digit>+` (e.g., `result1`, `result2`, `action1`) AND at least one sibling exists sharing the same base.

**Fix rule:** for each numbered identifier, determine what makes it conceptually distinct from its siblings; name that distinction directly.

---

### FRAGMENT — *Structural role without domain qualification* `[MEDIUM]`

**Root cause:** The name correctly names a structural role or relationship but omits the domain concept it belongs to. The reader knows how the value is used, not what it is.

**Detection:** name ∈ structural role set — `expected`, `actual`, `output`, `input`, `handler`, `processor`, `manager`, `helper`, `wrapper`, `request`, `payload` — with no domain noun attached.

**Fix rule:** qualify the structural word by prepending or appending the domain noun it belongs to (`expected` → `expectedChargeTotal`, `handler` → `paymentHandler`).

---

### MIRAGE — *Scope-generality mismatch* `[MEDIUM]`

**Root cause:** The name's implied generality does not match the identifier's actual scope. A broad name in a narrow scope suggests false universality; a specific name in a shared scope creates false locality.

**Detection:** module- or class-level identifier with a name implying specificity (`currentUser`, `activeRequest`) where no outer context pins it to one call; OR function-local identifier with a name implying application-wide relevance (`appConfig`, `globalSettings`) where it is only used in one place.

**Fix rule:** for over-broad names, qualify with the owning scope or domain context. For over-specific names, remove the false scope qualifier. The name's implied reach should match the identifier's actual reach.

---

### ECHO — *Unresolved domain ambiguity* `[MEDIUM]`

**Root cause:** The name is a valid domain noun but maps to two or more distinct concepts in the domain model, and nothing in the name or context resolves the ambiguity. Unlike CHIMERA (incoherent combination), the name is coherent — just under-qualified.

**Detection:** name maps to 2+ distinct domain concepts with no qualifier to disambiguate — `account` (user account vs. financial account), `record` (database row vs. audit entry), `period` (billing period vs. time period). Confirm: if a new reader could reasonably interpret the identifier two different ways, it is an ECHO.

**Fix rule:** prepend or append a domain qualifier that pins the meaning to exactly one concept. `account` → `billingAccount` or `userAccount`; `record` → `auditEntry`.

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

---

## Skip Entirely

Do not classify: loop counters (`i`, `j`, `k`), universally understood abbreviations (`id`, `url`, `html`, `json`, `err`), and names that are genuinely unambiguous in context. `err` in `.catch(err => ...)` is fine. `e` in `.catch(e => ...)` is VOID.

**Scoring inside a class or function:** score each identifier by what it actually does or holds, independent of the enclosing scope's name. A mis-named class does not legitimize mis-named fields.