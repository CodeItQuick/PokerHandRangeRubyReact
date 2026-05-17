# Detection Patterns — Inconsistent Abstraction in Name

Patterns where a name (function, variable, class, parameter) implies one level of abstraction but the surrounding context operates at a different level, or where sibling names in the same scope mix vocabulary from incompatible levels. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `../shared/suppression-rules.md` before reporting.

## 1. Sibling functions in the same module use incompatible vocabulary levels

```ts
// orders/service.ts
async function createOrder(data: OrderData): Promise<Order> { ... }
async function updateOrderRecord(id: string, patch: Partial<Order>): Promise<void> { ... }
async function deleteFromOrdersTable(id: string): Promise<void> { ... }
```

`createOrder` speaks in domain terms; `updateOrderRecord` mixes domain with persistence framing; `deleteFromOrdersTable` is a SQL description. A reader browsing the module cannot tell which abstraction layer they are in. Sibling functions should share vocabulary: either all domain (`createOrder`, `updateOrder`, `deleteOrder`) or all explicitly persistence (`insertOrderRow`, `updateOrderRow`, `deleteOrderRow`).

## 2. Function name encodes implementation detail rather than intent

```ts
async function fetchUserFromDatabaseByPrimaryKey(userId: string): Promise<User> { ... }

async function sendHttpPostRequestToPaymentGateway(payload: PaymentPayload): Promise<Receipt> { ... }
```

`fetchUserFromDatabaseByPrimaryKey` is three abstraction layers in one name: "fetch" (network/IO), "database" (persistence mechanism), "primary key" (schema internals). A caller does not need to know any of that — it just needs `getUser(userId)`. The implementation detail in the name creates false coupling: if the storage mechanism changes, the name becomes a lie. Use intent-first names that hide mechanism.

## 3. Technical nouns leaking into business-layer variable names

```ts
async function processPayment(order: Order): Promise<void> {
  const httpResponse = await paymentGateway.charge(order.total);
  const jsonPayload = httpResponse.data;
  const dbRecord = await persistPaymentResult(jsonPayload);
  await notifyCustomer(order, dbRecord);
}
```

`httpResponse`, `jsonPayload`, and `dbRecord` are infrastructure names inside a business function. The variable names advertise the transport and storage mechanisms to business-level readers. Names like `chargeResult`, `paymentConfirmation`, and `savedPayment` describe what the values *mean* rather than how they arrived.

## 4. Name implies a pure operation but embeds side-effect verbs

```ts
function getAndCacheUser(userId: string): Promise<User> { ... }
function fetchAndLogOrders(customerId: string): Promise<Order[]> { ... }
function loadAndValidateAndSaveConfig(path: string): Config { ... }
```

Compound verbs in a name (`getAnd...`, `fetchAnd...`, `loadAndValidateAnd...`) signal that the function does more than its primary operation and cannot be named cleanly. This is often a symptom of mixed concerns that belong in separate functions. Each verb beyond the first is a reason the name can't be simple.

## 5. Class named at one level but its methods are at another

```ts
class OrderService {
  executeSelectQuery(sql: string): Promise<Row[]> { ... }
  buildWhereClause(filters: Filter[]): string { ... }
  mapRowToEntity(row: Row): Order { ... }
}
```

`OrderService` implies a business-layer class but its methods name SQL operations (`executeSelectQuery`, `buildWhereClause`, `mapRowToEntity`). The class name and method names are from different layers. A reader calling `orderService.buildWhereClause(...)` is confused about what abstraction they are working with. These methods belong in a repository or query-builder class, not a service.

## 6. Parameter names that encode type rather than role

```ts
function createInvoice(userObject: User, itemsArray: OrderItem[], amountNumber: number): Invoice { ... }

function updateRecord(idString: string, dataObject: Record<string, unknown>): void { ... }
```

`userObject`, `itemsArray`, `amountNumber`, `idString`, `dataObject` encode the type in the parameter name rather than the role. This is redundant with the type annotation and says nothing about what the value *means* in the function's context. Use role-first names: `customer`, `lineItems`, `totalAmount`, `orderId`, `patch`.

## 7. Interface or type named at one level but its fields are at another

```ts
interface UserProfile {
  rawSqlRow: Record<string, unknown>;
  httpStatusCode: number;
  serializedJson: string;
  userId: string;
  displayName: string;
}
```

`UserProfile` is a domain type name but its fields mix infrastructure terms (`rawSqlRow`, `httpStatusCode`, `serializedJson`) with domain terms (`userId`, `displayName`). Infrastructure fields at this level indicate the type is being reused across layers rather than having a clean domain representation. The infrastructure fields belong in persistence/transport layer types, not a profile.

## 8. Name implies a query but the function has side effects

```ts
function getOrCreateUser(email: string): Promise<User> { ... }

function findAndDeleteExpiredTokens(): Promise<number> { ... }

function isNewUser(userId: string): Promise<boolean> {
  // also logs the check to audit trail
  await auditLog.record("user_check", userId);
  return userRepo.isNew(userId);
}
```

`getOrCreateUser` reads as a pure query but mutates state. `findAndDeleteExpiredTokens` presents deletion as a secondary effect of finding. `isNewUser` looks like a predicate but writes to an audit log. Callers who treat these as safe read-only operations will be surprised by the mutations. Names that start with `get`, `find`, `is`, `has`, or `check` create a strong expectation of purity.

---

## Patterns to **not** flag

- **Established idioms** like `getOrCreate`, `findOrCreate` that are well-known patterns in ORMs and persistence libraries — the name is conventional, not surprising.
- **Intentionally low-level modules** — a query builder, ORM, or serializer is expected to have names like `buildWhereClause` or `serializeRow`. Flag this pattern only when a higher-level module uses those names unexpectedly.
- **Framework-imposed naming** — controllers, resolvers, and middleware often use technical names because the framework requires it (e.g., `handleRequest`, `resolveQuery`).
- **Transitional or adapter layers** — a module explicitly bridging two levels (e.g., a repository) may legitimately use names from both layers to make the translation explicit.
- **Single isolated inconsistency with no sibling functions** — a naming inconsistency is weak evidence without sibling names to compare against. Suppress unless at least two names in the same scope confirm the pattern.
- **Abbreviations and shorthand** that are conventional in the domain (`req`, `res`, `ctx`, `dto`) — these are not abstraction violations, they are accepted shorthands.