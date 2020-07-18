import React from "react";
import MainPage from "../../../src/containers/MainPage/Board/EquityCalculations";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import Board, { calcEquities } from "../../../src/containers/MainPage/Board";
import { calculateEquity } from "../../../src/containers/MainPage/Board/EquityCalculations";
import { ranges } from "../../../src/containers/MainPage/sampleData.js";

import { CardGroup, OddsCalculator } from "poker-odds-calculator";
import prange from "prange";
import { generateCardGrid } from "../../../src/containers/MainPage/Board/StateUpdate.js";

import { doesShareTwoCardsBetweenTwoHands } from "../../../src/containers/MainPage/Board/EquityCalculations";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

function setup(onMouseOverHandler) {
  let enzymeWrapper = (
    <Provider store={store}>
      <Board {...onMouseOverHandler} />
    </Provider>
  );

  return enzymeWrapper;
}
describe("MainPage Container", () => {
  test("board renders with a white card-button object", () => {
    const handBoolean = doesShareTwoCardsBetweenTwoHands("AcAd", "AcKh");
    expect(handBoolean).toBe(false);
  });
});
