/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer";
import Scenario from "./EngineClasses/Scenario";
import { Scenarios } from "./EngineClasses/Scenarios";
import HandRange from "./EngineClasses/HandRange";
import { StartingHandBuilder } from "./EngineClasses/StartingHandBuilder";
import { HandRangeCollection } from "./EngineClasses/HandRangeCollection";

const selectGlobal = (state) => state.global || initialState; //??
const selectRouter = (state) => state.router;

const selectUser = (state) => state.user;

const makeSelectMode = () =>
  createSelector(selectGlobal, (globalState) => globalState.mode);

const makeSelectRangeRepoIP = () =>
  createSelector(selectGlobal, (globalState) =>
    new HandRangeCollection(globalState.rangeRepoIP).getAllRanges()
  );

const makeSelectRangeRepoOOP = () =>
  createSelector(selectGlobal, (globalState) =>
    new HandRangeCollection(globalState.rangeRepoOOP).getAllRanges()
  );
const makeSelectSelectedStreetBetType = () => {
  return createSelector(selectGlobal, (global) =>
    new HandRangeCollection(global.ranges).getRangesForStreet({
      street: global?.mode?.street,
    })
  );
};

const makeSelectSelectedStreet = () =>
  createSelector(selectGlobal, (global) =>
    new HandRangeCollection(global?.ranges).getRangesForStreet({
      Street: global?.mode?.street,
      useTwoFlopSizes: global?.mode?.useTwoFlopSizes,
    })
  );

const makeSelectRangesPreviousStreet = () =>
  createSelector(selectGlobal, (global) =>
    new HandRangeCollection(global.ranges).getPreviousStreetRanges({
      Street: global?.mode?.street,
      isIP: global?.mode?.isIP,
    })
  );

//FIXME: Needs a rename because its all ranges
const makeSelectRangesPreflop = () =>
  createSelector(selectGlobal, (global) =>
    new HandRangeCollection(global.ranges).getRangesForStreet({
      Street: "Preflop",
    })
  );

const makeSelectRange = () =>
  createSelector(selectGlobal, (globalState) =>
    new HandRangeCollection(globalState.ranges).getAllRanges()
  );

const makeSelectUser = () =>
  createSelector(selectUser, (userState) => userState);

const makeSelectDeadcards = () =>
  createSelector(selectGlobal, (globalState) => globalState.deadcards);

const makeSelectPosition = () =>
  createSelector(selectGlobal, (globalState) => globalState.mode.isIP);

const makeSelectOtherRange = () => {
  return createSelector(selectGlobal, (globalState) => {
    let rangeRepoPreflop;
    if (globalState.mode.isIP)
      rangeRepoPreflop = new HandRangeCollection(
        globalState.rangeRepoIP
      ).getAllRanges();
    else
      rangeRepoPreflop = new HandRangeCollection(
        globalState.rangeRepoOOP
      ).getAllRanges();
    return rangeRepoPreflop;
  });
};

const makeSelectLoadEquities = () =>
  createSelector(selectGlobal, (globalState) => globalState.loadEquities);

const makeSelectHandEquities = () =>
  createSelector(selectGlobal, (globalState) => globalState.handEquities);

const makeSelectScenariosClass = () =>
  createSelector(
    selectGlobal,
    (globalState) =>
      new Scenarios(
        globalState.scenarioBoards.map(
          ([board, ScenarioName, OpenerPosition, DefenderPosition]) =>
            new Scenario({
              board,
              OpenerPosition,
              DefenderPosition,
              ScenarioName,
            })
        )
      )
  );

export {
  selectGlobal,
  selectRouter,
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
  makeSelectSelectedStreetBetType,
  makeSelectSelectedStreet,
  makeSelectRangesPreviousStreet,
  makeSelectRangesPreflop,
  makeSelectRange,
  makeSelectMode,
  makeSelectUser,
  makeSelectDeadcards,
  makeSelectPosition,
  makeSelectLoadEquities,
  makeSelectOtherRange,
  makeSelectHandEquities,
  makeSelectScenariosClass,
};
