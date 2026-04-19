# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (http://localhost:3000)
npm start

# Production build
npm run build

# Run all tests
npm test

# Run a single test file
npm test -- src/test/MainPage/action.spec.js
```

The dev server proxies API requests to `http://www.poker-range-appalyzer.com`.

## Architecture

React SPA for analyzing poker hand ranges and betting patterns. Built with Create React App via **craco** (which overrides webpack to support Semantic UI Less compilation without ejecting).

### State Management

Redux with two middleware layers:
- **Redux Saga** — primary async side-effects handler
- **Redux Thunk** — fallback for simpler async cases
- **Connected React Router** — syncs routing state into Redux store
- Reducers and sagas are injected dynamically at runtime (see `src/HOC/useInjectReducer/` and `src/HOC/injectSaga/`)
- State is persisted to localStorage (`src/localStorage.js`)

### Key Source Directories

- `src/containers/` — Redux-connected page-level components
  - `App/` — root component, Auth0 setup, Reactour (tutorial) initialization
  - `MainPage/` — core poker range analyzer; subdivided into Board, BoardLegend, CurrentRanges, EngineClasses, InputForm, ScenarioLoader, SuitSelector
  - `Range/` — range management logic
- `src/components/` — presentational (dumb) components: NavBar, MainContainer
- `src/HOC/` — higher-order components and hooks for dynamic reducer/saga injection
- `src/utils/` — ErrorBoundary, browser history instance, HTTP request helpers
- `src/test/` — Mocha test files mirroring `src/` structure (`*.spec.js`)
- `src/configureStore.js` — Redux store setup (DevTools, saga middleware, reducer registry)
- `src/reducers.js` — root reducer combiner

### Testing

Primary test runner is **Mocha** (BDD syntax) with **Chai** assertions and **Enzyme** for component rendering. Jest is installed but not the primary runner.

- Tests live in `src/test/MainPage/**/*.spec.js`
- Babel transpilation via `@babel/register` at test time
- HTTP mocking with **nock**; saga testing with **redux-saga-tester**
- Coverage via **nyc** (output in `coverage/`)

### UI Libraries

- **Semantic UI React** — primary component library (Less source compiled via craco)
- **Bootstrap 4** — grid/utilities
- **styled-components** — component-scoped CSS where Semantic UI doesn't fit

### Notable Integrations

- **Auth0** (`@auth0/auth0-react`) — authentication; currently commented out in `src/index.js`
- **poker-odds-calculator** + **prange** — poker domain logic for hand range calculations
- Pre-commit hook runs **Prettier** on staged files (Husky + lint-staged)
