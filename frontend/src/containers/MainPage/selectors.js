/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer";

const selectGlobal = state =>
  state.global || JSON.parse(JSON.stringify(initialState)); //??
const selectRouter = state => state.router;

const selectUser = state => state.user;

const makeSelectMode = () => {
  return createSelector(selectGlobal, globalState => {
    return globalState.mode;
  });
};
const makeSelectRanges = () => {
  return createSelector(selectGlobal, global => {
    if (
      global &&
      global.mode &&
      global.mode.street &&
      global.mode.streetAction &&
      global.ranges
    ) {
      return global.ranges.filter(({ Street, BetType }) => {
        return Street == global.mode.street;
      });
    } else return initialState.ranges;
  });
};

//FIXME: Needs a rename because its all ranges
const makeSelectRangesPreflop = () => {
  return createSelector(selectGlobal, global => {
    if (global && global.mode && global.mode.street && global.mode.streetAction)
      return global.ranges.filter(({ Street }) => Street == global.mode.street);
    else return initialState.ranges.filter(({ Street }) => Street == "Preflop");
  });
};

const makeSelectRangesPreflopOnly = () => {
  return createSelector(selectGlobal, global => {
    if (global && global.mode && global.mode.street && global.mode.streetAction)
      return global.ranges.filter(({ Street }) => Street == "Preflop");
    else return initialState.ranges.filter(({ Street }) => Street == "Preflop");
  });
};

const makeSelectRange = () =>
  createSelector(selectGlobal, globalState => globalState.ranges);

const makeSelectUser = () => createSelector(selectUser, userState => userState);

const makeSelectDeadcards = () =>
  createSelector(selectGlobal, globalState => globalState.deadcards);

const makeSelectRangeRepoIP = () =>
  createSelector(selectGlobal, globalState => globalState.rangeRepoIP);

const makeSelectRangeRepoOOP = () =>
  createSelector(selectGlobal, globalState => globalState.rangeRepoOOP);

const makeSelectPosition = () =>
  createSelector(selectGlobal, globalState => globalState.mode.isIP);

const makeSelectOtherRange = () => {
  return createSelector(selectGlobal, globalState => {
    let rangeRepoPreflop = initialState.ranges;
    if (globalState.mode.isIP) rangeRepoPreflop = globalState.rangeRepoIP;
    else rangeRepoPreflop = globalState.rangeRepoOOP;
    return rangeRepoPreflop;
  });
};

const makeSelectLoadEquities = () =>
  createSelector(selectGlobal, globalState => globalState.loadEquities);

const makeSelectHandEquities = () =>
  createSelector(selectGlobal, globalState => globalState.handEquities);

export {
  selectGlobal,
  selectRouter,
  makeSelectRanges,
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
  makeSelectRangesPreflop,
  makeSelectRangesPreflopOnly,
  makeSelectRange,
  makeSelectMode,
  makeSelectUser,
  makeSelectDeadcards,
  makeSelectPosition,
  makeSelectLoadEquities,
  makeSelectOtherRange,
  makeSelectHandEquities
};
