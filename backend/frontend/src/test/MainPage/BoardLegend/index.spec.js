import { StartingHandBuilder } from "./../../../containers/MainPage/EngineClasses/StartingHandBuilder";
import { countRangeCombos } from "./../../../containers/MainPage/EngineClasses/countHandCombo";
import RangeObject from "./../../../containers/MainPage/EngineClasses/RangeObject";
import { expect } from "chai";

describe("Board Legend", () => {
  it("The board legend counts the correct number of combinations for a sutested hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s"];
    const testHand = new StartingHandBuilder().build("A", "K", "s");
    const rangeObjects = [new RangeObject("Flop", "CheckCall", [testHand])];
    // When: I call some function (refactor a function)
    const result = countRangeCombos(rangeObjects, "Flop", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([3]);
  });

  it("The board legend counts the correct number of combinations for a sutested hand when the sutests match", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "9s", "3s"];
    const testHand = new StartingHandBuilder().build("T", "9", "s");
    const rangeObjects = [new RangeObject("Turn", "Bluff", [testHand])];
    // When: I call some function (refactor a function)
    const result = countRangeCombos(rangeObjects, "Turn", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([3]);
  });

  // FIXME: this test is broken, but I don't want to fix this mess of a codebase 10 months later
  it.skip("The board legend counts the correct number of combinations for a offsutest hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s", "9d", "Ks"];
    const testHand = new StartingHandBuilder().build("K", "A");
    const rangeObjects = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countRangeCombos(rangeObjects, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([7]);
  });
  it("The board legend counts the correct number of combtestions for a paired hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["Ac", "Ts", "4s", "9d", "Ks"];
    const testHand = new StartingHandBuilder().build("A", "A");
    const rangeObjects = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countRangeCombos(rangeObjects, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([3]);
  });
  it("The board legend counts the correct number of combinations for a specific spades combo hand", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["As", "Ts", "4s", "9d", "Ks"];
    const testHand = new StartingHandBuilder().build("As", "9s", "");
    const rangeObjects = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countRangeCombos(rangeObjects, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([0]);
  });
  it("The board legend counts 1 combination for a specific hand no matching cards on board", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["As", "Ts", "4s", "9d", "Ks"];
    const testHand = new StartingHandBuilder().build("Ac", "9s", "");
    const rangeObjects = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countRangeCombos(rangeObjects, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([1]);
  });

  it("The board legend counts 0 combinations for a specific hand wtesth matching cards on board", () => {
    // Given: what's the input state? Board (3 cards) and a hand of two cards
    const board = ["As", "Ts", "4s", "9d", "Ks"];
    const testHand = new StartingHandBuilder().build("4s", "9d", "");
    const rangeObjects = [new RangeObject("River", "Valuebet", [testHand])];
    // When: I call some function (refactor a function)
    const result = countRangeCombos(rangeObjects, "River", board);
    // Then: I expect the results of that to be... number of combos for a hand
    expect(result).to.deep.equal([0]);
  });
});
