import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";

import { CardHandSuitClosure } from "../../../src/containers/MainPage/Board/CardHandSuit";

describe("CardHandSuit Class", () => {
  test("can be constructed with two cards, and no suit entered", () => {
    const cardOne = "A";
    const cardTwo = "K";

    const cardSuitHand = CardHandSuitClosure(cardOne, cardTwo);

    const result = cardSuitHand.getHand();

    expect(result).toEqual("AKs");
  });

  test("can be constructed with two cards, and a suit entered", () => {
    const cardOne = "A";
    const cardTwo = "K";
    const suit = "s";

    const cardSuitHand = CardHandSuitClosure(cardOne, cardTwo, suit);

    const result = cardSuitHand.getHand();

    expect(result).toEqual("AKs");
  });

  test("can be constructed with two cards (reverse order), and a suit entered returns a CardHandSuit Object in normalized order", () => {
    const cardOne = "K";
    const cardTwo = "A";
    const suit = "o";

    const cardSuitHand = CardHandSuitClosure(cardOne, cardTwo, suit);

    const result = cardSuitHand.getHand();

    expect(result).toEqual("AKo");
  });
});
