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
        return (
          Street == global.mode.street && BetType == global.mode.streetAction
        );
      })[0];
    } else
      return initialState.filter(({ Street, BetType }) => {
        return Street == "Preflop" && BetType == "Raise4BetCall";
      })[0];
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
  createSelector(selectGlobal, globalState => globalState.ranges); //??

const makeSelectRangeColors = () =>
  createSelector(selectGlobal, globalState => globalState.rangeColors);

const makeSelectUser = () => createSelector(selectUser, userState => userState);

const makeSelectFolder = () =>
  createSelector(selectGlobal, globalState => {
    if (globalState.rangeRepo) {
      let returnValues = globalState.rangeRepo.reduce((acc, { FolderName }) => {
        if (acc.indexOf(FolderName) >= 0) return acc;
        else return [...acc, FolderName];
      }, []);
      return returnValues;
    }
  });

const makeSelectFolderGroup = () =>
  createSelector(selectGlobal, globalState => {
    if (globalState.rangeRepo) {
      const selectedFolder = globalState.rangeSelectionArray.folderID;
      let selectedFolderRange = globalState.rangeRepo.filter(
        ({ FolderName }) => FolderName == selectedFolder
      );

      let returnValues = selectedFolderRange.reduce(
        (acc, { FolderGroupName }) => {
          if (acc.indexOf(FolderGroupName) >= 0) return acc;
          else return [...acc, FolderGroupName];
        },
        []
      );

      return returnValues;
    }
  });

const makeSelectFolderRanges = () =>
  createSelector(selectGlobal, globalState => {
    if (globalState.rangeRepo)
      return Object.keys(globalState.rangeRepo).map(folder =>
        Object.keys(folder).reduce(() => {
          return { position: globalState["rangeRepo"][folder] };
        })
      );
    else return {};
  });

export {
  selectGlobal,
  selectRouter,
  makeSelectRanges,
  makeSelectRangesPreflop,
  makeSelectRangesPreflopOnly,
  makeSelectRange,
  makeSelectMode,
  makeSelectUser,
  makeSelectFolder,
  makeSelectFolderGroup,
  makeSelectRangeColors
};
