import { StartingHandBuilder } from "./../../../containers/MainPage/EngineClasses/StartingHandBuilder";
import { expect } from "chai";

describe("CardHandSuitBuilder can ", () => {
  it("can return tests own value", () => {
    const newCardHand = new StartingHandBuilder().build("A", "A", "");
    expect(newCardHand.getHand()).to.equal("AA");
    expect(newCardHand.getHandArray()).to.deep.equal(["A", "A", ""]);
  });
  it("can return tests own value", () => {
    const newCardHand = new StartingHandBuilder().build("A", "K", "o");
    expect(newCardHand.getHand()).to.equal("AKo");
    expect(newCardHand.getHandArray()).to.deep.equal(["A", "K", "o"]);
  });
  it("can return tests own value", () => {
    const newCardHand = new StartingHandBuilder().build("K", "Q", "s");
    expect(newCardHand.getHand()).to.equal("KQs");
    expect(newCardHand.getHandArray()).to.deep.equal(["K", "Q", "s"]);
  });
});
