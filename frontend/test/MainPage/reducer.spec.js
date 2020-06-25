import React from "react";
import MainPage from "../../src/containers/MainPage/";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import reducer, { initialState } from "../../src/containers/MainPage/reducer";
import * as types from "../../src/containers/MainPage/constants";

const defaultReducerState = initialState;

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
    expect(reducer(undefined, {})).toEqual(defaultReducerState);
  });

  test.each(data)(
    "The reducer with action " +
      types.SET_HAND_RANGE_SELECT +
      " should return the new mode",
    (data) => {
      const action = { type: types.SET_HAND_RANGE_SELECT, data };

      let newState = JSON.parse(JSON.stringify(defaultReducerState));
      newState = {
        ...defaultReducerState,
        mode: {
          street: data.name,
          streetAction: data.value,
        },
      };

      expect(reducer(undefined, action)).toEqual(newState);
    }
  );
});
