import { initialState } from "./../../containers/MainPage/reducer.js";

import {
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
  makeSelectRangesPreflop,
  makeSelectRange,
  makeSelectMode,
  makeSelectDeadcards,
  makeSelectPosition,
  makeSelectLoadEquities,
  makeSelectOtherRange,
  makeSelectHandEquities,
} from "./../../containers/MainPage/selectors.js";
import RangeObject from "./../../containers/MainPage/EngineClasses/RangeObject";
import { expect } from "chai";

// describe('MainPage Login Selectors', () => {
test("mode should return the current mode ", () => {
  const mockParameters = {
    global: {
      ...initialState,
      mode: {
        street: "Preflop",
        streetAction: "Raise4BetFold",
        isIP: true,
        streetSelection: [],
      },
    },
  };

  const getMakeSelectMode = (state) => makeSelectMode(state);

  const results = {
    street: "Preflop",
    streetAction: "Raise4BetFold",
    isIP: true,
    streetSelection: [],
  };

  expect(getMakeSelectMode()(mockParameters)).to.deep.equal(results);
});

test("select range repo should return in position ", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectRangeRepoIP = (state) => makeSelectRangeRepoIP(state);

  const initialRangeRepoIP = initialState.rangeRepoIP.map(
    (rangeObjects) =>
      new RangeObject(rangeObjects.Street, rangeObjects.BetType, [])
  );

  const results = [...initialRangeRepoIP];

  expect(getMakeSelectRangeRepoIP()(mockParameters)).to.deep.equal(results);
});

test("range repo OOP should return the empty ranges ", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectRangeRepoOOP = (state) => makeSelectRangeRepoOOP(state);

  const initialRangeRepoOOP = initialState.rangeRepoOOP.map(
    (rangeObjects) =>
      new RangeObject(rangeObjects.Street, rangeObjects.BetType, [])
  );

  const results = [...initialRangeRepoOOP];

  expect(getMakeSelectRangeRepoOOP()(mockParameters)).to.deep.equal(results);
});

test("select preflop ranges should return just the preflop ranges ", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectRangesPreflop = (state) => makeSelectRangesPreflop(state);

  const initialRangePreflop = initialState.ranges
    .filter(({ Street }) => Street == "Preflop")
    .map(
      (rangeObjects) =>
        new RangeObject(rangeObjects.Street, rangeObjects.BetType, [])
    );

  const results = [...initialRangePreflop];

  expect(getMakeSelectRangesPreflop()(mockParameters)).to.deep.equal(results);
});

test("make select range should return an empty range", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectRange = (state) => makeSelectRange(state);

  const initialSelectRange = initialState.ranges.map(
    (rangeObjects) =>
      new RangeObject(rangeObjects.Street, rangeObjects.BetType, [])
  );

  const results = [...initialSelectRange];

  expect(getMakeSelectRange()(mockParameters)).to.deep.equal(results);
});

test("deadcards should return an empty array when empty ", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectDeadcards = (state) => makeSelectDeadcards(state);

  const results = [];

  expect(getMakeSelectDeadcards()(mockParameters)).to.deep.equal(results);
});

test("select position should return true as default ", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectPosition = (state) => makeSelectPosition(state);

  const results = true;

  expect(getMakeSelectPosition()(mockParameters)).to.deep.equal(results);
});

test("selectLoadEquities should return false for default value ", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectLoadEquities = (state) => makeSelectLoadEquities(state);

  const results = false;

  expect(getMakeSelectLoadEquities()(mockParameters)).to.deep.equal(results);
});

test("selectOtherRange should return a full range ", () => {
  const mockParameters = {
    global: initialState,
  };

  const getMakeSelectOtherRange = (state) => makeSelectOtherRange(state);

  const initialRangePreflopOnly = initialState.ranges.map(
    ({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
  );

  expect(getMakeSelectOtherRange()(mockParameters)).to.deep.equal(
    initialRangePreflopOnly
  );
});

test("selectHandEquities should return two empty strings in an array as default.", () => {
  const mockParameters = {
    global: {
      ...initialState,
    },
  };

  const getMakeSelectHandEquities = (state) => makeSelectHandEquities(state);

  const results = [{}, {}];

  expect(getMakeSelectHandEquities()(mockParameters)).to.deep.equal(results);
});
// });
