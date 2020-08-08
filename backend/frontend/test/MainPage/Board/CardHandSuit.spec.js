import React from "react";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";

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

  test("can be constructed with two cards (reverse order), and a suit entered returns a CardHandSuit Object in normalized order", () => {
    const cardOne = "K";
    const cardTwo = "A";
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
