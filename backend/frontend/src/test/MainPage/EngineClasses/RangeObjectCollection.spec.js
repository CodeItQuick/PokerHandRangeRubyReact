import { initialState } from "./../../../containers/MainPage/reducer";
import { HandRangeCollection } from "./../../../containers/MainPage/EngineClasses/HandRangeCollection";
import { expect } from "chai";

const data = [
  { Street: "Preflop", BetType: "Raise4BetCall", hands: [] },
  { Street: "Preflop", BetType: "Raise4BetFold", hands: [] },
  { Street: "Preflop", BetType: "RaiseCall", hands: [] },
  { Street: "Preflop", BetType: "RaiseFold", hands: [] },
  { Street: "Flop", BetType: "Valuebet", hands: [] },
  { Street: "Flop", BetType: "Bluff", hands: [] },
  { Street: "Flop", BetType: "CheckCall", hands: [] },
  { Street: "Flop", BetType: "CheckFold", hands: [] },
  { Street: "Turn", BetType: "Valuebet", hands: [] },
  { Street: "Turn", BetType: "Bluff", hands: [] },
  { Street: "Turn", BetType: "CheckCall", hands: [] },
  { Street: "Turn", BetType: "CheckFold", hands: [] },
  { Street: "River", BetType: "Valuebet", hands: [] },
  { Street: "River", BetType: "Bluff", hands: [] },
  { Street: "River", BetType: "CheckCall", hands: [] },
  { Street: "River", BetType: "CheckFold", hands: [] },
];

describe("A RangeObject Collection ", () => {
  it("given no constructor can display 16 RangeObjects", () => {
    const rangeObjectCollection = new HandRangeCollection();
    const result = initialState.ranges.map(({ Street, BetType, hands }) => ({
      street: Street,
      streetAction: BetType,
      startingHands: hands,
    }));
    expect(rangeObjectCollection.getAllRanges()).to.deep.equal(result);
  });
  it("given a constructor can displayed for 16 RangeObjects", () => {
    const rangeObjectCollection = new HandRangeCollection(initialState.ranges);
    const result = initialState.ranges.map(({ Street, BetType, hands }) => ({
      street: Street,
      streetAction: BetType,
      startingHands: hands,
    }));
    expect(rangeObjectCollection.getAllRanges()).to.deep.equal(result);
  });
  it("given a constructor can displayed for 16 RangeObjects with hands", () => {
    const rangeObjectCollection = new HandRangeCollection(
      initialState.ranges.map((rangeObj) => ({ ...rangeObj, hands: ["AKs"] }))
    );
    const result = initialState.ranges.map(({ Street, BetType, hands }) => ({
      street: Street,
      streetAction: BetType,
      startingHands: [{ cardOne: "A", cardTwo: "K", suit: "s", equity: "n/a" }],
    }));
    expect(rangeObjectCollection.getAllRanges()).to.deep.equal(result);
  });
  it("given a RangeObject can provide filtered range for the Flop", (Street = "Flop") => {
    const rangeObjectCollection = new HandRangeCollection(data);
    expect(
      rangeObjectCollection.getPreviousStreetRanges({ Street, isIP: true })
        .length
    ).to.equal(4);
    expect(
      rangeObjectCollection.getPreviousStreetRanges({ Street, isIP: false })
        .length
    ).to.equal(4);
  });
  it("given a RangeObject can provide filtered range for the Turn", (Street = "Turn") => {
    const rangeObjectCollection = new HandRangeCollection(data);
    expect(
      rangeObjectCollection.getPreviousStreetRanges({
        Street: "Turn",
        isIP: true,
      }).length
    ).to.equal(2);
    expect(
      rangeObjectCollection.getPreviousStreetRanges({ Street, isIP: false })
        .length
    ).to.equal(1);
  });
  it("given a RangeObject can provide filtered range for the River", (Street = "River") => {
    const rangeObjectCollection = new HandRangeCollection(data);
    expect(
      rangeObjectCollection.getPreviousStreetRanges({ Street, isIP: true })
        .length
    ).to.equal(2);
    expect(
      rangeObjectCollection.getPreviousStreetRanges({ Street, isIP: false })
        .length
    ).to.equal(1);
  });
});
