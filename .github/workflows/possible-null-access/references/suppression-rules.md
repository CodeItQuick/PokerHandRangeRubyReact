# Suppression Rules

A noisy reviewer is worse than a quiet one. **When in doubt, suppress.** This file lists the cases where a candidate looks like a null-access bug but should not be reported.

## Hard suppressions (always)

Suppress without further analysis when any of these are true:

### S1. Optional chaining is used

```ts
return user?.profile?.name;
```

The `?.` operator already handles the missing case.

### S2. Nullish coalescing supplies a default

```ts
return (user ?? defaultUser).name;
const name = user?.name ?? "Anonymous";
```

### S3. Inline guard on the same expression

```ts
return user && user.name;
return user ? user.name : null;
```

### S4. Earlier guard returns, throws, or continues

```ts
const user = users.find(u => u.id === id);
if (!user) throw new NotFound();
return user.name;        // safe — guard returned
```

Also covered:
- `if (!user) return null;`
- `if (!user) continue;`
- `assertExists(user)`, `invariant(user, "...")`, `assert(user)`
- `if (user == null) { ... return; }`

### S5. Value provably non-nullable

The value is constructed locally and the type is non-nullable:

```ts
const u = { name: "x" };
return u.name;
```

Or comes from a function with a non-nullable return type:

```ts
const config = loadConfig();    // returns Config, not Config | undefined
return config.endpoint;
```

### S6. The dereference is unchanged code

If the line in question is not part of the diff, do not report it. This skill reviews *what changed*. Pre-existing tech debt is out of scope unless the user explicitly asks.

### S7. Test code intentionally exercising failure

```ts
it("throws when user is missing", () => {
  const user = users.find(u => u.id === "missing");
  expect(() => user.name).toThrow();   // intentional
});
```

Tests that deliberately trigger the failure path are not bugs.

### S8. Compiler/type-checker would already error

If TypeScript with `strictNullChecks` would flag this, the author will see it from the type checker. Do not duplicate the type checker's job. Only report when the type system is being silenced (`!`, `as`, `any`) or is not in use.

## Soft suppressions (downgrade confidence)

Don't suppress entirely, but drop confidence by one level:

### D1. Non-null assertion present with adjacent comment

```ts
// Safe: caller guarantees user exists in this code path
const user = users.find(u => u.id === id)!;
return user.name;
```

The comment is documentation, not proof, but it shifts intent. Downgrade `high` to `medium`. If the comment is missing, do not downgrade.

### D2. Value comes from a parameter with a contract-style name

```ts
function greet(requiredUser: User | undefined) {
  return requiredUser.name;
}
```

The name signals intent but doesn't make the access safe. Downgrade and phrase as a question: "Should `requiredUser` be guarded here, or should the parameter type be tightened to `User`?"

### D3. The function is a private helper with one caller

If you can see the caller and the caller already guards, downgrade. If you cannot see the caller, do not downgrade — this is a public surface.

## Anti-suppressions (do NOT suppress)

These look safe but aren't:

### A1. Guard on a *different* property

```ts
if (user.id) {
  return user.profile.name;   // profile, not id, may be undefined
}
```

The guard is on the wrong field. Still report.

### A2. Guard inside a callback that runs later

```ts
setTimeout(() => {
  if (!user) return;
}, 100);
return user.name;             // executes synchronously, before the guard
```

### A3. Guard via boolean conversion of a falsy-but-defined value

```ts
if (user.count) {                // 0 is falsy
  return data[user.count].name;  // data[0] may exist or not
}
```

Boolean coercion is not a null check for numeric or string fields.

### A4. Type assertion that lies

```ts
const user = users.find(u => u.id === id) as User;
return user.name;
```

`as` does not perform a runtime check. Treat the same as a non-null assertion without a comment.
