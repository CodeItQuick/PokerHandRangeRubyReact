# Finding and Adding Missing Characterization Tests

A two-phase process. Complete the **Design Phase** first and get user approval before writing any code.

---

## Phase 1: Design — Audit and Plan

### Step 1: Identify the test framework

Read `package.json` (or equivalent) to determine:
- Which test runner is used (Jest, Mocha, Pytest, RSpec, etc.)
- How to run all tests (`npm test`, `pytest`, `bundle exec rspec`, etc.)
- How to run a single test file (look for `--` passthrough, `-t`, `--spec`, etc.)
- Where test files live and what naming convention they follow (`*.spec.js`, `*_test.py`, `*_spec.rb`, etc.)

### Step 2: Inventory source files with logic

Find every file that contains testable logic — functions, classes, reducers, sagas, services, utilities. Exclude:
- Entry points (`index.js`, `main.py`, `app.rb`)
- Pure config/constants files with no logic
- Style files
- Generated files

Group them by type (e.g. pure functions, async/side-effect layers, components/views, domain classes).

### Step 3: Inventory existing tests

List every test file and note what each one tests. For each test file, record:
- The source file it corresponds to
- The functions/classes/behaviors it covers
- Any obvious gaps (missing branches, missing edge cases, only a smoke test exists)

### Step 4: Produce a coverage gap table

For each source file with logic, determine its test status:

| Source file | Test file | Status | Gap description |
|---|---|---|---|
| `src/utils/format.js` | `src/test/format.spec.js` | Partial | happy path only, no null/empty input |
| `src/services/api.js` | *(none)* | Missing | no tests at all |
| `src/reducers/cart.js` | `src/test/cart.spec.js` | Good | all branches covered |

Status values: **Missing** (no test file), **Partial** (test file exists but gaps remain), **Good** (adequate coverage).

### Step 5: Prioritize

Order the **Missing** and **Partial** files by value:
1. Pure functions and domain logic — easiest to characterize, highest ROI
2. Reducers / state transitions — pure input→output, straightforward
3. Async layers (sagas, thunks, services) — more setup needed
4. Action creators / selectors — often trivial but worth a smoke test
5. Components / views — characterize render output last; most brittle

### Step 6: Write the implementation plan

Produce a numbered list of tasks, one per file (or group of closely related files). Each task should state:
- Which file to test
- What behaviors to characterize (list each function or branch)
- Where to place the new spec file
- Any setup required (mocks, fixtures, test doubles)

### Step 7: Save the plan to a file

Write the full plan — the test framework summary, coverage gap table, and all numbered tasks — to a file named `characterization_test_plan.md` in the repository root.

**Stop here. Present the plan to the user and wait for approval before writing any tests.**

---

## Phase 2: Implementation — Write the Tests

Only begin this phase after the user approves the plan from Phase 1.

### General rules

- **Never change source code while adding characterization tests.** Keep source edits and test additions in separate commits.
- Write a test, run it, copy the *actual* output into the assertion. You are documenting reality, not intent.
- If the output surprises you, note it as a comment but do not fix it. Fixing comes after the safety net exists.
- One assertion per behavior — a failing test should identify exactly one broken rule.
- Name tests after the behavior, not the code path: `"returns 0 combos when board card matches hand"` not `"else branch in comboCounter"`.

### Per-task workflow

For each task in the approved plan:
1. Read the source file in full before writing any test.
2. Map every branch and edge case.
3. Write the simplest possible test first (happy path, no branching).
4. Run it. If it fails unexpectedly, investigate before proceeding.
5. Add one test per additional branch or boundary.
6. Run the full test suite after each new spec file to check for regressions.
7. Mark the task complete.

### Definition of done for each task

- [ ] All listed behaviors have at least one test
- [ ] Every test passes green
- [ ] No existing tests were broken
- [ ] Source code was not changed
