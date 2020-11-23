import { SelectedStreet } from "./../../../containers/MainPage/CurrentRanges/selector";
import { initialState } from "./../../../containers/MainPage/reducer";
import { expect } from "chai";

suite("SelectedStreet ", () => {
  test("can be constructed", () => {
    const selectedStreet = new SelectedStreet(initialState.ranges);
    expect(selectedStreet.ranges).to.equal(initialState.ranges);
  });
  test("can be filtered", () => {
    const selectedStreet = new SelectedStreet(
      initialState.ranges,
      initialState.mode
    );
    const filteredStreet = selectedStreet.filterStreet();

    const result = initialState.ranges.filter(
      ({ Street }) => Street === "Preflop"
    );
    expect(filteredStreet.ranges).to.deep.equal(result);
  });
  test("can be displayed", () => {
    const selectedStreet = new SelectedStreet(
      initialState.ranges,
      initialState.mode
    );
    const filteredStreet = selectedStreet.filterStreet();
    const displayedStreet = filteredStreet.displayStreetObject();

    const result = [
      {
        cardSuitHandArray: [],
        street: "Preflop",
        streetAction: "Raise4BetCall",
      },
      {
        cardSuitHandArray: [],
        street: "Preflop",
        streetAction: "Raise4BetFold",
      },
      {
        cardSuitHandArray: [],
        street: "Preflop",
        streetAction: "RaiseCall",
      },
      {
        cardSuitHandArray: [],
        street: "Preflop",
        streetAction: "RaiseFold",
      },
    ];
    expect(displayedStreet).to.deep.equal(result);
  });
});
