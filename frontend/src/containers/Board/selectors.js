/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer.js";

const selectGlobal = state => state.globalState | initialState; //??

const makeSelectRangeColors = () =>
  createSelector(selectGlobal, globalState => globalState.rangeColors); //??

const makeSelectRanges = () =>
  createSelector(selectGlobal, globalState => globalState.ranges); //??

const makeSelectMode = () =>
  createSelector(selectGlobal, globalState => globalState.mode); //??

export { makeSelectRangeColors, makeSelectRanges, makeSelectMode };
