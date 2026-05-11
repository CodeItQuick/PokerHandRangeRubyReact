# PR Review: Identifier Quality Analysis

Review the git diff for poorly named identifiers. Do not suggest renames or fixes — only identify and rate.

## Step 1 — Identify the Domain

Establish the domain vocabulary from the diff context:

1. Read test `describe`/`it` strings, file path segments, and method implementations to extract real domain terms.
2. Every identifier must be evaluated against this vocabulary — not against other identifiers in the code.
3. **Existing identifiers are suspects, not authorities.** A class named `CardHandSuit` does not prove that is a valid domain concept. Read the implementation to determine what concept it actually models.

**Behavior-derived terms.** For each non-trivial function or method, ask: *what does this compute or produce, independent of what it is called?* Name the concept from the operation, not the label already applied to it.

## Step 2 — Score Every Identifier

Rate every identifier visible in the diff. Score variables, parameters, callback arguments, class names, method names, and module names — existing class and function names are not exempt.

### CRITICAL

Zero meaning or opaque at every call site:

- Single-letter callback params: `x`, `e`, `v`, `n`, `s`, `a`, `b`
- Generic containers: `data`, `result`, `res`, `obj`, `info`, `val`, `temp`, `thing`, `stuff`
- Generic function params: `cb`, `fn`, `handler`, `func`, `arg`, `args`
- `item` / `el` / `elem` in map/filter/forEach when domain term exists
- `payload` holding a specific domain object
- `response` / `resp` holding a typed API result
- `_` used as a discard variable but then referenced
- `me` / `self` / `that` for `this` bindings
- `tmp` holding a permanent computed value
- Same variable name reused for different values in the same scope
- `config` / `opts` when the shape is domain-specific and well-known

### HIGH

Actively misleading or forces the reader to decode:

- Over-abbreviated: `mgr`, `svc`, `prc`, `usr`, `cfg`, `attrib`, `amt`, `cnt`, `idx`, `addr`
- Wrong type implication: `isValid` holds a string, `userList` holds a count, `userId` holds a full object, `count` holds a boolean, `flag` used as a meaningful boolean
- Concatenated noun-phrases that model no real concept: `ItemDataProcessor`, `UserActionHandler`, `DataManagerService`, `ConfigHelperUtil`, `CardHandSuit`
- Named for implementation not concept: `arrayOfStrings`, `promiseResult`, `objectWithKeys`
- Generic verb+noun: `handleData`, `processItem`, `doAction`, `runTask`
- Plural/singular mismatch: `users` holds a single user, `item` holds a collection
- Redundant type suffix: `userObject`, `itemArray`, `nameString`
- `Manager` / `Service` / `Helper` / `Util` suffix that adds no domain meaning
- Negated boolean: `isNotValid`, `notEnabled`, `noResults`
- Past tense for current state: `updatedUser` for the value currently in use

**Scoring inside a class or function:** do not inherit the parent name as ground truth. Score each identifier by what it actually does or holds, independent of the enclosing scope's name.

### MEDIUM

Structural words that carry no domain meaning:

- `source`, `target`, `origin`, `destination`, `output`, `input` with no domain qualifier
- Numbered suffixes: `result1`, `result2`, `user1`, `item2`
- Boolean missing `is`/`has`/`should`: `valid`, `active`, `loaded`, `open`
- Generic collection when a domain term exists: `items`, `entries`, `records`, `elements`
- Verb form used as a data variable: `fetching`, `loading`, `saving`
- `current` / `prev` / `next` without a domain qualifier
- `new` prefix that is always implied: `newOrder`, `newUser`
- Redundant context: `userUserName`, `cartCartItems`
- Tense mismatch: `processing` for an already-completed result

### LOW

Slightly imprecise but not actively confusing:

- Missing qualifier: `date` instead of `dueDate`, `price` instead of `unitPrice`
- Unnecessary `get` prefix on a variable (not a function): `getUser` assigned as a value
- Slightly abbreviated but decipherable in context: `addr`, `desc`, `qty`
- Domain term used imprecisely: `cost` when `subtotal` or `lineTotal` is the real concept
- Missing specificity: `message` when `errorMessage` or `confirmationMessage` is the concept
- Inconsistent casing with surrounding code: `camelCase` next to `snake_case` in the same scope

### Skip entirely

Loop counters (`i`, `j`, `k`), universally understood abbreviations (`id`, `url`, `html`, `json`, `err`), and names that are clearly fine in context.

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