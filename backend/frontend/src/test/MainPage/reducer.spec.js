import reducer, { initialState } from "./../../containers/MainPage/reducer";
import * as types from "./../../containers/MainPage/constants";
import {
  setHandRangeSelect,
  initSetHandRange,
  initSetDeadCards,
} from "./../../containers/MainPage/actions";
import { expect } from "chai";

const data = [
  { name: "Preflop", value: "Raise4BetCall" },
  { name: "Preflop", value: "Raise4BetFold" },
  { name: "Preflop", value: "RaiseCall" },
  { name: "Preflop", value: "RaiseFold" },
  { name: "Flop", value: "Valuebet" },
  { name: "Flop", value: "Bluff" },
  { name: "Flop", value: "CheckCall" },
  { name: "Flop", value: "CheckFold" },
  { name: "Turn", value: "Valuebet" },
  { name: "Turn", value: "Bluff" },
  { name: "Turn", value: "CheckCall" },
  { name: "Turn", value: "CheckFold" },
  { name: "River", value: "Valuebet" },
  { name: "River", value: "Bluff" },
  { name: "River", value: "CheckCall" },
  { name: "River", value: "CheckFold" },
];

describe("MainPage reducer", () => {
  it("should return the initial state", function () {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it.skip(
    "The reducer with action " +
      types.SET_HAND_RANGE_SELECT +
      " should return the new mode",
    (data) => {
      const action = setHandRangeSelect(data);

      let newState = JSON.parse(JSON.stringify(initialState));

      expect(reducer(undefined, action)).to.deep.equal(newState);
    }
  );

  it("The reducer when action SET_HAND_RANGE should return the new state for hand range", () => {
    //Given
    let ranges = JSON.parse(JSON.stringify(initialState.ranges));
    ranges[0] = { ...ranges, hands: ["AA"] };

    //When
    const action = initSetHandRange(ranges);

    //Then
    let newState = JSON.parse(JSON.stringify(initialState));

    newState = {
      ...initialState,
      ranges,
    };

    expect(reducer(undefined, action)).to.deep.equal(newState);
  });

  it("The reducer when action SET_DEADCARDS should return the new state for deadcards", () => {
    //Given
    const deadcards = ["Ac", "Td", "5h"];

    //When
    const action = initSetDeadCards(deadcards);

    //Then
    let newState = JSON.parse(JSON.stringify(initialState));

    newState = {
      ...initialState,
      deadcards,
      mode: {
        street: "Flop",
        streetAction: "Valuebet",
        isIP: true,
        suitSelection: [],
        useTwoFlopSizes: false,
      },
    };

    expect(reducer(undefined, action)).to.deep.equal(newState);
  });
});
