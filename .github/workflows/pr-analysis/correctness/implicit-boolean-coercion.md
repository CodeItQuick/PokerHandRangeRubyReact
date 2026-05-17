# Detection Patterns — Implicit Boolean Coercion

Patterns where JS truthiness is relied upon in a context where the actual value type has surprising falsy members, silently excluding valid inputs or producing wrong branches. Each pattern is a *candidate*, not a finding — apply the evidence rules in `skill.md` and the shared suppression rules in `../shared/suppression-rules.md` before reporting.

## 1. Numeric value guarded with a bare truthiness check

```ts
function applyDiscount(cart: Cart, discountPercent: number) {
  if (discountPercent) {               // 0 is falsy — a 0% discount is skipped entirely
    cart.total *= (1 - discountPercent / 100);
  }
}

function paginate(page: number, limit: number) {
  if (!limit) return [];              // limit=0 might be intentional (no results); treated as "missing"
  return db.query({ offset: page * limit, limit });
}
```

`0` is falsy in JS. A truthiness guard on a `number` silently treats zero as absent. The fix is an explicit check: `discountPercent !== undefined`, `discountPercent != null`, or `typeof discountPercent === "number"`.

## 2. String value guarded with a bare truthiness check

```ts
function greet(name: string) {
  if (name) {
    return `Hello, ${name}`;
  }
  return "Hello, stranger";
}
// greet("") → "Hello, stranger" — empty string is a valid name in some locales/systems
```

`""` is falsy. A truthiness guard on a `string` silently treats the empty string as absent. This matters when empty string is a valid, distinct value: empty username, blank override, zero-length search term. Use `name != null` or `name !== undefined` when the concern is presence, not content.

## 3. Array or object in a conditional that is always truthy

```ts
const items = getItems();     // returns Item[] — possibly empty
if (items) {                  // always true — [] is truthy
  renderList(items);
}

function hasData(response: ApiResponse) {
  return !!response.data;     // {} is truthy — empty object passes even when data is absent
}
```

Arrays and objects are always truthy in JS, even when empty. A truthiness guard provides no meaningful check. Use `items.length > 0` or `Object.keys(response.data).length > 0` depending on the intent.

## 4. `||` default that clobbers a falsy-but-valid value

```ts
function getPort(config: Config) {
  return config.port || 3000;    // port=0 is technically valid; clobbered by default
}

function getLabel(item: Item) {
  return item.label || item.id;  // label="" would fall through to id unexpectedly
}

const count = options.count || 10;   // count=0 means "no items"; treated as "not set"
```

`||` selects the right side whenever the left is falsy, which includes `0`, `""`, `false`, and `NaN`. Use `??` (nullish coalescing) when the intent is "use default only if null or undefined", not "use default if falsy".

## 5. `&&` short-circuit rendering a value that may be `0` or `""`

```ts
function CartSummary({ count }: { count: number }) {
  return (
    <div>
      {count && <span>{count} items</span>}  {/* renders "0" as text when count is 0 */}
    </div>
  );
}
```

In JSX, `{0 && <Component />}` renders the literal `0` into the DOM rather than nothing, because `0` is falsy but not `null`/`undefined`/`false`. Use an explicit boolean: `{count > 0 && <span>...}` or `{Boolean(count) && <span>...}`.

## 6. Truthiness check on a value typed as `boolean | undefined`

```ts
type Config = { verbose?: boolean };

function run(config: Config) {
  if (config.verbose) {
    log("verbose mode");
  }
}
```

This one is safe — `false` and `undefined` both correctly suppress the log. Flag it only when the code *intends to distinguish* `false` (explicitly disabled) from `undefined` (not set), which requires `config.verbose === true` or `config.verbose !== false`. When that distinction matters, a truthiness check silently merges two semantically different states.

## 7. Filtering with `Boolean` that drops falsy-but-valid values

```ts
const ids = [1, 0, 2, null, 3].filter(Boolean);   // removes 0 along with null
// result: [1, 2, 3] — the 0 id is gone silently

const labels = ["a", "", "b"].filter(Boolean);     // removes empty string
// result: ["a", "b"] — the empty string is gone silently
```

`.filter(Boolean)` is idiomatic for removing `null`/`undefined`, but it also removes `0`, `""`, and `false`. If the array can contain those values and they are meaningful, use `.filter(x => x != null)` instead.

## 8. `switch` fallthrough or `default` that relies on JS coercion of the discriminant

```ts
function process(status: string | number) {
  switch (status) {
    case 0:
      return handleZero();
    case "0":
      return handleStringZero();   // never reached if status comes from JSON.parse("0") — it's a number
    default:
      return handleOther(status);
  }
}
```

When a discriminant might be a number or a string representation of that number, `switch` uses strict equality (`===`), so `0` and `"0"` are different cases. The bug is not in the switch itself but in the assumption about the type of the discriminant upstream.

---

## Patterns to **not** flag

- **Truthiness check on a value typed as `string | null | undefined`** where the intent is clearly "does this string exist and have content" — `if (name)` is idiomatic and correct when `name` is `string | null | undefined` and empty string should be treated the same as absent.
- **`||` for boolean defaults** where the left side is always boolean: `const enabled = flag || false` — no falsy-but-valid values exist in boolean space (other than `false` itself, which the default correctly replaces).
- **`&&` in JSX for components when the condition is a boolean expression** — `{isVisible && <Component />}` is safe because `false && ...` renders nothing. The risk is only when the left side is a non-boolean that could be `0`.
- **`.filter(Boolean)` on arrays of strings/objects where empty string and zero are not valid members** — removing `null` and `undefined` is the intent and the result is correct for that type.
- **`??` already used** — if the code already uses `??` instead of `||` for the default, the author is aware of the distinction and has handled it correctly.
- **Explicit `!== null && !== undefined` guards already present** — do not flag code that has already opted into explicit null/undefined checking.