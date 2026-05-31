/**
 * The Current Range Selector
 */

import { createSelector } from "reselect";

import { initialState } from "../reducer";
import HandRange from "../EngineClasses/HandRange";
import { StartingHandBuilder } from "../EngineClasses/StartingHandBuilder";
import { HandRangeCollection } from "../EngineClasses/HandRangeCollection";

const copyHands = (hands) =>
  hands.map((hand) =>
    new StartingHandBuilder().build(
      hand.length <= 3 ? hand.substr(0, 1) : hand.substr(0, 2),
      hand.length <= 3 ? hand.substr(1, 1) : hand.substr(2, 2),
      hand.length <= 3 ? hand.substr(2, hand.length - 1) : ""
    )
  );

export class SelectedStreet {
  constructor(ranges, mode) {
    this.ranges = ranges;
    this.mode = mode;
  }
  filterStreet() {
    this.ranges = this.ranges.filter(
      ({ Street, BetType }) =>
        Street === this.mode?.street &&
        (this.mode?.useTwoFlopSizes
          ? true
          : !(BetType === "SmallValuebet" || BetType === "SmallBluff"))
    );
    return this;
  }
  displayStreetObject() {
    return this.ranges.map(
      ({ Street, BetType, hands }) =>
        new HandRange(Street, BetType, copyHands(hands))
    );
  }
}

const selectGlobal = (state) => state.global || initialState;

const makeSelectMode = () =>
  createSelector(selectGlobal, (globalState) => globalState.mode);

const makeSelectSelectedStreet = () =>
  createSelector(selectGlobal, (global) =>
    new HandRangeCollection(global?.ranges).getRangesForStreet({
      Street: global?.mode?.street,
      useTwoFlopSizes: global?.mode?.useTwoFlopSizes,
    })
  );
export { makeSelectMode, makeSelectSelectedStreet };
