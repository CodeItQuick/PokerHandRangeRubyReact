/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer.js";

const selectGlobal = state => state.globalHands | initialState.globalHands; //needs to be changed to no dot

const makeSelectGlobal = () =>
  createSelector(selectGlobal, globalState => globalState);

export { makeSelectGlobal };
