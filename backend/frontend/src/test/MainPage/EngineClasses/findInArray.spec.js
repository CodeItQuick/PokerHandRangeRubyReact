import {
  findInArray,
  equalSuitedHands,
  equalOffsuitedHands,
  equalPairsSpecificCombos,
} from "./../../../containers/MainPage/EngineClasses/findInArray";
import { CardHandSuitBuilder } from "./../../../containers/MainPage/EngineClasses/CardHandSuitBuilder";
import { expect } from "chai";

describe("findInArray", () => {
  it("returns the matching key when cards contains a pair matching the hand", () => {
    const cards = { AA: { colorCards: "#198f35" } };
    const cardHand = new CardHandSuitBuilder().build("A", "A", "");

    const result = findInArray(cards, cardHand);

    expect(result).to.deep.equal(["AA"]);
  });
});
