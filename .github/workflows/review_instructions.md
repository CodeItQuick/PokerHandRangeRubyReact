# PR Review: Identifier Quality Analysis

Review the git diff for poorly named identifiers. Do not suggest renames or fixes — only identify and rate.

## Step 1 — Identify the Domain

Establish the domain vocabulary from the diff context:

1. Read test `describe`/`it` strings, file path segments, and method implementations to extract real domain terms.
2. For a poker app, domain terms include: *startingHand*, *holeCards*, *range*, *rangeGroup*, *suit*, *rank*, etc.
3. Every identifier must be evaluated against this vocabulary — not against other identifiers in the code.

**Existing identifiers are suspects, not authorities.** A class named `CardHandSuit` does not prove that is a valid domain concept.

## Step 2 — Score Every Identifier

Rate every identifier visible in the diff using this table:

| Rating   | Examples                                                                                              | Why bad                               |
|----------|-------------------------------------------------------------------------------------------------------|---------------------------------------|
| CRITICAL | `data`, `result`, `res`, `obj`, `temp`, `val`, `x`, `a`, `b`, `cb`, `fn`, `thing`, `stuff`, `info`  | Zero meaning — tells reader nothing   |
| CRITICAL | Single-letter params outside short loops: `e`, `v`, `s`, `n`                                         | Opaque at every call site             |
| HIGH     | Name implies wrong type or domain — `userList` holds a count, `isValid` holds a string               | Actively misleading                   |
| HIGH     | Over-abbreviated: `usr`, `mgr`, `svc`, `prc`, `cfg`, `ctx` when domain is clear                      | Forces reader to decode               |
| HIGH     | Concatenated noun-phrases with no real domain concept — `CardHandSuit`, `UserDataManager`             | Jams terms together; models nothing recognisable |
| MEDIUM   | `expected`, `actual`, `output`, `input` with no domain qualifier                                      | Structural words without meaning      |
| MEDIUM   | Numbered suffixes: `result1`, `result2`, `action1`                                                    | Signals you didn't know what to call it |
| LOW      | Slightly generic but not actively confusing in context                                                | Minor clarity improvement only        |

**Skip entirely:** loop counters (`i`, `j`, `k`), universally understood abbreviations (`id`, `url`, `html`, `json`, `err`), and names that are clearly fine in context.

## Output Format

Return ONLY valid JSON with no other text. The JSON must have exactly two fields:

- `"summary_table"`: a markdown table string listing every rated identifier with columns: Identifier, File, Line, Rating, Reason. Include ALL rated identifiers (LOW through CRITICAL).
- `"inline_comments"`: an array of inline comment objects for CRITICAL identifiers only. Each object must have: `"path"` (file path), `"line"` (line number in the new file, must exist in the diff), `"side"` (always `"RIGHT"`), `"body"` (explanation of why the name is CRITICAL and what domain concept it should represent).

Example:
```json
{
  "summary_table": "| Identifier | File | Line | Rating | Reason |\n|---|---|---|---|---|\n| `x` | src/foo.js | 12 | CRITICAL | Single-letter parameter, opaque at call site |",
  "inline_comments": [
    {"path": "src/foo.js", "line": 12, "side": "RIGHT", "body": "**CRITICAL identifier:** `x` has no meaning. Based on the domain context, this likely represents a card rank or player action — name it accordingly."}
  ]
}
```