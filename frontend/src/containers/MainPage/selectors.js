/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer";

const selectGlobal = state => state.global || initialState; //??
const selectRouter = state => state.router;

const makeSelectMode = () => {
  return createSelector(selectGlobal, global => {
    return global.mode;
  });
}; //??
const makeSelectRanges = () => {
  return createSelector(selectGlobal, global => {
    if (global && global.mode && global.mode.street && global.mode.streetAction)
      return global.ranges[[global.mode.street]][[global.mode.streetAction]];
    else return initialState.ranges.Preflop.Raise4BetCall;
  });
}; //??

const makeSelectRangeColors = () =>
  createSelector(selectGlobal, globalState => globalState.rangeColors); //??

const makeSelectRange = () =>
  createSelector(selectGlobal, globalState => globalState.ranges); //??

export {
  selectGlobal,
  selectRouter,
  makeSelectRanges,
  makeSelectRange,
  makeSelectMode,
  makeSelectRangeColors
};
