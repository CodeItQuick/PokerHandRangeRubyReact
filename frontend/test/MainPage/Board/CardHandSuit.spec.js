import React from "react";
import MainPage from "../../../src/containers/MainPage/index.js";
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
import CardHandSuit from "../../../src/containers/MainPage/Board/CardHandSuit";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

describe("CardHandSuit Class", () => {
  test("can be constructed with two cards, and no suit entered", () => {
    const cardOne = "A";
    const cardTwo = "K";

    const cardSuitHand = new CardHandSuit(cardOne, cardTwo);

    expect(cardSuitHand).toEqual({
      cardOne: "A",
      cardTwo: "K",
      equity: "n/a",
      suit: "s",
    });
  });

  test("can be constructed with two cards, and a suit entered", () => {
    const cardOne = "A";
    const cardTwo = "K";
    const suit = "o";

    const cardSuitHand = new CardHandSuit(cardOne, cardTwo, suit);

    expect(cardSuitHand).toEqual({
      cardOne: "A",
      cardTwo: "K",
      equity: "n/a",
      suit: "o",
    });
  });
});
