import { SelectedStreet } from "./../../../containers/MainPage/CurrentRanges/selector";
import { initialState } from "./../../../containers/MainPage/reducer";
import { expect } from "chai";

describe("SelectedStreet ", () => {
  it("can be constructed", () => {
    const selectedStreet = new SelectedStreet(initialState.ranges);
    expect(selectedStreet.ranges).to.equal(initialState.ranges);
  });
  it("can be filtered", () => {
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
  it("can be displayed", () => {
    const selectedStreet = new SelectedStreet(
      initialState.ranges,
      initialState.mode
    );
    const filteredStreet = selectedStreet.filterStreet();
    const displayedStreet = filteredStreet.displayStreetObject();

    const result = [
      {
        startingHands: [],
        street: "Preflop",
        streetAction: "Raise4BetCall",
      },
      {
        startingHands: [],
        street: "Preflop",
        streetAction: "Raise4BetFold",
      },
      {
        startingHands: [],
        street: "Preflop",
        streetAction: "RaiseCall",
      },
      {
        startingHands: [],
        street: "Preflop",
        streetAction: "RaiseFold",
      },
    ];
    expect(displayedStreet).to.deep.equal(result);
  });
});
