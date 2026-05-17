# Detection Patterns — Passthrough Wrapper

Patterns where a function, method, or class exists solely to call something else with the same arguments and return the result unchanged. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `references/suppression-rules.md` before reporting.

## 1. Function body is a single delegating call

```ts
function getUser(id: string): User {
  return userService.getUser(id);
}

function saveOrder(order: Order): Promise<void> {
  return orderRepository.save(order);
}
```

The wrapper adds a name but no behavior. Callers could call `userService.getUser` or `orderRepository.save` directly. The wrapper's existence implies it does something — it doesn't.

## 2. Arguments are renamed but otherwise unmodified

```ts
function createSession(userId: string, token: string) {
  return sessionStore.create(userId, token);  // same args, same order
}

function notify(recipient: string, body: string) {
  return mailer.send(recipient, body);        // renamed: user→recipient, message→body
}
```

Renaming parameters to pass them through identically provides no abstraction. The names exist to match a local convention, but the call is transparent. The only effect is obscuring which function actually runs.

## 3. Class method fully delegates to a held dependency

```ts
class OrderService {
  constructor(private repo: OrderRepository) {}

  save(order: Order) {
    return this.repo.save(order);      // no validation, no transformation
  }

  findById(id: string) {
    return this.repo.findById(id);     // identical signature
  }

  delete(id: string) {
    return this.repo.delete(id);       // identical signature
  }
}
```

When every public method of a class is a one-line delegation to a dependency with no logic added, the class is a passthrough shell. Callers could depend on the repository directly.

## 4. Async wrapper that only awaits another async function

```ts
async function fetchProfile(userId: string) {
  return await userApi.getProfile(userId);
}

async function submitForm(data: FormData) {
  return await formHandler.submit(data);
}
```

Adding `async`/`await` to a function that returns a Promise does not change observable behavior — it just adds an unnecessary microtask tick and a new stack frame. The wrapper buys nothing.

## 5. Middleware or handler that immediately calls the next layer

```ts
app.use((req, res, next) => {
  return authMiddleware(req, res, next);  // no modification to req, no guard
});

function handleRequest(req: Request) {
  return router.handle(req);   // no pre/post processing
}
```

A middleware that adds no pre-processing, no post-processing, and no error handling is invisible at runtime. The layer exists in the call stack without contributing to behavior.

## 6. Higher-order function that returns another function unchanged

```ts
function withLogging(fn: () => void) {
  return fn;   // no logging, no wrapping — just returns fn
}

function memoize(fn: (x: number) => number) {
  return fn;   // placeholder that was never implemented
}
```

A higher-order function that returns its argument directly is a stub — either an unimplemented placeholder or a wrapper whose logic was removed and the shell left behind.

## 7. Re-export module with no added value

```ts
// utils/index.ts
export { formatDate } from "./formatDate";
export { parseDate } from "./parseDate";
// only two exports, each used by exactly one consumer that could import directly
```

A barrel file is useful when it groups many related exports that consumers use together. When each export has only one consumer that could import the source directly, the barrel is pure indirection — a hop with no grouping value.

## 8. Try/catch that only re-throws unchanged

```ts
async function loadConfig(path: string) {
  try {
    return await fs.readFile(path, "utf8");
  } catch (e) {
    throw e;   // re-throws without transformation, logging, or context
  }
}
```

A try/catch that unconditionally re-throws the same error is a no-op. It does not log, wrap, enrich, or selectively handle. The `try`/`catch` structure adds indentation and the appearance of handling with no effect.

## 9. Interface or type alias with one property that mirrors its target

```ts
interface UserServiceInterface {
  getUser(id: string): Promise<User>;
  saveUser(user: User): Promise<void>;
}

class UserService implements UserServiceInterface { ... }
// UserServiceInterface is only ever used as the type of UserService — never mocked, never swapped
```

An interface that exists solely to name the type of its one implementation, and is never used for substitution, mocking, or multiple implementations, is a passthrough type. The concrete class could be used directly.

---

## Patterns to **not** flag

- **Wrappers that add logging, metrics, or tracing** even if the core call is a pass-through — observability is a real behavior difference.
- **Wrappers that translate error types** — catching a low-level error and re-throwing a domain error is value-adding indirection.
- **Wrappers that enforce a boundary** — e.g., an anti-corruption layer that sits at an architectural seam to decouple modules, even if the current transformation is 1:1.
- **Adapters bridging incompatible interfaces** — when the caller's expected signature genuinely differs from the callee's (different argument order, optional vs required, different name conventions), the adapter earns its existence.
- **Wrappers with a comment indicating planned future logic** — a stub that is part of a known in-progress task is not passthrough dead code, provided the comment is credible (references a ticket, is recent).
- **Barrel files grouping many exports** used together by multiple consumers — the grouping itself is the value.
- **Test doubles or spy wrappers** — passthrough behavior is intentional for test infrastructure.
- **Interface with multiple implementations in the diff** — even if there is currently one implementation, if a second is being added in the same PR, the interface is justified.