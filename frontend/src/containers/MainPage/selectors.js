/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialStates } from "./reducer.js";

const selectGlobal = state => state.global | initialStates; //needs to be changed to no dot

const makeSelectGlobal = () =>
  createSelector(selectGlobal, globalState => globalState);

export { makeSelectGlobal };
