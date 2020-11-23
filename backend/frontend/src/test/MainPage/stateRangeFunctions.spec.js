import { mapNewHandRange } from "./../../containers/MainPage/stateRangeFunctions";
import { initialState } from "./../../containers/MainPage/reducer";
import RangeObject from "./../../containers/MainPage/EngineClasses/RangeObject";
import { expect } from "chai";

suite("MainPage reducer", () => {
  test("should return the initial state", function () {
    const oldHandRange = initialState.ranges.map(
      ({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
    );
    const draftModeStreet = "Flop";
    const draftModeStreetAction = "Bluff";
    const actionDataCards = ["AA"];

    let newHandRange = JSON.parse(JSON.stringify(initialState.ranges)).map(
      ({ Street, BetType }, idx) => {
        if (idx === 5)
          return { Street: draftModeStreet, BetType, hands: ["AA"] };
        else return new RangeObject(Street, BetType, []).getRangesObject();
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
