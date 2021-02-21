import { CardHandSuitBuilder } from "./../../../containers/MainPage/EngineClasses/CardHandSuitBuilder";
import { expect } from "chai";

describe("CardHandSuitBuilder can ", () => {
  test("can return tests own value", () => {
    const newCardHand = new CardHandSuitBuilder().build("A", "A", "");
    expect(newCardHand.getHand()).to.equal("AA");
    expect(newCardHand.getHandArray()).to.deep.equal(["A", "A", ""]);
  });
  test("can return tests own value", () => {
    const newCardHand = new CardHandSuitBuilder().build("A", "K", "o");
    expect(newCardHand.getHand()).to.equal("AKo");
    expect(newCardHand.getHandArray()).to.deep.equal(["A", "K", "o"]);
  });
  test("can return tests own value", () => {
    const newCardHand = new CardHandSuitBuilder().build("K", "Q", "s");
    expect(newCardHand.getHand()).to.equal("KQs");
    expect(newCardHand.getHandArray()).to.deep.equal(["K", "Q", "s"]);
  });
});
