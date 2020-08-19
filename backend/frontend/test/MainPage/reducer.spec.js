import React from "react";
import MainPage from "../../src/containers/MainPage";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import reducer, { initialState } from "../../src/containers/MainPage/reducer";
import * as types from "../../src/containers/MainPage/constants";

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
          suitSelection: [],
          useTwoFlopSizes: false,
        },
      };

      expect(reducer(undefined, action)).toEqual(newState);
    }
  );

  test("The reducer when action SET_IS_IP should return the new position, and rearrange the ranges appropriately", () => {
    //Given
    let newRangeIP = JSON.parse(JSON.stringify(initialState.rangeRepoIP));
    let newRangeIPPreflopRaise4BetCall = newRangeIP[0];
    newRangeIP[0] = { ...newRangeIPPreflopRaise4BetCall, hands: ["AA"] };

    let newRangeOOP = JSON.parse(JSON.stringify(initialState.rangeRepoOOP));
    let newRangeOOPPreflopRaise4BetCall = newRangeOOP[0];
    newRangeOOP[0] = { ...newRangeOOPPreflopRaise4BetCall, hands: ["KK"] };

    //When
    const action = {
      type: types.SET_IS_IP,
      data: {
        position: true,
        newRanges: newRangeIP,
        newRangeIP,
        newRangeOOP,
      },
    };

    //Then
    let newState = JSON.parse(JSON.stringify(initialState));

    newState = {
      ...initialState,
      mode: {
        street: initialState.mode.street,
        streetAction: initialState.mode.streetAction,
        isIP: true,
        suitSelection: [],
        useTwoFlopSizes: false,
      },
      ranges: newRangeIP,
      rangeRepoIP: newRangeIP,
      rangeRepoOOP: newRangeOOP,
    };

    expect(reducer(undefined, action)).toEqual(newState);
  });

  test("The reducer when action SET_HAND_RANGE should return the new state for hand range", () => {
    //Given
    let ranges = JSON.parse(JSON.stringify(initialState.ranges));
    ranges[0] = { ...ranges, hands: ["AA"] };

    //When
    const action = {
      type: types.SET_HAND_RANGE,
      data: [...ranges],
    };

    //Then
    let newState = JSON.parse(JSON.stringify(initialState));

    newState = {
      ...initialState,
      ranges,
    };

    expect(reducer(undefined, action)).toEqual(newState);
  });

  test("The reducer when action SET_DEADCARDS should return the new state for deadcards", () => {
    //Given
    const deadcards = ["Ac", "Td", "5h"];

    //When
    const action = {
      type: types.SET_DEAD_CARDS,
      data: deadcards,
    };

    //Then
    let newState = JSON.parse(JSON.stringify(initialState));

    newState = {
      ...initialState,
      deadcards,
      mode: {
        street: "Flop",
        streetAction: "Valuebet",
        isIP: true,
        suitSelection: [],
        useTwoFlopSizes: false,
      },
    };

    expect(reducer(undefined, action)).toEqual(newState);
  });
});
