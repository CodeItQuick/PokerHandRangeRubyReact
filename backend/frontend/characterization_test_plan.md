# Characterization Test Plan

## Test Framework
- Runner: **Mocha** (`npm test`)
- Single file: `npm test -- src/test/MainPage/action.spec.js`
- Assertions: **Chai** (`expect`)
- Components: **Enzyme** (`shallow`/`mount`)
- Spec files: `src/test/**/*.spec.js`

---

## Coverage Gap Table

| Source file | Test file | Status | Gap description |
|---|---|---|---|
| `EngineClasses/colorCellFn.js` | `Board/TableGridColumn.spec.js` | Partial | Only pair case tested; suited, offsuited, empty-cards, and mixed multi-range cases missing |
| `EngineClasses/countHandCombo.js` | *(none)* | **Missing** | No tests for `countHandCombo`, `comboCounter`, `suitedComboCounter`, `offsuitComboCounter`, `pairComboCounter` |
| `EngineClasses/findInArray.js` | *(none)* | **Missing** | No tests for `findInArray`, `equalSuitedHands`, `equalOffsuitedHands`, `equalPairsSpecificCombos` |
| `EngineClasses/Scenario.js` | `ScenarioLoader/index.spec.js` | Partial | Only instantiation checked; all four display methods untested |
| `EngineClasses/Scenarios.js` | `ScenarioLoader/index.spec.js` | Partial | `filteredScenarios`, `filteredScenariosArray`, `filteredScenariosPosition`, pagination boundaries untested |
| `containers/MainPage/actions.js` | `action.spec.js` | Partial | `transformHandRange` and `assignDeadcards` smoke-tested; `setHandRangeSelect`, `setHandRange`, `initGetScenario`, `initSaveScenario` untested |
| `containers/MainPage/saga.js` | *(none)* | **Missing** | `saveScenario`, `getScenario`, `getAllScenario` workers and watchers untested |
| `containers/MainPage/stateRangeFunctions.js` | `stateRangeFunctions.spec.js` | Partial | Only `mapNewHandRange` happy path; other branches/functions not characterized |
| `containers/MainPage/CurrentRanges/reducer.js` | *(none)* | **Missing** | `SET_HAND_RANGE_SELECT` case and default case untested |
| `containers/App/reducer.js` | *(none)* | **Missing** | No tests |
| `containers/App/selectors.js` | *(none)* | **Missing** | No tests |
| `containers/MainPage/ProgressIndicator/reducer.js` | `ProgressIndicator/reducer.spec.js` | Partial | Initial state and one action tested; other action types and edge cases missing |
| `containers/MainPage/selectors.js` | `selectors.spec.js` | Partial | Several selectors tested but `makeSelectLoadEquities`, `makeSelectHandEquities`, `makeSelectOtherRange` coverage unclear |
| `utils/request.js` | *(none)* | **Missing** | HTTP utility untested |

---

## Coverage Checklist — ZOMBIES

For each function or class method characterized, verify a test exists for each applicable category:

| Letter | Stands for | What to test |
|---|---|---|
| **Z** | Zero | Empty input, empty collection, zero count (e.g. no hands, empty `cards` object, empty board) |
| **O** | One | A single element — one hand, one scenario, one card on the board |
| **M** | Many | Multiple elements — several hands, a full range, multiple board cards |
| **B** | Boundary | Edges of valid ranges — exactly 2-card vs 3-card hand strings, page boundary in pagination, max board size |
| **I** | Interface | The public contract — correct return type/shape, correct exported names |
| **E** | Exceptional | Invalid or unexpected input — null, undefined, wrong length, unrecognized suit, mismatched keys |
| **S** | Simple scenarios | The obvious happy path covered first before adding complexity |

Use this as a per-task checklist: after writing the happy-path (S) test, walk through Z → O → M → B → E and add a test for each that applies.

---

## Prioritized Implementation Tasks

**Task 1 — `findInArray.js`** *(pure functions, highest ROI)*
- Characterize: `equalPairs`, `equalSuitedHands`, `equalOffsuitedHands`, `equalPairsSpecificCombos`, `findInArray`
- Test each: matching hand, non-matching hand, edge (wrong length, empty string)
- Place: `src/test/MainPage/EngineClasses/findInArray.spec.js`
- Setup: `CardHandSuitBuilder` for card fixtures

**Task 2 — `countHandCombo.js`** *(pure domain logic)*
- Characterize: `countHandCombo` (full range), `comboCounter` dispatch, `suitedComboCounter` (0/1/2 board matches), `offsuitComboCounter`, `pairComboCounter` (board removes cards)
- Place: `src/test/MainPage/EngineClasses/countHandCombo.spec.js`
- Setup: `CardHandSuitBuilder`, `RangeObject`, sample board arrays

**Task 3 — `colorCellFn.js`** *(pure, extends existing partial)*
- Characterize: empty `cards` → `["#DDD"]`, suited hand coloring, offsuited hand coloring, fallback `"#DDD"` when no match, multi-color array return for specific combos
- Place: extend `src/test/MainPage/Board/TableGridColumn.spec.js`
- Setup: `CardHandSuitBuilder`, hand-keyed `cards` objects

**Task 4 — `Scenario.js` + `Scenarios.js`** *(domain classes)*
- Scenario: all four `display*()` methods, valid inputs
- Scenarios: `filteredScenarios` (page 1, page 2, sparse data), `filteredScenariosArray` (position counts), `filteredScenariosPosition`, `displayScenarioArrayLength`
- Place: extend `src/test/MainPage/ScenarioLoader/index.spec.js`
- Setup: array of `Scenario` objects with varied positions

**Task 5 — `actions.js` (MainPage)** *(action creators — extend existing)*
- Characterize: `setHandRangeSelect` state shape, `setHandRange` replaces ranges, `initGetScenario`, `initSaveScenario`, `initGetAllScenario` return correct `type`
- Place: extend `src/test/MainPage/action.spec.js`
- Setup: `initialState` from reducer

**Task 6 — `CurrentRanges/reducer.js`** *(reducer — pure)*
- Characterize: default returns `initialState`, `SET_HAND_RANGE_SELECT` produces expected mode shape
- Place: `src/test/MainPage/CurrentRanges/reducer.spec.js`
- Setup: `initialState`, `initSetHandRangeSelect` action creator

**Task 7 — `ProgressIndicator/reducer.js`** *(extend existing partial)*
- Characterize: every action type in switch, unknown action returns state unchanged
- Place: extend `src/test/MainPage/ProgressIndicator/reducer.spec.js`
- Setup: action creator imports from `ProgressIndicator/action.js`

**Task 8 — `saga.js`** *(async layer — most setup required)*
- Characterize: `saveScenario` with token present, `saveScenario` with no token (early return), `getScenario` success/fail, `getAllScenario` success
- Place: `src/test/MainPage/saga.spec.js`
- Setup: `nock` for HTTP mocking, `redux-saga-tester` with reducer + middleware wired

**Task 9 — `App/reducer.js` + `App/selectors.js`** *(low complexity, currently zero coverage)*
- Characterize: reducer returns initial state; each selector returns correct slice
- Place: `src/test/App/reducer.spec.js`, `src/test/App/selectors.spec.js`
- Setup: minimal store state
