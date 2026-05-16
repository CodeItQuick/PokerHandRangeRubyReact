# Comment Format

Review comments are the user-facing output. They must be specific, actionable, and proportional to severity. The structured finding is the source of truth — the comment is just a derivation.

## Structure

```
{Severity}: {what may fail and where}. {why it may fail}. {suggested action, often as a question}.
```

## Severity labels

- **`High:`** — high confidence, change should not merge until addressed.
- **`Medium:`** — medium confidence, author should consider but may have context that makes it OK.
- **`Low:`** — low-stakes improvement. Use sparingly; usually suppress instead.

Do not use bare statements without a label. The severity label tells the author whether they must act.

## Examples — good

> **High:** `user.name` on line 42 is read before `user` is checked. `users.find(...)` returns `undefined` when no match exists, and the guard at line 47 is unreachable. Could we move the guard above the access, or throw a `UserNotFoundError`?

> **Medium:** `session.touch()` may throw because `sessions.get(sessionId)` returns `undefined` for unknown sessions. If the session is guaranteed to exist here, could we add an `assertExists` to make that contract explicit?

> **Medium:** `config.endpoint` assumes `configs[envName]` returns a value, but the type is `Record<string, Config>`. If `envName` is user-supplied, this could be undefined at runtime. Worth a guard?

## Examples — bad

> ❌ "This might be null." — vague, no location, no action.

> ❌ "Add a null check." — no rationale, no severity.

> ❌ "**High:** This is broken." — no explanation, no actionable fix.

> ❌ "**Low:** Consider using optional chaining everywhere in this file for consistency." — out of scope, not grounded in the diff, prescriptive without reason.

> ❌ "**Medium:** Why didn't you guard this?" — accusatory tone. Comment on the code, not the person.

## Phrasing rules

1. **Name the expression.** Quote it in backticks. The author should be able to find it without re-reading the diff.
2. **State the failure mode.** "may throw", "returns undefined when ...", "panics on missing key".
3. **Cite the evidence.** Mention the source operation (`find`, `get`, optional property) so the author can verify quickly.
4. **End with a question or suggestion**, not a command. The author may have context you don't.
5. **One concern per comment.** If you see two distinct null issues in the same function, post two comments. Don't bundle.

## Length

Keep each comment to 2–4 sentences. If you find yourself writing a paragraph, the issue probably needs a design discussion, not a line comment.

## When to ask vs. assert

| Situation | Phrasing |
|---|---|
| Type system clearly says nullable, no guard at all | Assert: "`x.y` will throw because `x` is undefined when ..." |
| Type system silenced via `!` or `as` | Ask: "Is `x` guaranteed non-null here? The `!` removes the type error but ..." |
| Source operation can return undefined but you can't see the contract | Ask: "Does `getUser(id)` always return a user, or can it return null?" |
| Guard exists but might not cover all branches | Ask: "Does the guard at line N cover the path through line M?" |
