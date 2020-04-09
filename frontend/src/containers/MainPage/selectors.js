/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer.js";

const selectGlobal = state => state.globalState | initialState; //??
const selectRouter = state => state.router;

const makeSelectGlobal = () =>
  createSelector(selectGlobal, globalState => globalState.ranges.Preflop); //??

const makeSelectRanges = () => {
  return createSelector(selectGlobal, global => {
    return global.ranges;
  });
}; //??
const makeSelectMode = () => {
  return createSelector(selectGlobal, global => {
    return global.mode;
  });
}; //??
export { makeSelectRanges, makeSelectMode };
