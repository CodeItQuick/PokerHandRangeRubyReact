import {
  findMatchingHandKeys,
  isSuitedHandMatch,
  isOffsuitHandMatch,
  isPairComboMatch,
} from "./../../../containers/MainPage/EngineClasses/findMatchingHandKeys";
import { StartingHandBuilder } from "./../../../containers/MainPage/EngineClasses/StartingHandBuilder";
import { expect } from "chai";

describe("findInArray", () => {
  it("returns the matching key when cards contains a pair matching the hand", () => {
    const cards = { AA: { colorCards: "#198f35" } };
    const startingHand = new StartingHandBuilder().build("A", "A", "");

    const result = findMatchingHandKeys(cards, startingHand);

    expect(result).to.deep.equal(["AA"]);
  });

  it("returns an empty array when cards is empty", () => {
    const cards = {};
    const startingHand = new StartingHandBuilder().build("A", "A", "");

    const result = findMatchingHandKeys(cards, startingHand);

    expect(result).to.deep.equal([]);
  });

  it("returns an empty array when the single card in cards does not match the hand", () => {
    const cards = { KK: { colorCards: "#198f35" } };
    const startingHand = new StartingHandBuilder().build("A", "A", "");

    const result = findMatchingHandKeys(cards, startingHand);

    expect(result).to.deep.equal([]);
  });
});
