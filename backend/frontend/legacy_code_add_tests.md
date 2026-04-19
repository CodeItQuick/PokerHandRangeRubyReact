# Adding Tests to Legacy Code

## Key thinkers
- **Michael Feathers** — coined "characterization test" and "seam"
- **Kent Beck** — treat tests as experiments: run the code, observe the result, don't trust your reasoning about legacy code

## Find or create a seam first
- A seam is a place where you can swap behavior without editing the code there (constructor parameter, injected dependency, function argument)
- If no seam exists, introduce one in its own commit before writing any tests
- Verify behavior is unchanged after introducing the seam

## Writing characterization tests
- Write a test, run it, copy the actual output into the assertion — you are documenting reality, not intent
- If the output surprises you, note it but don't fix it yet — fixing comes after the safety net exists
- Test through the public entry point; don't reach into internals
- One rule per test — a failing test should identify exactly which rule broke
- Name tests after the rule, not the code path (`"quality never exceeds 50"` not `"else branch"`)
- Never change source code while adding tests — do them in separate commits

## What to cover
- Map every branch before writing tests
- Cover: happy path, each special case, boundary values, behavior before and after each threshold
- Use a data table for boundary cases rather than copy-pasting similar tests

## Order
1. Simplest inert case (nothing changes)
2. Normal path with typical inputs
3. Normal path at and past a boundary
4. Floor/ceiling constraints
5. Each named special case, before and after its boundary
6. New feature — write the test last, let it fail, then implement
