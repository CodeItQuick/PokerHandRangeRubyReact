import React from "react";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";

import RangeObject from "../../../src/containers/MainPage/RangeObject";
import CardHandSuit from "../../../src/containers/MainPage/Board/CardHandSuit";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

describe("RangeObject Class", () => {
  test("can be constructed with a street, streetAction, and array of hands", () => {
    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", []);

    expect(rangeObject).toBeDefined();
  });

  test("can be transformed into a data value object to be stored", () => {
    const AKsuited = new CardHandSuit("A", "K", "s");
    const AA = new CardHandSuit("A", "A");
    const AKoffsuit = new CardHandSuit("A", "K", "o");
    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AKsuited,
      AA,
      AKoffsuit,
    ]);

    expect(rangeObject.getRangesObject()).toStrictEqual({
      Street: "Preflop",
      BetType: "Raise4BetCall",
      hands: ["AKs", "AA", "AKo"],
    });
  });
  test("can be transformed into a data value object to be stored", () => {
    const AKsuited = new CardHandSuit("A", "K", "s");
    const AA = new CardHandSuit("A", "A");
    const AKoffsuit = new CardHandSuit("A", "K", "o");
    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AKsuited,
      AA,
      AKoffsuit,
    ]);

    expect(rangeObject.displayInfo()).toStrictEqual({
      AA: {
        colorCards: "#8bddbe",
        equity: "n/a",
      },
      AKo: {
        colorCards: "#8bddbe",
        equity: "n/a",
      },
      AKs: {
        colorCards: "#8bddbe",
        equity: "n/a",
      },
    });
  });
  test("can be transformed into a data value object to be stored", () => {
    const AKsuited = new CardHandSuit("A", "K", "s");
    const AA = new CardHandSuit("A", "A");
    const AKoffsuit = new CardHandSuit("A", "K", "o");
    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AKsuited,
      AA,
      AKoffsuit,
    ]);

    expect(rangeObject.toCardHandRange()).toStrictEqual([
      AKsuited,
      AA,
      AKoffsuit,
    ]);
  });

  test("can be transformed into a data value object to be stored", () => {
    const AKsuited = new CardHandSuit("A", "K", "s");
    const AA = new CardHandSuit("A", "A");
    const AKoffsuit = new CardHandSuit("A", "K", "o");
    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AKsuited,
      AA,
      AKoffsuit,
    ]);

    expect(rangeObject.filterForHandsInRange("Preflop")).toStrictEqual([
      AKsuited,
      AA,
      AKoffsuit,
    ]);
  });
});
