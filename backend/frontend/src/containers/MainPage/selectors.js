/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer";
import Scenario from "./ScenarioLoader/Scenario";
import Scenarios from "./ScenarioLoader/Scenarios";
import RangeObject from "./RangeObject";
import { CardHandSuitClosure } from "./Board/CardHandSuit";

const copyHands = hands =>
  hands.map(hand =>
    CardHandSuitClosure(
      hand.length <= 3 ? hand.substr(0, 1) : hand.substr(0, 2),
      hand.length <= 3 ? hand.substr(1, 1) : hand.substr(2, 2),
      hand.length <= 3 ? hand.substr(2, hand.length - 1) : ""
    )
  );

const selectGlobal = state => state.global || initialState; //??
const selectRouter = state => state.router;

const selectUser = state => state.user;

const makeSelectMode = () =>
  createSelector(selectGlobal, globalState => globalState.mode);

const makeSelectSelectedStreetBetType = () => {
  return createSelector(selectGlobal, global => {
    if (
      global &&
      global.mode &&
      global.mode.street &&
      global.mode.streetAction &&
      global.ranges
    ) {
      return global.ranges
        .filter(
          ({ Street, BetType }) =>
            Street == global.mode.street && BetType == global.mode.streetAction
        )
        .map(
          ({ Street, BetType, hands }) =>
            new RangeObject(Street, BetType, copyHands(hands))
        );
    } else
      return initialState.ranges.map(
        ({ Street, BetType, hands }) =>
          new RangeObject(Street, BetType, copyHands(hands))
      );
  });
};

const makeSelectSelectedStreet = () =>
  createSelector(selectGlobal, global =>
    global.ranges
      .filter(
        ({ Street, BetType }) =>
          Street === global?.mode?.street &&
          (global?.mode?.useTwoFlopSizes
            ? true
            : !(BetType === "SmallValuebet" || BetType === "SmallBluff"))
      )
      .map(
        ({ Street, BetType, hands }) =>
          new RangeObject(Street, BetType, copyHands(hands))
      )
  );

const makeSelectRangesPreviousStreet = () =>
  createSelector(selectGlobal, global =>
    global.ranges
      .filter(({ Street, BetType }) => {
        if (global.mode.street === "Flop" && global.mode.isIP == true)
          return Street === "Preflop";
        if (global.mode.street === "Turn" && global.mode.isIP == true)
          return (
            Street === "Flop" &&
            (BetType === "Valuebet" ||
              BetType === "Bluff" ||
              BetType === "SmallValuebet" ||
              BetType === "SmallBluff")
          );
        if (global.mode.street === "River" && global.mode.isIP == true)
          return (
            Street === "Turn" && (BetType === "Valuebet" || BetType === "Bluff")
          );
        if (global.mode.street === "Flop" && global.mode.isIP == false)
          return Street === "Preflop";
        if (global.mode.street === "Turn" && global.mode.isIP == false)
          return Street === "Flop" && BetType === "CheckCall";
        if (global.mode.street === "River" && global.mode.isIP == false)
          return Street === "Turn" && BetType === "CheckCall";
        return false; // just in case, filter it out
      })
      .map(
        ({ Street, BetType, hands }) =>
          new RangeObject(Street, BetType, copyHands(hands))
      )
  );

//FIXME: Needs a rename because its all ranges
const makeSelectRangesPreflop = () =>
  createSelector(selectGlobal, global =>
    global.ranges
      .filter(({ Street }) => Street == "Preflop")
      .map(
        ({ Street, BetType, hands }) =>
          new RangeObject(Street, BetType, copyHands(hands))
      )
  );

const makeSelectRange = () =>
  createSelector(selectGlobal, globalState =>
    globalState.ranges.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(Street, BetType, copyHands(hands))
    )
  );

const makeSelectUser = () => createSelector(selectUser, userState => userState);

const makeSelectDeadcards = () =>
  createSelector(selectGlobal, globalState => globalState.deadcards);

const makeSelectRangeRepoIP = () =>
  createSelector(selectGlobal, globalState =>
    globalState.rangeRepoIP.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(Street, BetType, copyHands(hands))
    )
  );

const makeSelectRangeRepoOOP = () =>
  createSelector(selectGlobal, globalState =>
    globalState.rangeRepoOOP.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(Street, BetType, copyHands(hands))
    )
  );

const makeSelectPosition = () =>
  createSelector(selectGlobal, globalState => globalState.mode.isIP);

const makeSelectOtherRange = () => {
  return createSelector(selectGlobal, globalState => {
    let rangeRepoPreflop;
    if (globalState.mode.isIP)
      rangeRepoPreflop = globalState.rangeRepoIP.map(
        ({ Street, BetType, hands }) =>
          new RangeObject(Street, BetType, copyHands(hands))
      );
    else
      rangeRepoPreflop = globalState.rangeRepoOOP.map(
        ({ Street, BetType, hands }) =>
          new RangeObject(Street, BetType, copyHands(hands))
      );
    return rangeRepoPreflop;
  });
};

const makeSelectLoadEquities = () =>
  createSelector(selectGlobal, globalState => globalState.loadEquities);

const makeSelectHandEquities = () =>
  createSelector(selectGlobal, globalState => globalState.handEquities);

const makeSelectScenariosClass = () =>
  createSelector(
    selectGlobal,
    globalState =>
      new Scenarios(
        globalState.scenarioBoards.map(board => new Scenario(board, null, null))
      )
  );

export {
  selectGlobal,
  selectRouter,
  makeSelectSelectedStreetBetType,
  makeSelectSelectedStreet,
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
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
  makeSelectScenariosClass
};
