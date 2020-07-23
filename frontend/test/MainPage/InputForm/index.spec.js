import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import InputStreet, {
  assignPositions,
} from "../../../src/containers/MainPage/InputForm/";

describe("InputStreet Container", () => {
  test("The assignPositions function returns the correct values for the flop", () => {});
  const rangeRepoIP = JSON.parse(
    JSON.stringify(initialState.rangeRepoIP)
  ).filter(({ Street }) => Street == "Flop");
  const rangeRepoOOP = JSON.parse(
    JSON.stringify(initialState.rangeRepoOOP)
  ).filter(({ Street }) => Street == "Flop");
  let selectedRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
    ({ Street }) => Street == "Flop"
  );
  const values = true;

  let [newRangeIP, newRangeOOP, newRanges] = assignPositions(
    rangeRepoIP,
    rangeRepoOOP,
    selectedRanges,
    values
  );

  expect(newRangeIP).toEqual(rangeRepoIP);
  expect(newRangeOOP).toEqual(selectedRanges);
  expect(newRanges).toEqual(rangeRepoIP);
});
