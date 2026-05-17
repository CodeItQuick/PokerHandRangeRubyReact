# Detection Patterns — Mutation of Input

Patterns where a function mutates its arguments instead of returning new values, violating caller expectations and producing action-at-a-distance bugs. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `../shared/suppression-rules.md` before reporting.

## 1. Direct property assignment on a parameter

```ts
function normalize(user: User) {
  user.name = user.name.trim();   // mutates caller's object
  user.email = user.email.toLowerCase();
  return user;
}
```

The caller passes `user` expecting it unchanged. The function returns the same reference, so the mutation is invisible at the call site — `normalize(u)` looks pure but isn't.

## 2. Array mutating methods called on a parameter

```ts
function process(items: Item[]) {
  items.sort((a, b) => a.id - b.id);   // sort mutates in place
  items.reverse();                      // reverse mutates in place
  items.splice(0, 1);                  // splice mutates in place
  return items;
}
```

`sort`, `reverse`, `splice`, `fill`, `copyWithin` all mutate the array in place. Callers who keep a reference to the original array will see their data change unexpectedly.

## 3. Object spread or assign that mutates a nested value

```ts
function applyDefaults(config: Config) {
  const result = { ...config };         // shallow copy
  result.nested.timeout = 5000;         // mutates config.nested — same reference
  return result;
}
```

A shallow spread only copies the top level. Nested objects are still shared references, so assignments to nested properties mutate the caller's original.

## 4. Parameter used as an accumulator and returned

```ts
function addItem(cart: Cart, item: Item) {
  cart.items.push(item);   // push mutates in place
  cart.total += item.price;
  return cart;
}
```

When the return value is the same reference that was passed in, callers may not realize the input was changed. This is especially dangerous when the same cart is referenced elsewhere.

## 5. Mutation inside a loop over a parameter collection

```ts
function markRead(messages: Message[]) {
  for (const msg of messages) {
    msg.read = true;          // mutates each element in place
    msg.readAt = Date.now();
  }
}
```

Iterating over a parameter and mutating each element changes the caller's collection. If the caller iterates the same array elsewhere concurrently or afterwards, they see modified objects.

## 6. `delete` operator on a parameter property

```ts
function sanitize(payload: Record<string, unknown>) {
  delete payload.password;   // mutates the caller's object
  delete payload.token;
  return payload;
}
```

`delete` mutates the object in place. The caller's original reference now has the property removed.

## 7. Passing a parameter directly to a function known to mutate

```ts
function sortedCopy(items: Item[]) {
  return _.sortBy(items);    // Lodash sortBy is non-mutating — fine
}

function sortedBad(items: Item[]) {
  return items.sort();       // Array.sort is mutating — not fine
}
```

The key distinction: wrapping a mutating function without copying first passes the mutation through to the caller.

## 8. Mutation conditional on a flag, so the bug is non-obvious

```ts
function transform(data: Data, inPlace = false) {
  const target = inPlace ? data : { ...data };
  target.value = compute(target.value);
  return target;
}
// called as: transform(myData)  — inPlace defaults to false, so target is a copy — fine
// called as: transform(myData, true)  — mutates the caller's data
```

Not a bug in itself, but flag when `inPlace = true` is the default, when the parameter name is not visible at the call site, or when the caller passes `true` without appearing to intend mutation.

---

## Patterns to **not** flag

- Functions that explicitly state mutation in their name or documentation: `sortInPlace`, `normalize!`, builder methods like `builder.setName(x)` where mutation is the API contract.
- React/Vue/Immer reducers that use `produce` or a draft — mutations inside the producer callback are intentional and scoped.
- Class methods that mutate `this` — instance mutation is the expected OOP contract.
- `Array.push` / `Map.set` / `Set.add` on a locally constructed collection that is then returned — the collection was created in the function, so callers have no prior reference.
- DOM manipulation functions — mutating DOM nodes is the entire purpose.
- Functions that accept a callback and pass the parameter to it without mutating it themselves.