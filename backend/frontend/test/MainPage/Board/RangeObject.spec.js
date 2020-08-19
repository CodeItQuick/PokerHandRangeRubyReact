import React from "react";
import Adapter from "enzyme-adapter-react-16";

import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";

import RangeObject from "../../../src/containers/MainPage/RangeObject";
import { CardHandSuitClosure } from "../../../src/containers/MainPage/Board/CardHandSuit";

describe("RangeObject Class", () => {
  test("can be constructed with a street, streetAction, and array of hands", () => {
    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", []);

    expect(rangeObject).toBeDefined();
  });

  test("can be transformed into a data value object to be stored", () => {
    const AKsuited = CardHandSuitClosure("A", "K", "s");
    const AA = CardHandSuitClosure("A", "A");
    const AKoffsuit = CardHandSuitClosure("A", "K", "o");
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
    const AKsuited = CardHandSuitClosure("A", "K", "s");
    const AA = CardHandSuitClosure("A", "A");
    const AKoffsuit = CardHandSuitClosure("A", "K", "o");
    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AKsuited,
      AA,
      AKoffsuit,
    ]);

    expect(rangeObject.displayInfo()).toStrictEqual({
      AA: {
        colorCards: "#0F6125",
        equity: "n/a",
      },
      AKo: {
        colorCards: "#0F6125",
        equity: "n/a",
      },
      AKs: {
        colorCards: "#0F6125",
        equity: "n/a",
      },
    });
  });
  test("can be transformed into a data value object to be stored", () => {
    const AKsuited = CardHandSuitClosure("A", "K", "s");
    const AA = CardHandSuitClosure("A", "A");
    const AKoffsuit = CardHandSuitClosure("A", "K", "o");
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
    const AKsuited = CardHandSuitClosure("A", "K", "s");
    const AA = CardHandSuitClosure("A", "A");
    const AKoffsuit = CardHandSuitClosure("A", "K", "o");
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

  test("displayFriendlyRangeSuit displays a valid range for AA, AKs, AQo", () => {
    const AAhand = CardHandSuitClosure("A", "A");
    const AKohand = CardHandSuitClosure("Q", "A");
    const AKshand = CardHandSuitClosure("A", "K");

    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AAhand,
      AKohand,
      AKshand,
    ]);

    expect(rangeObject.getFriendlyRangeOutput()).toEqual("AA, AQo, AKs");
  });

  test("displayFriendlyRangeSuit displays a condensed valid range for AA, AKs, AKo", () => {
    const AAhand = CardHandSuitClosure("A", "A");
    const AKohand = CardHandSuitClosure("K", "A");
    const AKshand = CardHandSuitClosure("A", "K");

    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AAhand,
      AKohand,
      AKshand,
    ]);

    expect(rangeObject.getFriendlyRangeOutput()).toEqual("AA, AK");
  });

  test("displayFriendlyRangeSuit displays a condensed valid range for AA, As9s, Tc8d", () => {
    const AAhand = CardHandSuitClosure("A", "A");
    const A9sshand = CardHandSuitClosure("A", "9", "ss");
    const AKshand = CardHandSuitClosure("A", "K");

    const rangeObject = new RangeObject("Preflop", "Raise4BetCall", [
      AAhand,
      A9sshand,
      AKshand,
    ]);

    expect(rangeObject.getFriendlyRangeOutput()).toEqual("AA, AKs, As9s");
  });
});
