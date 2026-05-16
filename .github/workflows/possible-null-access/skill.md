---
name: possible-null-access
description: Detect possible null or undefined dereferences in code or pull request diffs. Use when asked to "check for null bugs", "find null dereferences", "review for null safety", or as a focused null-access pass during PR review. Produces structured findings and high-signal review comments, with explicit suppression rules to avoid noise.
---

# Possible Null Access Reviewer

Find places where code dereferences a value that may be `null` or `undefined`, and produce a high-signal review comment. Optimize for **suppression of weak findings** over coverage — a noisy reviewer is worse than a quiet one.

## Flags

`--format=<format>` — control output format. Valid values: `report` (default, grouped human-readable output for CLI use), `annotations` (machine-parseable JSON array for CI pipelines or PR review comment automation).

`--min-severity=<level>` — suppress findings below this severity level. Valid values: `HIGH`, `MEDIUM`, `LOW` (default: `LOW`, i.e. emit all). When active, omit suppressed findings silently — no summary of what was dropped.

Example CI invocation: `/possible-null-access --format=annotations --min-severity=HIGH`

---

## When to use

- Reviewing a PR or diff and the user asks specifically about null safety
- Running a focused null-access pass as part of a broader code review
- The user mentions "TypeError", "undefined is not an object", "cannot read property of undefined", or similar runtime errors

## Workflow

1. **Get the diff.** If reviewing a PR, run `git diff <base>...HEAD` and focus only on changed lines.
2. **Walk the changed code** looking for the patterns in [`references/detection-patterns.md`](references/detection-patterns.md).
3. **For each candidate**, collect evidence (see Evidence Required below). If you cannot collect at least two pieces of evidence, suppress.
4. **Apply suppression rules** in [`references/suppression-rules.md`](references/suppression-rules.md). When in doubt, suppress.
5. **Emit a structured finding** (JSON, see schema below). This is the source of truth — comments are derived from it.
6. **Generate review comments** only for `high` confidence or strong `medium` findings, using the format in [`references/comment-format.md`](references/comment-format.md).
7. **Calibrate against fixtures** in `fixtures/`. Every example in `should-flag/` must produce a finding; every example in `should-not-flag/` must not.

## Evidence required

Before reporting a finding, gather **at least two** of:

1. **Type evidence** — the type allows `null` or `undefined` (optional property, return type with `| undefined`, no narrowing in scope).
2. **Source evidence** — the value comes from an operation known to return missing data: `.find(...)`, `Map.get(...)`, `Record[key]` lookup, cache/database/API lookup.
3. **Guard placement** — no guard exists, or the guard appears *after* the dereference.
4. **Convention evidence** — nearby code in the same file already treats this value as nullable.

One piece of evidence alone is too weak. For example, "this came from `.find(...)`" is not enough if the function is provably called with a value known to exist.

## Finding schema

```json
{
  "skill": "possible_null_access",
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
  "severity": "HIGH",
  "suggested_fix": "Guard `user` before reading `name`, throw a domain error, or use `?? defaultUser`."
}
```

Severity values: `HIGH`, `MEDIUM`, `LOW`.

## Confidence calibration

| Confidence | Criteria | Severity | Action |
|---|---|---|---|
| `high` | All four evidence types present, or type system explicitly says nullable + no guard. | `HIGH` | Always emit; comment as `High:`. |
| `medium` | Two evidence types present, plausible failure path. | `MEDIUM` | Emit unless suppressed by `--min-severity`; comment as `Medium:` phrased as a question. |
| `low` | One evidence type, speculative. | `LOW` | Suppress by default. Do not comment. |

## Output format 

### `--format=report` (default)

For CLI use. Human-readable output — no JSON. Output two sections in order:

1. **Review comments** — derived from `high` and strong `medium` findings, using the format in [`references/comment-format.md`](references/comment-format.md).
2. **Summary line** — `Found N possible null-access issues (M reportable after suppression).`

If no findings, output exactly: `No possible null-access issues detected in the changed code.`

### `--format=annotations`

For CI pipelines and PR review comment automation. Emit a JSON array of findings — always, even if empty — using the finding schema above. No prose, no summary line.

Example:

```json
[
  {
    "skill": "possible_null_access",
    "file": "src/users.ts",
    "line": 42,
    "expression": "user.name",
    "claim": "user.name may throw because users.find(...) can return undefined",
    "evidence": [
      "users.find(...) returns User | undefined",
      "no guard between assignment at line 41 and dereference at line 42"
    ],
    "confidence": "high",
    "severity": "HIGH",
    "suggested_fix": "Guard `user` before reading `name`, throw a domain error, or use `?? defaultUser`."
  }
]
```

Suppress findings below the `--min-severity` threshold entirely — they do not appear in annotation output.
