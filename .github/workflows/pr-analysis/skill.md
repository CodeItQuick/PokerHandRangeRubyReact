---
name: pr-analysis
description: Run thirteen focused analysis passes across four categories — correctness (null access, swallowed exceptions, suspicious conditionals, mutation of input, implicit boolean coercion, implicit test ordering), overengineering (boolean flag splitting, passthrough wrappers), maintainability (primitive obsession, feature envy, mixed abstraction levels), and comprehension (overly clever one-liners, inconsistent abstraction in name) — on code or pull request diffs. Use when asked to "analyse this PR", "review for quality", "find issues", or "run a pass over this". Produces structured findings and high-signal review comments, with explicit suppression rules to avoid noise.
---

# PR Analysis

Run thirteen targeted passes over changed code across correctness, overengineering, maintainability, and comprehension. Optimize for **suppression of weak findings** over coverage — a noisy reviewer is worse than a quiet one.

## Passes

| Category | Pass | What it finds | Detection patterns |
|---|---|---|---|
| correctness | `null-access` | Dereferences of values that may be `null` or `undefined` | [`correctness/null-access.md`](correctness/null-access.md) |
| correctness | `swallowed-exceptions` | Exceptions caught and silently discarded | [`correctness/swallowed-exceptions.md`](correctness/swallowed-exceptions.md) |
| correctness | `suspicious-conditional` | Conditionals that are logically broken, redundant, or always the same value | [`correctness/suspicious-conditional.md`](correctness/suspicious-conditional.md) |
| correctness | `mutation-of-input` | Functions that mutate their arguments, breaking caller expectations | [`correctness/mutation-of-input.md`](correctness/mutation-of-input.md) |
| correctness | `implicit-boolean-coercion` | Truthiness checks on types with surprising falsy members (`0`, `""`, `[]`) that silently exclude valid values | [`correctness/implicit-boolean-coercion.md`](correctness/implicit-boolean-coercion.md) |
| correctness | `implicit-test-ordering` | Tests that silently depend on state created by other tests, making the suite order-sensitive | [`correctness/implicit-test-ordering.md`](correctness/implicit-test-ordering.md) |
| overengineering | `boolean-flag-splitter` | Boolean parameters that divide a function so fundamentally it should be two functions | [`overengineering/boolean-flag-splitter.md`](overengineering/boolean-flag-splitter.md) |
| overengineering | `passthrough-wrapper` | Functions, methods, or classes that only delegate to something else with no added behavior | [`overengineering/passthrough-wrapper.md`](overengineering/passthrough-wrapper.md) |
| maintainability | `primitive-obsession` | Raw strings or numbers used where a small domain type would add safety and prevent misuse | [`maintainability/primitive-obsession.md`](maintainability/primitive-obsession.md) |
| maintainability | `feature-envy` | Functions or methods more interested in another module's data than their own, suggesting they belong elsewhere | [`maintainability/feature-envy.md`](maintainability/feature-envy.md) |
| maintainability | `mixed-abstraction-levels` | Functions that mix high-level business intent with low-level mechanics in the same body | [`maintainability/mixed-abstraction-levels.md`](maintainability/mixed-abstraction-levels.md) |
| comprehension | `overly-clever-one-liner` | Expressions compressed to the point where two or three named lines would be immediately clearer | [`comprehension/overly-clever-one-liner.md`](comprehension/overly-clever-one-liner.md) |
| comprehension | `inconsistent-abstraction-in-name` | Names that mix vocabulary from incompatible abstraction levels — business terms alongside infrastructure terms, or implementation detail encoded in a name where intent belongs | [`comprehension/inconsistent-abstraction-in-name.md`](comprehension/inconsistent-abstraction-in-name.md) |

## Flags

`--format=<format>` — control output format. Valid values: `report` (default, grouped human-readable output for CLI use), `annotations` (a JSON array of finding objects, one element per finding, machine-parseable for CI pipelines or PR review comment automation).

`--category=<category>` — run all passes in one category instead of all thirteen. Valid values: `correctness`, `overengineering`, `maintainability`, `comprehension`. Example: `/pr-analysis --category=correctness` runs the six correctness passes only.

`--pass=<pass>` — run exactly one pass. Valid values: any pass name from the table above. Example: `/pr-analysis --pass=null-access`. Takes precedence over `--category` if both are supplied.

---

## When to use

- Reviewing a PR or diff for any quality concern — bugs, design issues, readability, or maintainability
- The user mentions a runtime error, silent failure, logic bug, overengineering, hard-to-read code, or naming problems
- Running all passes: `/pr-analysis`
- Focusing on one category: `/pr-analysis --category=correctness`, `--category=overengineering`, `--category=maintainability`, `--category=comprehension`
- Running a single pass: `/pr-analysis --pass=null-access`

## Workflow

1. **Get the diff.** Run `git diff <base>...HEAD` and focus only on changed lines.
2. **Determine which passes to run.** If `--pass` is specified, run only that pass. If `--category` is specified, run only the passes in that category. Otherwise run all thirteen in order. For each pass, walk the changed code looking for the patterns in the corresponding file in the category folder.
3. **For each candidate**, collect evidence (see Evidence Required per pass below). If you cannot collect at least two pieces of evidence, suppress.
4. **Apply suppression rules.** Start with [`shared/suppression-rules.md`](shared/suppression-rules.md), then the category file for the active pass: [`correctness/suppression-rules.md`](correctness/suppression-rules.md), [`overengineering/suppression-rules.md`](overengineering/suppression-rules.md), [`maintainability/suppression-rules.md`](maintainability/suppression-rules.md), or [`comprehension/suppression-rules.md`](comprehension/suppression-rules.md). When in doubt, suppress.
5. **Emit a structured finding** (JSON, see schema below). This is the source of truth — comments are derived from it.
6. **Generate review comments** only for `high` confidence or strong `medium` findings, using the format in [`shared/comment-format.md`](shared/comment-format.md).

## Evidence required (per pass)

Gather **at least two** of the evidence types for the active pass before reporting:

### Correctness

#### `null-access`
1. **Type evidence** — the type allows `null` or `undefined` (optional property, return type with `| undefined`, no narrowing in scope).
2. **Source evidence** — the value comes from `.find(...)`, `Map.get(...)`, index lookup, cache/database/API.
3. **Guard placement** — no guard exists, or the guard appears *after* the dereference.
4. **Convention evidence** — nearby code already treats this value as nullable.

#### `swallowed-exceptions`
1. **Catch evidence** — a `catch` block or `.catch(...)` that does not re-throw, propagate, or take a meaningful recovery action.
2. **Scope evidence** — the caught exception is discarded: binding unused, named `_`, or only passed to `console.log`/`logger.debug` with no re-throw.
3. **Caller evidence** — the calling code has no other way to learn the operation failed.
4. **Context evidence** — silent failure would cause user-visible data loss, incorrect state, or a downstream crash harder to diagnose than the original error.

#### `suspicious-conditional`
1. **Logic evidence** — the condition is provably tautological, contradictory, or identical to another branch given the types and values in scope.
2. **Type evidence** — the type makes the comparison degenerate (non-nullable compared to `null`, `boolean` compared to `"true"`, wrong boundary for the stated invariant).
3. **Behavioral evidence** — the branch body is empty, unreachable, or identical to the else branch, confirming the condition has no effect.
4. **Convention evidence** — nearby code uses the correct operator or boundary, making the candidate an inconsistency.

#### `mutation-of-input`
1. **Mutation evidence** — a mutating operation (`=` on a property, `sort`/`reverse`/`splice`/`push` on an array, `delete` on a property) is applied directly to a parameter or a shallow copy of one.
2. **Caller evidence** — the caller has no indication mutation will occur: the function name implies a pure transformation, the parameter type is not a builder/accumulator, and the return value is the same reference passed in.
3. **Alias evidence** — the caller retains a reference to the passed value and uses it after the call, meaning the mutation is observable.
4. **Convention evidence** — sibling functions handling the same type return new values, making this function an inconsistency.

#### `implicit-boolean-coercion`
1. **Type evidence** — the value being coerced to boolean has a type that includes a falsy-but-valid member: `number` (zero is falsy), `string` (empty string is falsy), an array or object (always truthy — check is meaningless), or a union that includes `false` where `undefined` was the intended exclusion.
2. **Semantic evidence** — the falsy member the guard would exclude (`0`, `""`, `false`) is a plausible and valid value in the domain: zero quantity, empty search query, explicit false toggle, zero-based index.
3. **Operator evidence** — `||` is used for a default where `??` would be correct, or `.filter(Boolean)` is used on an array whose element type includes `0`, `""`, or `false`, or JSX uses `{count && ...}` where `count` is typed as `number`.
4. **Convention evidence** — nearby code uses explicit null checks (`!= null`, `!== undefined`, `=== null`) for similar values, making the bare truthiness check an inconsistency.

#### `implicit-test-ordering`
1. **Shared state evidence** — a variable, object, database record, cache entry, or singleton is written by one test and read by another with no intervening reset or recreation.
2. **Missing arrange evidence** — a test has no setup for data or state it clearly requires, meaning that state must have been produced by a prior test.
3. **Mutation evidence** — a `beforeAll` or module-level object is mutated by one or more tests rather than recreated fresh per test, making each test's starting conditions depend on execution order.
4. **Ordering signal evidence** — test names use sequential numbering, step language, or lifecycle terms ("step 1", "then", "after") implying a required order that the test runner does not enforce.

### Overengineering

#### `boolean-flag-splitter`
1. **Branch evidence** — the boolean parameter controls an `if`/`else` whose two branches differ in return type, side effects, or core logic — not just a minor variation in output.
2. **Caller evidence** — every call site passes a literal `true` or `false` (never a variable), meaning callers have made a static decision and the flag is standing in for two distinct function names.
3. **Divergence evidence** — the two branches share little code: different I/O, different return shapes, or side effects present in one branch but absent in the other.
4. **Threading evidence** — the boolean is passed through one or more intermediate functions that do not use it directly, indicating the split is not local to a single decision point.

#### `passthrough-wrapper`
1. **Delegation evidence** — the function, method, or class body contains only a call to another function/method and returns its result without modification.
2. **Signature evidence** — the wrapper's parameters map 1:1 to the callee's parameters with no reordering, merging, splitting, defaulting, or validation.
3. **Behavior evidence** — no logging, metrics, error translation, access control, or other cross-cutting concern is added; the wrapper is invisible at runtime.
4. **Substitutability evidence** — callers could import and call the wrapped target directly without any change to their logic, types, or error handling.

### Maintainability

#### `primitive-obsession`
1. **Interchangeability evidence** — two or more distinct domain concepts share the same primitive type, making it possible to pass one where the other is expected with no compile-time error (e.g., `userId: string` and `orderId: string` are interchangeable to the type system).
2. **Validation scatter evidence** — the same format check, range guard, or parsing logic for the primitive value is duplicated at multiple call sites rather than encapsulated once in a type.
3. **Semantic loss evidence** — the primitive's valid range or invariants are invisible to callers: a `number` that must be positive, a `string` that must be a valid email, an `id` that must match a specific format.
4. **Convention evidence** — nearby domain types in the same codebase use wrapper types or branded types for similar values, making the raw primitive an inconsistency.

#### `feature-envy`
1. **Access count evidence** — the function reads three or more distinct fields or methods from a single foreign object, while referencing its own class's data (`this`) zero or one times.
2. **Derivation evidence** — the function's return value or side effect is computed entirely from one foreign object's data, with no contribution from the function's own module or state.
3. **Displacement evidence** — moving the function to the foreign object would require passing fewer arguments and would remove the need to expose internal fields through a public interface.
4. **Deep navigation evidence** — the function traverses two or more levels into a foreign object's structure (`order.customer.contactInfo.email`), coupling it to implementation details the foreign object should encapsulate.

#### `mixed-abstraction-levels`
1. **Vocabulary shift evidence** — within a single function body, identifiers shift from business terms (`validateOrder`, `chargeCustomer`) to implementation terms (`Buffer`, `statusCode`, `23505`, `Content-Type`), requiring the reader to switch mental models mid-function.
2. **Extractability evidence** — a contiguous block of lines inside the function could be extracted into a well-named helper with no change to callers, and that helper's name would be more specific than the parent function's name.
3. **Granularity mismatch evidence** — some steps in the function are single named calls (`await notifyCustomer(order)`) while others are multi-line inline implementations of a comparable step, making the function uneven to read.
4. **Layer violation evidence** — a function in the business/service layer directly references persistence details (SQL, ORM internals, raw error codes) or protocol details (HTTP headers, status codes, serialization formats) that belong in a lower layer.

### Comprehension

#### `overly-clever-one-liner`
1. **Parsing effort evidence** — the expression requires more than one pass to understand: the reader must trace operator precedence, short-circuit evaluation, or destructuring mechanics before they can determine what the expression produces.
2. **Decomposability evidence** — the expression can be split into two or three named intermediate variables with no change to behavior, and those names would make each step's purpose self-evident.
3. **Idiom absence evidence** — the construct is not a widely-recognised JS/TS idiom (e.g., nested ternaries, comma operator, `~indexOf`, bit shifts for non-bit purposes) — a reader unfamiliar with the specific trick would be blocked.
4. **Debuggability evidence** — the expression cannot be inspected mid-computation in a debugger without rewriting it, because all intermediate values are anonymous and ephemeral.

#### `inconsistent-abstraction-in-name`
1. **Vocabulary mismatch evidence** — the name uses terms from a different layer than the surrounding context: infrastructure terms (`httpResponse`, `sqlRow`, `dbRecord`) in business logic, or business terms (`createOrder`) next to persistence terms (`deleteFromOrdersTable`) in the same module.
2. **Sibling contrast evidence** — two or more names in the same scope (module, class, or function signature) use incompatible vocabulary levels, making one name an outlier: one function is `createOrder`, the next is `executeInsertQuery`.
3. **Implementation encoding evidence** — the name encodes a mechanism or transport that callers should not need to know: `fetchUserFromDatabaseByPrimaryKey`, `sendHttpPostRequest`, `serializeToJsonAndPersist`.
4. **Expectation violation evidence** — the name implies a query (`get`, `find`, `is`, `has`) but the function has side effects, or the name implies a single concern but contains multiple sequential verbs (`getAndCache`, `loadAndValidateAndSave`).

## Finding schema

```json
{
  "skill": "pr_analysis",
  "category": "correctness",
  "pass": "null-access",
  "file": "src/users.ts",
  "line": 42,
  "expression": "user.name",
  "claim": "user.name may throw because users.find(...) can return undefined",
  "evidence": [
    "users.find(...) returns User | undefined",
    "no guard between assignment at line 41 and dereference at line 42",
    "an unreachable guard exists at line 47"
  ],
  "confidence": "high",
  "severity": "blocking",
  "suggested_fix": "Guard `user` before reading `name`, throw a domain error, or use `?? defaultUser`."
}
```

## Confidence calibration

| Confidence | Criteria | Action |
|---|---|---|
| `high` | Two or more evidence types present, failure path is concrete and demonstrable. | Comment as `Blocking:` or `Suggested:`. |
| `medium` | Two evidence types present, plausible failure path, but alternative interpretations exist. | **Suppress.** Do not comment. |
| `low` | One evidence type, speculative, or the pattern is clearly defensive/intentional. | **Suppress.** Do not comment. |

## Output format

### `--format=report` (default)

For CLI use. Human-readable output — no JSON. Group findings by pass, then output:

1. **Review comments** — derived from `high` confidence findings only, using the format in [`shared/comment-format.md`](shared/comment-format.md).
2. **Summary line** — `Found N issues across M passes (P reportable after suppression).`

If no findings across all passes, output exactly: `No issues detected in the changed code.`

### `--format=annotations`

For CI pipelines and PR review comment automation. Emit a single JSON array of findings from all passes — always, even if empty. No prose, no summary line.

Example:

```json
[
  {
    "skill": "pr_analysis",
    "category": "correctness",
    "pass": "null-access",
    "file": "src/users.ts",
    "line": 42,
    "expression": "user.name",
    "claim": "user.name may throw because users.find(...) can return undefined",
    "evidence": [
      "users.find(...) returns User | undefined",
      "no guard between assignment at line 41 and dereference at line 42"
    ],
    "confidence": "high",
    "severity": "blocking",
    "suggested_fix": "Guard `user` before reading `name`, throw a domain error, or use `?? defaultUser`."
  },
  {
    "skill": "pr_analysis",
    "category": "correctness",
    "pass": "swallowed-exceptions",
    "file": "src/storage.ts",
    "line": 58,
    "expression": "catch (e) {}",
    "claim": "Exception from writeFile() is silently discarded; callers cannot detect the failure",
    "evidence": [
      "catch block body is empty — exception binding `e` is never used",
      "writeFile failure is not communicated via return value or callback"
    ],
    "confidence": "high",
    "severity": "blocking",
    "suggested_fix": "Re-throw the error, return a Result/Either type, or at minimum log at error level and document why proceeding is safe."
  }
]
```

Suppress `low` confidence findings entirely. 