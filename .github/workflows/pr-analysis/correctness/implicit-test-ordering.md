# Detection Patterns — Implicit Test Ordering

Patterns where a test silently depends on state created or mutated by another test, making the suite order-sensitive without expressing that dependency. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `references/suppression-rules.md` before reporting.

## 1. Test reads a variable only written by a sibling test

```ts
let createdUserId: string;

it("creates a user", async () => {
  const user = await api.createUser({ name: "Alice" });
  createdUserId = user.id;   // written here
});

it("fetches the created user", async () => {
  const user = await api.getUser(createdUserId);   // reads value from sibling
  expect(user.name).toBe("Alice");
});
```

`createdUserId` is `undefined` if the second test runs first or in isolation. The dependency is real but invisible — it lives in a shared variable rather than an explicit setup.

## 2. Test assumes a database record exists without creating it

```ts
it("updates the user's email", async () => {
  // no arrange — assumes a user with id 1 already exists
  await api.updateEmail(1, "new@example.com");
  const user = await db.findById(1);
  expect(user.email).toBe("new@example.com");
});
```

The record with id `1` exists only because an earlier test created it. Run this test in isolation or after a database reset and it fails. The setup that makes the test valid is not inside the test.

## 3. `beforeAll` sets shared state that tests mutate

```ts
describe("cart", () => {
  let cart: Cart;

  beforeAll(() => {
    cart = new Cart();   // one shared instance
  });

  it("adds an item", () => {
    cart.add({ id: "a", qty: 1 });
    expect(cart.items).toHaveLength(1);
  });

  it("removes an item", () => {
    cart.remove("a");              // assumes the previous test ran and added "a"
    expect(cart.items).toHaveLength(0);
  });
});
```

`beforeAll` creates one instance for all tests. Mutations from earlier tests are visible to later ones. The remove test only passes if the add test ran first.

## 4. Numbered or sequentially named tests implying order

```ts
it("step 1: registers account", async () => { ... });
it("step 2: verifies email", async () => { ... });
it("step 3: logs in with verified account", async () => { ... });
```

Explicit numbering or step-language in test names is a declaration that order matters. Test runners do not guarantee alphabetical or source order across all environments and configurations. The dependency is documented in prose but not enforced.

## 5. Shared module-level mutable object mutated across tests

```ts
const store = { count: 0 };   // module-level, shared

it("increments the store", () => {
  increment(store);
  expect(store.count).toBe(1);
});

it("decrements the store", () => {
  decrement(store);
  expect(store.count).toBe(0);   // only true if increment ran first
});
```

Module-level objects persist across tests in the same file because the module is not re-evaluated between tests. Mutations accumulate invisibly.

## 6. `afterAll` or `afterEach` cleanup that a later test depends on not having run

```ts
afterAll(async () => {
  await db.truncate("users");
});

// In a different describe block in the same file:
it("counts all users", async () => {
  const count = await db.count("users");
  expect(count).toBeGreaterThan(0);   // assumes users table was not truncated yet
});
```

When test execution order determines whether cleanup has run, a test's outcome depends on its position relative to the cleanup rather than its own setup.

## 7. Global singleton or cache seeded by one test and consumed by another

```ts
it("warms the cache", async () => {
  await cache.set("config", await loadConfig());
});

it("uses cached config", async () => {
  const config = await cache.get("config");   // undefined if warm test didn't run
  expect(config.featureFlags).toBeDefined();
});
```

Singletons — caches, registries, service locators — persist across tests unless explicitly reset. A test that seeds one and a test that consumes one are coupled without any shared variable to make the dependency visible.

## 8. Test that deliberately skips setup because "the previous test handles it"

```ts
describe("order lifecycle", () => {
  it("places an order", async () => {
    await placeOrder({ id: "ord-1", items: [...] });
  });

  it("ships the order", async () => {
    // no arrange: relies on ord-1 existing from the test above
    await shipOrder("ord-1");
    expect(await getOrder("ord-1")).toMatchObject({ status: "shipped" });
  });
});
```

Even within a `describe` block, test runners can run tests in parallel, randomized order, or selectively (e.g., `--testNamePattern`). An omitted arrange that relies on a sibling having run is an invisible ordering dependency.

---

## Patterns to **not** flag

- **`beforeEach` that recreates state** — a `beforeEach` that constructs a fresh object or inserts seed data before every test is the correct pattern; each test gets its own isolated setup.
- **`beforeAll` for expensive one-time setup that tests treat as read-only** — spinning up a server, creating a schema, or seeding read-only reference data once is legitimate. Flag only when tests mutate the shared resource.
- **Explicit test sequencers** — some frameworks (`jest-circus`, `jest-sequential`) allow declared sequential execution. If the ordering is enforced by the framework configuration, not assumed by the tests, suppress.
- **Scenario-style integration tests documented as sequential** — end-to-end or workflow tests that are explicitly designed to run in sequence and documented as such (e.g., in a `describe("full checkout flow")` with a comment explaining the intent) are a deliberate tradeoff, not an accidental dependency.
- **Factories called inside each test** — if each test calls a factory or fixture helper that creates its own data, the tests are self-contained even if they look similar.