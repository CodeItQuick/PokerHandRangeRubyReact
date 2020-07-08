import React from "react";
import MainPage from "../../src/pages/MainPage";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import reducer, { initialState } from "../../src/pages/MainPage/reducer";
import * as types from "../../src/pages/MainPage/constants";

const data = [
  { name: "Preflop", value: "Raise4BetFold" },
  { name: "Preflop", value: "RaiseCall" },
  { name: "Preflop", value: "RaiseFold" },
  { name: "Flop", value: "Valuebet" },
  { name: "Flop", value: "Bluff" },
  { name: "Flop", value: "CheckCall" },
  { name: "Flop", value: "CheckFold" },
  { name: "Turn", value: "Valuebet" },
  { name: "Turn", value: "Bluff" },
  { name: "Turn", value: "CheckCall" },
  { name: "Turn", value: "CheckFold" },
  { name: "River", value: "Valuebet" },
  { name: "River", value: "Bluff" },
  { name: "River", value: "CheckCall" },
  { name: "River", value: "CheckFold" },
];

describe("MainPage reducer", () => {
  test("should return the initial state", function() {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test.each(data)(
    "The reducer with action " +
      types.SET_HAND_RANGE_SELECT +
      " should return the new mode",
    (data) => {
      const action = { type: types.SET_HAND_RANGE_SELECT, data };

      let newState = JSON.parse(JSON.stringify(initialState));
      newState = {
        ...initialState,
        mode: {
          street: data.name,
          streetAction: data.value,
          isIP: initialState.mode.isIP,
        },
      };

      expect(reducer(undefined, action)).toEqual(newState);
    }
  );

  test("The reducer when action SET_IS_IP should return the new position, and the new range", () => {
    const action = {
      type: types.SET_IS_IP,
      data: {
        rangeRepoIP: initialState.ranges,
        rangeRepoOOP: initialState.rangeRepoOOP,
      },
    };

    let newState = JSON.parse(JSON.stringify(initialState));

    console.log(newState); //?

    newState = {
      ...initialState,
      mode: {
        street: initialState.mode.street,
        streetAction: initialState.mode.streetAction,
        isIP: !initialState.mode.isIP,
      },
      rangeRepoIP: initialState.ranges,
      rangeRepoOOP: initialState.rangeRepoOOP,
    };

    console.log(newState); //?

    expect(reducer(undefined, action)).toEqual(newState);
  });
});
