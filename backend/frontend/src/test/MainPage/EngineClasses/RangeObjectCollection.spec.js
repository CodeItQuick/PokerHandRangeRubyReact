import { initialState } from "./../../../containers/MainPage/reducer";
import { RangeObjectCollection } from "./../../../containers/MainPage/EngineClasses/RangeObjectCollection";
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

suite("A RangeObject Collection ", () => {
  test("given no constructor can display 16 RangeObjects", () => {
    const rangeObjectCollection = new RangeObjectCollection();
    const result = initialState.ranges.map(({ Street, BetType, hands }) => ({
      street: Street,
      streetAction: BetType,
      cardSuitHandArray: hands,
    }));
    expect(rangeObjectCollection.displayRange()).to.deep.equal(result);
  });
  test("given a constructor can displayed for 16 RangeObjects", () => {
    const rangeObjectCollection = new RangeObjectCollection(
      initialState.ranges
    );
    const result = initialState.ranges.map(({ Street, BetType, hands }) => ({
      street: Street,
      streetAction: BetType,
      cardSuitHandArray: hands,
    }));
    expect(rangeObjectCollection.displayRange()).to.deep.equal(result);
  });
  test("given a constructor can displayed for 16 RangeObjects with hands", () => {
    const rangeObjectCollection = new RangeObjectCollection(
      initialState.ranges.map((rangeObj) => ({ ...rangeObj, hands: ["AKs"] }))
    );
    const result = initialState.ranges.map(({ Street, BetType, hands }) => ({
      street: Street,
      streetAction: BetType,
      cardSuitHandArray: [
        { cardOne: "A", cardTwo: "K", suit: "s", equity: "n/a" },
      ],
    }));
    expect(rangeObjectCollection.displayRange()).to.deep.equal(result);
  });
  test("given a RangeObject can provide filtered range for the Flop", (Street = "Flop") => {
    const rangeObjectCollection = new RangeObjectCollection(data);
    expect(
      rangeObjectCollection.displayPreviousRange({ Street, isIP: true }).length
    ).to.equal(4);
    expect(
      rangeObjectCollection.displayPreviousRange({ Street, isIP: false }).length
    ).to.equal(4);
  });
  test("given a RangeObject can provide filtered range for the Turn", (Street = "Turn") => {
    const rangeObjectCollection = new RangeObjectCollection(data);
    expect(
      rangeObjectCollection.displayPreviousRange({ Street: "Turn", isIP: true })
        .length
    ).to.equal(2);
    expect(
      rangeObjectCollection.displayPreviousRange({ Street, isIP: false }).length
    ).to.equal(1);
  });
  test("given a RangeObject can provide filtered range for the River", (Street = "River") => {
    const rangeObjectCollection = new RangeObjectCollection(data);
    expect(
      rangeObjectCollection.displayPreviousRange({ Street, isIP: true }).length
    ).to.equal(2);
    expect(
      rangeObjectCollection.displayPreviousRange({ Street, isIP: false }).length
    ).to.equal(1);
  });
});
