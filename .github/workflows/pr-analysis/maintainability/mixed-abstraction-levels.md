# Detection Patterns — Mixed Abstraction Levels

Patterns where a single function body mixes high-level business intent with low-level implementation mechanics, forcing the reader to context-switch between two different levels of detail simultaneously. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `../shared/suppression-rules.md` before reporting.

## 1. Business logic interleaved with I/O or protocol details

```ts
async function completeOrder(orderId: string) {
  // high level
  const order = await validateOrder(orderId);
  const payment = await chargeCustomer(order);

  // drops to low level
  const headers = { "Content-Type": "application/json", "X-Idempotency-Key": order.id };
  const body = Buffer.from(JSON.stringify({ orderId, paymentId: payment.id })).toString("base64");
  const response = await fetch("https://fulfillment.internal/v2/orders", { method: "POST", headers, body });
  if (response.status !== 202) throw new Error(`Fulfillment rejected: ${response.status}`);

  // back to high level
  await notifyCustomer(order, payment);
}
```

`validateOrder` and `chargeCustomer` name business concepts. The fetch call names HTTP verbs, status codes, and encoding details. The reader must understand both levels at once. The low-level block should be extracted into `submitToFulfillment(order, payment)`.

## 2. Orchestration function that dips into a data structure's internals

```ts
async function processRefund(orderId: string) {
  const order = await getOrder(orderId);

  // business level
  if (!order.isRefundable()) throw new RefundNotAllowedError();

  // drops to data structure level
  const refundableItems = order.items.filter(i => !i.flags.has("non-refundable") && i.fulfilledAt < Date.now() - 86_400_000);
  const refundAmount = refundableItems.reduce((sum, i) => sum + i.price * i.quantity - i.discounts.reduce((d, x) => d + x.amount, 0), 0);

  // back to business level
  await issueRefund(order, refundAmount);
}
```

The filter and reduce belong inside `order.calculateRefundAmount()`. `processRefund` is an orchestrator; it should speak in terms of domain actions, not traverse item arrays and flag sets.

## 3. High-level function that contains inline SQL, raw queries, or serialization

```ts
async function getUserReport(userId: string) {
  const user = await findUser(userId);           // high level

  const rows = await db.query(                   // low level — raw SQL in business logic
    `SELECT e.name, e.amount, e.created_at
     FROM expenses e
     WHERE e.user_id = $1 AND e.deleted_at IS NULL
     ORDER BY e.created_at DESC`,
    [userId]
  );

  return { user, expenses: rows };               // high level
}
```

Raw SQL in a business function ties the domain logic to the database schema. Any change to the schema ripples into the business layer. The query belongs in a repository method (`expenseRepo.findByUser(userId)`).

## 4. Single function mixing configuration, setup, and execution

```ts
function runJob(config: JobConfig) {
  // setup / infrastructure
  const logger = new Logger({ level: config.logLevel, format: "json" });
  const pool = new ConnectionPool({ host: config.dbHost, max: 10, idleTimeout: 30_000 });
  const queue = new Queue(config.queueUrl, { retries: 3, backoff: "exponential" });

  // execution / business logic
  const items = await fetchPendingItems(pool);
  for (const item of items) {
    await processItem(item, queue, logger);
  }
}
```

Infrastructure wiring (creating loggers, pools, queues) belongs in a composition root or factory. The function's intent — run the job — is obscured by setup code. A reader looking for the business logic must skip past infrastructure boilerplate to find it.

## 5. Conditional branching at business level with formatting or encoding inside the branches

```ts
function renderNotification(event: Event): string {
  if (event.type === "payment_failed") {
    // business intent: payment failed message
    const cents = event.amount % 100;
    const dollars = Math.floor(event.amount / 100);
    return `Payment of $${dollars}.${String(cents).padStart(2, "0")} failed on ${new Date(event.timestamp).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`;
  }
  if (event.type === "order_shipped") {
    return `Your order was shipped via ${event.carrier.toUpperCase()} — tracking: ${event.trackingId.match(/.{1,4}/g)?.join("-")}`;
  }
  return "Unknown event";
}
```

The top-level `if` structure is a business-level dispatch. The string formatting, cent conversion, and regex chunking inside each branch are formatting-level details. Each branch should call a dedicated formatter (`formatPaymentFailedMessage(event)`, `formatShippedMessage(event)`).

## 6. Error handling at the wrong level of abstraction

```ts
async function createAccount(data: AccountData) {
  try {
    await accountService.create(data);
  } catch (e) {
    if (e.code === "23505") {              // PostgreSQL unique violation code
      throw new DuplicateAccountError();
    }
    if (e.message.includes("connection refused")) {
      throw new ServiceUnavailableError();
    }
    throw e;
  }
}
```

`createAccount` is a business-level function. Inspecting a PostgreSQL error code (`23505`) and parsing connection error strings are persistence-layer concerns. The translation from storage errors to domain errors belongs in the repository layer, not in the use case.

## 7. Utility helper that mixes computation with logging or metrics

```ts
function calculateShipping(weight: number, zone: string): number {
  logger.debug(`Calculating shipping: weight=${weight}, zone=${zone}`);   // observability

  const baseRate = ZONE_RATES[zone] ?? ZONE_RATES["default"];             // computation
  const surcharge = weight > 10 ? (weight - 10) * 0.5 : 0;
  const result = baseRate + surcharge;

  metrics.record("shipping.calculated", result);                          // observability
  logger.debug(`Shipping result: ${result}`);

  return result;
}
```

A pure computation function (`calculateShipping`) should have no side effects. The logging and metrics calls are cross-cutting concerns that change the function's testability and make its signature misleading. Observability belongs in the caller or in a decorator/middleware layer.

---

## Patterns to **not** flag

- **Small functions where the levels are close** — a 5-line function that calls one high-level method and does one low-level check is not mixed; the cognitive load is negligible.
- **Framework-imposed structure** — controllers, resolvers, and CLI handlers are designed to bridge levels. An Express handler that reads `req.body`, calls a service, and sets `res.status` is working within the framework's expected pattern.
- **Intentional low-level modules** — a module explicitly responsible for serialization, encoding, or protocol handling is expected to contain low-level code. Mixed levels is a concern only when a higher-level module unexpectedly drops to this level.
- **Configuration at module boundary** — a module's top-level initialization (`const db = new Pool(process.env.DATABASE_URL)`) is infrastructure setup at the right place: the module boundary. The problem is when setup appears inside functions that are supposed to do work.
- **Logging for auditability at domain events** — a single `logger.info("Order completed", { orderId })` at the end of a business function is an audit trail, not a level violation. The problem is when infrastructure details (log formats, metric names, raw error codes) appear inside business logic.