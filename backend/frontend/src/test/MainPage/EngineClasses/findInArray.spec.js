import {
  findInArray,
  equalSuitedHands,
  equalOffsuitedHands,
  equalPairsSpecificCombos,
} from "./../../../containers/MainPage/EngineClasses/findInArray";
import { StartingHandBuilder } from "./../../../containers/MainPage/EngineClasses/StartingHandBuilder";
import { expect } from "chai";

describe("findInArray", () => {
  it("returns the matching key when cards contains a pair matching the hand", () => {
    const cards = { AA: { colorCards: "#198f35" } };
    const cardHand = new StartingHandBuilder().build("A", "A", "");

    const result = findInArray(cards, cardHand);

    expect(result).to.deep.equal(["AA"]);
  });

  it("returns an empty array when cards is empty", () => {
    const cards = {};
    const cardHand = new StartingHandBuilder().build("A", "A", "");

    const result = findInArray(cards, cardHand);

    expect(result).to.deep.equal([]);
  });

  it("returns an empty array when the single card in cards does not match the hand", () => {
    const cards = { KK: { colorCards: "#198f35" } };
    const cardHand = new StartingHandBuilder().build("A", "A", "");

    const result = findInArray(cards, cardHand);

    expect(result).to.deep.equal([]);
  });
});
