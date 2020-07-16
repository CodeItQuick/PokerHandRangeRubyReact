import React from "react";
import MainPage from "../../../src/containers/MainPage/index.js";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import { generateCardGrid } from "../../../src/containers/MainPage/Board/StateUpdate";
import { calculateEquity } from "../../../src/containers/MainPage/Board/EquityCalculations";
import { ranges } from "../../../src/containers/MainPage/sampleData.js";

describe("State Update Functions", () => {
  test(" generate CardBoard when given returns a card clone", () => {

  });
});
