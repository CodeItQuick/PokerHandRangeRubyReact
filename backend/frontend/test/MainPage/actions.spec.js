import React from "react";
import { ranges } from "../../src/containers/MainPage/sampleData";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import reducer, { initialState } from "../../src/containers/MainPage/reducer";
import * as types from "../../src/containers/MainPage/constants";
import * as actions from "../../src/containers/MainPage/actions";

describe("actions", () => {
  test("should create an action to set a hand range selectors ", () => {
    const data = { street: "Flop", streetAction: "Bluff" };

    const expectedAction = { type: types.SET_HAND_RANGE_SELECT, data };

    expect(actions.setHandRangeSelect(data)).toEqual(expectedAction);
  });

  test("should create an action to set a hand range ", () => {
    const data = { ranges };

    const expectedAction = { type: types.SET_HAND_RANGE, data };

    expect(actions.setHandRange(data)).toEqual(expectedAction);
  });

  test("should create an action to init a hand range ", () => {
    const expectedAction = {
      type: types.INIT_ALL_USER_HAND_RANGES,
    };

    expect(actions.initAllUserHandRanges()).toEqual(expectedAction);
  });

  test("should create an action to set deadcards ", () => {
    const data = ["Ac", "Td", "4h"];
    const expectedAction = {
      type: types.SET_DEAD_CARDS,
      data,
    };

    expect(actions.setDeadCards(data)).toEqual(expectedAction);
  });

  test("should create an action to set isIP ", () => {
    const data = false;
    const expectedAction = {
      type: types.SET_IS_IP,
      data,
    };

    expect(actions.setIsIP(data)).toEqual(expectedAction);
  });

  test("should create an action to set isIP ", () => {
    const data = false;
    const expectedAction = {
      type: types.SET_IS_IP,
      data,
    };

    expect(actions.setIsIP(data)).toEqual(expectedAction);
  });

  test("should create an action to load equities ", () => {
    const expectedAction = {
      type: types.LOAD_EQUITIES,
    };

    expect(actions.loadEquities()).toEqual(expectedAction);
  });
});
