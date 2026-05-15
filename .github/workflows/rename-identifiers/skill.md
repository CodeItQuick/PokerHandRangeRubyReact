---
name: rename-identifiers
description: Rename poorly named variables, parameters, or identifiers across both test and production code. Triggers on "rename variables across the codebase", "fix names in production code", "rename identifiers everywhere", "bad variable names in source", or "rename across tests and source".
---

# Rename Identifiers

Hunt down the worst-named identifiers across test and production code and rename them everywhere they appear.

## Flags

`--min-severity=<level>` — restrict the report to findings at or above the specified severity. Valid values: `CRITICAL`, `HIGH`, `MEDIUM` (default: `MEDIUM`, meaning all findings are surfaced).

`--format=<format>` — control output format. Valid values: `report` (default, grouped human-readable output), `annotations` (one line per finding, `file:line:` prefixed, machine-parseable). Use `annotations` in CI pipelines so output can be consumed by build scripts or posted as PR review comments.

Example CI invocation: `/rename-identifiers --min-severity=HIGH --format=annotations`

---

## Core Principle

An identifier's name is its contract. Every bad name fails for exactly one reason — and that reason determines the fix. Classify first, then apply the fix rule for that category.

## Naming Failure Taxonomy

Ten disjoint categories, evaluated in priority order (LIE → INVERSE → CHIMERA → MIMIC → CIPHER → SERIES → FRAGMENT → MIRAGE → ECHO → VOID):

| Category | Severity | Root cause | Fix rule |
|----------|----------|------------|----------|
| **LIE** | CRITICAL | False information | Name the true type, cardinality, and domain role |
| **VOID** | CRITICAL | No information | Name what it actually holds |
| **INVERSE** | HIGH | Inverted boolean polarity | Invert both the value and the name together |
| **CHIMERA** | HIGH | Incoherent term combination | Find the single real concept from the implementation |
| **MIMIC** | HIGH | Implementation exposed instead of concept | Replace with the domain concept name |
| **CIPHER** | HIGH | Abbreviation with a recoverable expansion | Spell it out |
| **FRAGMENT** | MEDIUM | Structural role without domain qualification | Qualify with a domain noun |
| **SERIES** | MEDIUM | Ordinal position instead of concept | Name each item's distinct role |
| **MIRAGE** | MEDIUM | Wrong scope generality | Match the name's implied reach to its actual reach |
| **ECHO** | MEDIUM | Ambiguous domain term | Qualify to pin to one concept |

---

## Phases

Execute the phases in order.

## Phase 1 — Scope and Read

1. Identify the target scope: a single file, a module directory, or the full codebase. If the user doesn't specify, default to the full codebase.
2. Read every file in scope: source files, test files, type definition files, and index/barrel files.
3. Build a list of every identifier: `const`/`let`/`var` declarations, function parameters, callback arguments, destructured names, class fields, and exported names.
4. Note what each one actually holds — not just its declared type, but its domain meaning in context.

---

## Phase 1b — Identify the Domain

Before classifying any name, establish the domain vocabulary the codebase uses. Do this by:

1. Reading `describe`/`it` strings in test files, external API names, README/docs, and file path segments — these are written for humans and tend to use real domain language.
2. Reading method *implementations* (what they compute and return) rather than their names — the code tells the truth even when the name lies.
3. Extracting the recurring nouns and verbs — these are the domain terms. Examples: a billing system uses *invoice*, *ledger*, *charge*, *refund*, *payment*; a poker app uses *startingHand*, *holeCards*, *range*, *suit*, *rank*.
4. Writing down the domain term list. Every replacement name must be drawn from or composed of these terms.

**Existing identifiers are suspects, not authorities.** A class named `CardHandSuit` does not establish that "CardHandSuit" is a domain concept — read the implementation to determine what concept the class actually models.

**Behavior-derived terms.** For each non-trivial function or method, ask: *what does this compute or produce, independent of what it is called?* A function that divides one number by another and multiplies by 100 produces a *rate* or *percentage* regardless of its variable name. Record the inferred concept, not the observed label.

If the domain is ambiguous (a utility module, a generic adapter), use the closest enclosing product concept visible in the file path or package name.

---

## Phase 2 — Classify Each Identifier

See `references/phase-2-score-for-badness.md` for full detection rules and examples.

Assign every candidate the first matching category in priority order: **LIE → INVERSE → CHIMERA → MIMIC → CIPHER → SERIES → FRAGMENT → MIRAGE → ECHO → VOID**.

Score every identifier in scope: variables, parameters, callback arguments, class names, method names, and module names. Class and function names are not exempt.

**Skip entirely:** loop counters (`i`, `j`, `k`), universally understood abbreviations (`id`, `url`, `html`, `json`, `err`), and names that are genuinely unambiguous in context.

---

## Phase 3 — Threshold

See `references/phase-3-threshold.md`.

Rename every identifier that received a category. No count limit. Production code gets stricter scrutiny than tests.

---

## Phase 4 — Choose Good Replacements

See `references/phase-4-choose-replacements.md`.

Apply the fix rule for the assigned category. All replacements must use domain vocabulary from Phase 1b. A structurally correct name that uses terms foreign to the domain is still a bad name.

---

## Phase 5 — Report

See `references/phase-5-shared.md` first, then the format-specific file:

- `--format=report` (default) → `references/phase-5-report.md`
- `--format=annotations` → `references/phase-5-annotations.md`

---

## Constraints — What NOT to Do

- **Don't propose renaming everything.** Only flag identifiers that received a category label. Skip unlabeled names.
- **Don't propose logic changes.** Renames only. No restructuring, no extracting, no "while I'm here" fixes.
- **Don't apply rules robotically.** `err` in `.catch(err => ...)` is fine. `e` in `.catch(e => ...)` is VOID.
- **Don't flag test `describe`/`it` strings.** Those are documentation strings, not identifiers.
- **Don't propose names that diverge between test and production.** If a value is the same concept in both contexts, the proposed name must be consistent across both.