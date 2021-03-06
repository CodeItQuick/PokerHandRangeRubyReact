import { CardHandSuitBuilder } from "./../../../containers/MainPage/EngineClasses/CardHandSuitBuilder";
import { countHandCombo } from "./../../../containers/MainPage/EngineClasses/countHandCombo";
import RangeObject from "./../../../containers/MainPage/EngineClasses/RangeObject";
import { expect } from "chai";

describe("Board Legend", () => {
  test("The board legend counts the correct number of combinations for a sutested hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s"];
    const testHand = new CardHandSuitBuilder().build("A", "K", "s");
    const wholeRange = [new RangeObject("Flop", "CheckCall", [testHand])];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "Flop", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([3]);
  });

  test("The board legend counts the correct number of combinations for a sutested hand when the sutests match", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "9s", "3s"];
    const testHand = new CardHandSuitBuilder().build("T", "9", "s");
    const wholeRange = [new RangeObject("Turn", "Bluff", [testHand])];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "Turn", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([3]);
  });

  test("The board legend counts the correct number of combinations for a offsutest hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s", "9d", "Ks"];
    const testHand = new CardHandSuitBuilder().build("K", "A");
    const wholeRange = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([9]);
  });
  test("The board legend counts the correct number of combtestions for a paired hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s", "9d", "Ks"];
    const testHand = new CardHandSuitBuilder().build("A", "A");
    const wholeRange = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([3]);
  });
  test("The board legend counts the correct number of combinations for a specific spades combo hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["As", "Ts", "4s", "9d", "Ks"];
    const testHand = new CardHandSuitBuilder().build("As", "9s", "");
    const wholeRange = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([0]);
  });
  test("The board legend counts 1 combination for a specific hand no matching cards on board", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["As", "Ts", "4s", "9d", "Ks"];
    const testHand = new CardHandSuitBuilder().build("Ac", "9s", "");
    const wholeRange = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([1]);
  });

  test("The board legend counts 0 combinations for a specific hand wtesth matching cards on board", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["As", "Ts", "4s", "9d", "Ks"];
    const testHand = new CardHandSuitBuilder().build("4s", "9d", "");
    const wholeRange = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countHandCombo(wholeRange, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([0]);
  });
});
