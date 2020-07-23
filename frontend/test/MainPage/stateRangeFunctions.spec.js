import React from "react";
import MainPage from "../../src/containers/MainPage";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { mapNewHandRange } from "../../src/containers/MainPage/stateRangeFunctions";
import { sampleData } from "../../src/containers/MainPage/sampleData";
import { initialState } from "../../src/containers/MainPage/reducer";
import CardHandSuit from "../../src/containers/MainPage/Board/CardHandSuit";

describe("MainPage reducer", () => {
  test("should return the initial state", function() {
    const oldHandRange = initialState.ranges;
    const draftModeStreet = "Flop";
    const draftModeStreetAction = "Bluff";
    const actionDataCards = "AA";

    let newHandRange = JSON.parse(JSON.stringify(initialState.ranges));
    newHandRange[5].hands = [
      new CardHandSuit(
        actionDataCards.substr(0, 1),
        actionDataCards.substr(1, 1)
      ),
    ]; //Flop bluff hand range

    expect(
      mapNewHandRange(
        oldHandRange,
        draftModeStreet,
        draftModeStreetAction,
        actionDataCards
      )
    ).toStrictEqual(newHandRange);
  });
});
