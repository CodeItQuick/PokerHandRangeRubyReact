import React from "react";
import MainPage from "../../../src/containers/MainPage/index.js";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import Board from "../../../src/containers/MainPage/Board";
import { calculateEquity } from "../../../src/containers/MainPage/Board/EquityCalculations";
import { ranges } from "../../../src/containers/MainPage/sampleData.js";

import { CardGroup, OddsCalculator } from "poker-odds-calculator";
import prange from "prange";

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
    const enzymeWrapper = shallow(setup(jest.fn()));
    expect(enzymeWrapper.length).toBe(1);
  });

  test("board fires onClick handler as clicked", () => {
    const enzymeWrapper = mount(setup(jest.fn()));
    expect(enzymeWrapper.length).toBe(1);
  });

  test("board renders with a grey card-button object when rendered", () => {
    const enzymeWrapper = mount(setup(jest.fn()));
    const colorcardAA = enzymeWrapper.find("#colorButtonAA").get(0).props
      .coloring;
    expect(colorcardAA).toBe("#AAA");
  });

  test("Board correctly calculates equity for hand against other hand that are both pairs", () => {
    const rangeOne = prange("JJ").join();
    const rangeTwo = prange("AA");
    const board = "Td9d5c";

    expect(calculateEquity(rangeOne, board, rangeTwo).toFixed(2)).toBe("0.14");
  });

  test("Board correctly calculates equity for hand against other hand that contains offsuit hands", () => {
    const rangeOne = prange("JJ").join();
    const rangeTwo = prange("AKo");
    const board = "Td9d5c";

    expect(calculateEquity(rangeOne, board, rangeTwo).toFixed(2)).toBe("0.75");
  });

  test("Board correctly calculates equity for hand against other hand that contains suited hands", () => {
    const rangeOne = prange("JJ").join();
    const rangeTwo = prange("AKs");
    const board = "Td9d5c";

    expect(calculateEquity(rangeOne, board, rangeTwo).toFixed(2)).toBe("0.69");
  });

  test("Board correctly calculates equity for hand against other multiple hands that contains pairs", () => {
    const rangeOne = prange("JJ").join();
    const rangeTwo = prange("KK, AA");
    const board = "Td9d5c";

    expect(calculateEquity(rangeOne, board, rangeTwo).toFixed(2)).toBe("0.14");
  });

  test("Board correctly calculates equity for hand against other multiple hands that contains all possible inputs", () => {
    const rangeOne = prange("JJ").join();
    const rangeTwo = prange("KK, AKs, AKo");
    const board = "Td9d5c";

    expect(calculateEquity(rangeOne, board, rangeTwo).toFixed(2)).toBe("0.75");
  });

  test("Board does not calculate equity for two overlapping hands", () => {
    const rangeOne = prange("JJ").join();
    const rangeTwo = prange("AJo");
    const board = "Td9d5c";

    expect(calculateEquity(rangeOne, board, rangeTwo).toFixed(2)).toBe("0.79");
  });

  test("Board does not calculate equity for two non-existant board and hand combinations", () => {
    const rangeOne = prange("JJ").join();
    const rangeTwo = prange("ATo");
    const board = "Td9d5c";

    expect(calculateEquity(rangeOne, board, rangeTwo).toFixed(2)).toBe("0.79");
  });
});
