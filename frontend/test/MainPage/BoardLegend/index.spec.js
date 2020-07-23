import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CardHandSuit from "../../../src/containers/MainPage/Board/CardHandSuit";
import { countHandCombo } from "../../../src/containers/MainPage/BoardLegend/BoardLegend.js";

Enzyme.configure({ adapter: new Adapter() });

//TODO: Should this be a JSON object? Unsure
describe("Board Legend", () => {
  test("The board legend counts the correct number of combinations for a suited hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s"];
    const testHand = new CardHandSuit("A", "K", "s");
    const hand = [testHand];
    const wholeRange = [{ Street: "Flop", hands: hand }];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "Flop", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).toStrictEqual([3]);
  });

  test("The board legend counts the correct number of combinations for a suited hand when the suits match", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "9s"];
    const testHand = new CardHandSuit("T", "9");
    const hand = [testHand];
    const wholeRange = [{ Street: "Flop", hands: hand }];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "Flop", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).toStrictEqual([3]);
  });

  test("The board legend counts the correct number of combinations for a offsuit hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s", "9d", "Ks"];
    const testHand = new CardHandSuit("K", "A");
    const hand = [testHand];
    const wholeRange = [{ Street: "River", hands: hand }];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).toStrictEqual([8]);
  });
  test("The board legend counts the correct number of combitions for a paired hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s", "9d", "Ks"];
    const testHand = new CardHandSuit("A", "A");
    const hand = [testHand];
    const wholeRange = [{ Street: "River", hands: hand }];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).toStrictEqual([3]);
  });
});
