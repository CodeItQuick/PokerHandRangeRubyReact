/**
 * The home state selectors
 */

import { createSelector } from "reselect";

import { initialState } from "./reducer";
import Scenario from "./ScenarioLoader/Scenario";
import Scenarios from "./ScenarioLoader/Scenarios";
import RangeObject from "./RangeObject";
import CardHandSuit from "./Board/CardHandSuit";

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
            new RangeObject(
              Street,
              BetType,
              hands.map(
                hand =>
                  new CardHandSuit(
                    hand[0],
                    hand[1],
                    hand.length > 2 ? hand.substr(2, hand.length - 1) : ""
                  )
              )
            )
        );
    } else
      return initialState.ranges.map(
        ({ Street, BetType, hands }) =>
          new RangeObject(
            Street,
            BetType,
            hands.map(
              hand =>
                new CardHandSuit(
                  hand[0],
                  hand[1],

                  hand.length > 2 ? hand.substr(2, hand.length - 1) : ""
                )
            )
          )
      );
  });
};

const makeSelectSelectedStreet = () =>
  createSelector(selectGlobal, global =>
    global.ranges
      .filter(({ Street }) => Street == global?.mode?.street)
      .map(
        ({ Street, BetType, hands }) =>
          new RangeObject(
            Street,
            BetType,
            hands.map(
              hand =>
                new CardHandSuit(
                  hand[0],
                  hand[1],

                  hand.length > 2 ? hand.substr(2, hand.length - 1) : ""
                )
            )
          )
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
            Street === "Flop" && (BetType === "Valuebet" || BetType === "Bluff")
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
          new RangeObject(
            Street,
            BetType,
            hands.map(
              hand =>
                new CardHandSuit(
                  hand[0],
                  hand[1],
                  hand.length > 2 ? hand.substr(2, hand.length - 1) : ""
                )
            )
          )
      )
  );

//FIXME: Needs a rename because its all ranges
const makeSelectRangesPreflop = () =>
  createSelector(selectGlobal, global =>
    global.ranges
      .filter(({ Street }) => Street == "Preflop")
      .map(
        ({ Street, BetType, hands }) =>
          new RangeObject(
            Street,
            BetType,
            hands.map(
              hand =>
                new CardHandSuit(
                  hand[0],
                  hand[1],
                  hand.length > 2 ? hand.substr(2, hand.length - 1) : ""
                )
            )
          )
      )
  );

const makeSelectRange = () =>
  createSelector(selectGlobal, globalState =>
    globalState.ranges.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(
          Street,
          BetType,
          hands.map(
            hand =>
              new CardHandSuit(
                hand[0],
                hand[1],
                hand.length > 2 ? hand.substr(2, hand.length - 1) : ""
              )
          )
        )
    )
  );

const makeSelectUser = () => createSelector(selectUser, userState => userState);

const makeSelectDeadcards = () =>
  createSelector(selectGlobal, globalState => globalState.deadcards);

const makeSelectRangeRepoIP = () =>
  createSelector(selectGlobal, globalState =>
    globalState.rangeRepoIP.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(
          Street,
          BetType,
          hands.map(
            hand =>
              new CardHandSuit(hand[0], hand[1], hand.length > 2 ? hand[2] : "")
          )
        )
    )
  );

const makeSelectRangeRepoOOP = () =>
  createSelector(selectGlobal, globalState =>
    globalState.rangeRepoOOP.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(
          Street,
          BetType,
          hands.map(
            hand =>
              new CardHandSuit(hand[0], hand[1], hand.length > 2 ? hand[2] : "")
          )
        )
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
          new RangeObject(
            Street,
            BetType,
            hands.map(
              hand =>
                new CardHandSuit(
                  hand.substr(0, 1),
                  hand.substr(1, 1),
                  hand.length > 2 ? hand.substring(1, hand.length - 1) : ""
                )
            )
          )
      );
    else
      rangeRepoPreflop = globalState.rangeRepoOOP.map(
        ({ Street, BetType, hands }) =>
          new RangeObject(
            Street,
            BetType,
            hands.map(
              hand =>
                new CardHandSuit(
                  hand[0],
                  hand[1],
                  hand.length > 2 ? hand[2] : ""
                )
            )
          )
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
