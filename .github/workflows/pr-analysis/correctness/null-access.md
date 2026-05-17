# Detection Patterns — Null Access

Patterns that frequently introduce null/undefined dereferences. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the null-access suppression rules in `../shared/suppression-rules.md` before reporting.

## 1. `.find(...)` result dereferenced

```ts
const user = users.find(u => u.id === id);
return user.name;        // user is User | undefined
```

`Array.prototype.find` returns `undefined` when no match exists. A common bug, especially in code paths that "should never" miss.

## 2. `Map.get(key)` / `Set` lookup result dereferenced

```ts
const session = sessions.get(sessionId);
session.touch();         // session is V | undefined
```

`Map.get` and similar lookups return `undefined` when the key is missing.

## 3. Record / index lookup with dynamic key

```ts
const config = configs[envName];
return config.endpoint;  // configs[envName] may be undefined
```

If `configs` is `Record<string, Config>`, the indexed access is `Config | undefined` under `noUncheckedIndexedAccess`. Even without the flag, the runtime behavior is the same.

## 4. Optional property access without guard

```ts
type User = { id: string; profile?: Profile };

function greet(user: User) {
  return `Hi, ${user.profile.name}`;   // profile is optional
}
```

The type system makes this explicit. The bug is forgetting the guard.

## 5. Async / await result that may be missing

```ts
const account = await accounts.findById(id);
account.balance += amount;
```

If `findById` returns `Account | null` (common in ORMs like Prisma, TypeORM), this throws on missing accounts.

## 6. Destructuring from a nullable value

```ts
const { name, email } = await getUser(id);  // getUser may return null
```

Destructuring from `null`/`undefined` throws immediately.

## 7. Guard exists, but **after** the dereference

```ts
const user = users.find(u => u.id === id);
const name = user.name;          // ← throws here
if (!user) {
  throw new NotFound();          // ← never reached
}
```

Strong signal: the author intended to guard but ordered it wrong.

## 8. Chain of optional accesses where only one link is guarded

```ts
if (user) {
  return user.profile.address.city;  // profile or address may still be undefined
}
```

The guard only covers `user`, not `profile` or `address`.

## 9. Non-null assertion used to silence the type checker

```ts
const user = users.find(u => u.id === id)!;
return user.name;
```

`!` removes the type error but not the runtime risk. Treat as a candidate unless there is a comment or assertion function justifying it.

## 10. Return value of a callback that may not be called

```ts
let result;
items.forEach(item => {
  if (item.active) result = item;
});
return result.id;        // result may be undefined
```

If no item matches the predicate, `result` is never assigned.

---

## Patterns to **not** flag

- Optional chaining: `user?.profile?.name`
- Nullish coalescing default: `(user ?? defaultUser).name`
- Logical AND guard on the same line: `user && user.name`
- Value just constructed locally: `const u = { name: "x" }; u.name`
- Value type is non-nullable and no narrowing was lost
- Inside a branch guarded by `if (x != null)` for `x` itself