# Detection Patterns — Boolean Flag Splitter

Patterns where a boolean parameter so fundamentally divides a function's behavior that the function is really two functions sharing a body. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `references/suppression-rules.md` before reporting.

## 1. Boolean branch covers the entire function body

```ts
function saveUser(user: User, dryRun: boolean) {
  if (dryRun) {
    validate(user);
    return { valid: true };
  } else {
    validate(user);
    await db.save(user);
    await cache.invalidate(user.id);
    return { saved: true };
  }
}
```

The two branches share almost nothing. The function is doing two different jobs — validation and persistence — controlled by a flag. The caller is forced to know the flag exists even when they only ever use one branch.

## 2. Boolean determines which of two return types is produced

```ts
function getUser(id: string, includeDeleted: boolean): User | DeletedUser {
  if (includeDeleted) {
    return db.queryWithDeleted(id);
  }
  return db.query(id);
}
```

When the return type changes based on the flag, callers must either cast or narrow the result. Two separate functions with specific return types communicate intent without forcing callers to understand the flag semantics.

## 3. Boolean passed straight through to a conditional deep inside

```ts
function renderPage(data: PageData, preview: boolean) {
  const header = buildHeader(data, preview);
  const body = buildBody(data, preview);
  const footer = buildFooter(data);  // preview ignored here
  return layout(header, body, footer);
}

function buildHeader(data: PageData, preview: boolean) {
  if (preview) return `<header class="draft">...`;
  return `<header>...`;
}
```

The flag is threaded through multiple call frames to reach the one place it branches. Each intermediate function carries a parameter it doesn't use directly. The flag's true effect is buried.

## 4. Boolean controls side effects but not the return value

```ts
function processPayment(order: Order, sendReceipt: boolean) {
  const result = charge(order);
  if (sendReceipt) {
    emailService.send(order.email, result);
  }
  return result;
}
```

Side effects are on/off based on a flag. The caller must pass `false` to suppress a side effect they may not even know about. `processPayment` and `processPaymentAndNotify` (or a separate `sendReceipt` call) make the side effect opt-in rather than opt-out.

## 5. Boolean is always a literal at every call site

```ts
// All call sites:
saveUser(user, false);
saveUser(user, false);
saveUser(user, false);
// one place:
saveUser(user, true);
```

When every call site passes a literal rather than a variable, the callers have already made a static decision. The flag is not being used for runtime dispatch — it is standing in for two function names. The one `true` call site is a strong signal that a named alternative (`dryRunSave`, `validateOnly`) would communicate better.

## 6. Boolean paired with a negation at the call site

```ts
processFile(path, !isProduction);
renderComponent(data, !this.readOnly);
sendNotification(event, !suppressAlerts);
```

When callers compute `!someFlag` to pass to the parameter, the parameter's polarity is inverted relative to how the caller thinks. This is a sign the parameter name, direction, or the split itself is wrong.

## 7. Two booleans that together define a small state space

```ts
function fetchData(useCache: boolean, forceRefresh: boolean) {
  if (!useCache && !forceRefresh) { ... }   // cold fetch
  if (useCache && !forceRefresh) { ... }    // cached fetch
  if (!useCache && forceRefresh) { ... }    // invalid combination
  if (useCache && forceRefresh) { ... }     // also invalid
}
```

Two booleans produce four combinations, but only two or three are valid. An enum or separate named functions eliminate the invalid combinations at the type level.

## 8. Boolean default that is almost always overridden

```ts
function compile(source: string, optimize: boolean = false) { ... }

// Every call site:
compile(src, true);
compile(src, true);
compile(src, true);
```

The default communicates the common case, but every caller overrides it. The default and the caller expectation are inverted — the default is wrong, or the cases should be named functions.

---

## Patterns to **not** flag

- **Toggle/feature-flag parameters** where the value comes from config, a feature flag system, or user preference at runtime — the whole point is runtime dispatch.
- **Verbose/quiet mode** flags passed from a CLI or test harness, where the caller genuinely decides at runtime.
- **`enabled`/`disabled` parameters on constructors** that configure an object's lifetime behavior — these are configuration, not behavior-splitting.
- **Parameters that modify magnitude, not kind** — `truncate(str, hard: boolean)` where both branches return a `string` via the same general approach.
- **One-liner branches** where both sides are a single expression and the function body is trivially short (3–4 lines total) — the duplication cost of two functions exceeds the clarity gain.
- **Framework-imposed signatures** where the boolean is required by an interface, decorator, or lifecycle contract the author does not control.