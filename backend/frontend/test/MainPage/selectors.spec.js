import React from "react";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { initialState } from "../../src/containers/MainPage/reducer.js";

import {
  selectGlobal,
  selectUser,
  makeSelectRanges,
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
  makeSelectRangesPreflop,
  makeSelectRangesPreflopOnly,
  makeSelectRange,
  makeSelectMode,
  makeSelectUser,
  makeSelectDeadcards,
  makeSelectPosition,
  makeSelectLoadEquities,
  makeSelectOtherRange,
  makeSelectHandEquities,
} from "../../src/containers/MainPage/selectors.js";
import RangeObject from "../../src/containers/MainPage/RangeObject.js";

describe("MainPage Login Selectors", () => {
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

    expect(getMakeSelectMode()(mockParameters)).toEqual(results);
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

    expect(getMakeSelectRangeRepoIP()(mockParameters)).toEqual(results);
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

    expect(getMakeSelectRangeRepoOOP()(mockParameters)).toEqual(results);
  });

  test("select preflop ranges should return just the preflop ranges ", () => {
    const mockParameters = {
      global: {
        ...initialState,
      },
    };

    const getMakeSelectRangesPreflop = (state) =>
      makeSelectRangesPreflop(state);

    const initialRangePreflop = initialState.ranges
      .filter(({ Street }) => Street == "Preflop")
      .map(
        (rangeObjects) =>
          new RangeObject(rangeObjects.Street, rangeObjects.BetType, [])
      );

    const results = [...initialRangePreflop];

    expect(getMakeSelectRangesPreflop()(mockParameters)).toEqual(results);
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

    expect(getMakeSelectRange()(mockParameters)).toEqual(results);
  });

  test("deadcards should return an empty array when empty ", () => {
    const mockParameters = {
      global: {
        ...initialState,
      },
    };

    const getMakeSelectDeadcards = (state) => makeSelectDeadcards(state);

    const results = [];

    expect(getMakeSelectDeadcards()(mockParameters)).toEqual(results);
  });

  test("select position should return true as default ", () => {
    const mockParameters = {
      global: {
        ...initialState,
      },
    };

    const getMakeSelectPosition = (state) => makeSelectPosition(state);

    const results = true;

    expect(getMakeSelectPosition()(mockParameters)).toEqual(results);
  });

  test("selectLoadEquities should return false for default value ", () => {
    const mockParameters = {
      global: {
        ...initialState,
      },
    };

    const getMakeSelectLoadEquities = (state) => makeSelectLoadEquities(state);

    const results = false;

    expect(getMakeSelectLoadEquities()(mockParameters)).toEqual(results);
  });

  test("selectOtherRange should return a full range ", () => {
    const mockParameters = {
      global: initialState,
    };

    const getMakeSelectOtherRange = (state) => makeSelectOtherRange(state);

    const initialRangePreflopOnly = initialState.ranges.map(
      ({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
    );

    expect(getMakeSelectOtherRange()(mockParameters)).toEqual(
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

    expect(getMakeSelectHandEquities()(mockParameters)).toEqual(results);
  });
});
