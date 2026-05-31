import { mapNewHandRange } from "./../../containers/MainPage/stateRangeFunctions";
import { initialState } from "./../../containers/MainPage/reducer";
import HandRange from "../../containers/MainPage/EngineClasses/HandRange";
import { expect } from "chai";

describe("MainPage reducer", () => {
  it("should return the initial state", function () {
    const oldHandRange = initialState.ranges.map(
      ({ Street, BetType, hands }) => new HandRange(Street, BetType, hands)
    );
    const draftModeStreet = "Flop";
    const draftModeStreetAction = "Bluff";
    const actionDataCards = ["AA"];

    let newHandRange = JSON.parse(JSON.stringify(initialState.ranges)).map(
      ({ Street, BetType }, idx) => {
        if (idx === 5)
          return { Street: draftModeStreet, BetType, hands: ["AA"] };
        else return new HandRange(Street, BetType, []).toRangeData();
      }
    );

    expect(
      mapNewHandRange(
        oldHandRange,
        draftModeStreet,
        draftModeStreetAction,
        actionDataCards
      )
    ).to.deep.equal(newHandRange);
  });
});
