import { initialState } from "./../../../containers/MainPage/reducer";
import { assignPositions } from "./../../../containers/MainPage/InputForm";
import HandRange from "../../../containers/MainPage/EngineClasses/HandRange";
import { expect } from "chai";

describe("InputStreet Container", () => {
  it("The assignPositions function returns the correct values for the flop", () => {
    const rangeRepoIP = JSON.parse(JSON.stringify(initialState.rangeRepoIP))
      .filter(({ Street }) => Street == "Flop")
      .map(
        ({ Street, BetType, hands }) => new HandRange(Street, BetType, hands)
      );
    const rangeRepoIPDataObject = rangeRepoIP.map((rangeObject) =>
      rangeObject.toRangeData()
    );

    const rangeRepoOOP = JSON.parse(JSON.stringify(initialState.rangeRepoOOP))
      .filter(({ Street }) => Street == "Flop")
      .map(
        ({ Street, BetType, hands }) => new HandRange(Street, BetType, hands)
      );

    let selectedRanges = JSON.parse(JSON.stringify(initialState.ranges))
      .filter(({ Street }) => Street == "Flop")
      .map(
        ({ Street, BetType, hands }) => new HandRange(Street, BetType, hands)
      );
    const selectedRangesDataObject = selectedRanges.map((rangeObject) =>
      rangeObject.toRangeData()
    );

    const values = true;

    let [newRangeIP, newRangeOOP, newRanges] = assignPositions(
      rangeRepoIP,
      rangeRepoOOP,
      selectedRanges,
      values
    );

    expect(newRangeIP).to.deep.equal(rangeRepoIPDataObject);
    expect(newRangeOOP).to.deep.equal(selectedRangesDataObject);
    expect(newRanges).to.deep.equal(rangeRepoIPDataObject);
  });
});
