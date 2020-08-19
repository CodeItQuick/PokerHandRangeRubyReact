import produce from "immer";

import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  SET_DEAD_CARDS,
  SET_IS_IP,
  LOAD_EQUITIES,
  LOAD_EQUITIES_SUCCESS,
  INIT_SAVE_SCENARIO,
  SAVE_SCENARIO_SUCCESS,
  SAVE_SCENARIO_FAILED,
  GET_SCENARIO_SUCCESS,
  GET_SCENARIO_FAIL,
  INIT_GET_ALL_SCENARIO,
  GET_ALL_SCENARIO_SUCCESS,
  GET_ALL_SCENARIO_FAIL,
  INIT_GET_SCENARIO,
  CHANGE_MODE_SUIT_SELECTED,
  CHANGE_USE_ONE_FLOP_BETSIZE
} from "./constants.js";

import { sampleData, ranges } from "./sampleData.js";

const initialState = {
  mode: sampleData.mode,
  rangeSelectionArray: sampleData.rangeSelectionArray,
  rangeColors: sampleData.rangeColors,
  rangeRepoIP: sampleData.rangeRepoIP,
  rangeRepoOOP: sampleData.rangeRepoOOP,
  ranges: ranges,
  deadcards: [],
  loadEquities: false,
  handEquities: [{}, {}],
  scenarioBoards: []
};

//TODO: Make ranges convert between easy to read ranges
const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_EQUITIES:
        draft.loadEquities = true;
        break;

      case LOAD_EQUITIES_SUCCESS:
        if (action.data.Position) draft.handEquities[0] = action.data.newCards;
        else draft.handEquities[1] = action.data.newCards;
        break;

      case SET_IS_IP:
        draft.mode.isIP = action.data.position;
        draft.rangeRepoIP = action.data.newRangeIP;
        draft.rangeRepoOOP = action.data.newRangeOOP;
        draft.ranges = action.data.newRanges;
        draft.loadEquities = false;
        break;

      case SET_HAND_RANGE_SELECT:
        draft.mode.street = action.data.name || "Preflop";
        draft.mode.streetAction = action.data.value;
        draft.loadEquities = false;
        break;

      case SET_HAND_RANGE:
        draft.loadEquities = false;
        draft.ranges = action.data;
        break;

      case SET_DEAD_CARDS:
        draft.deadcards = action.data;
        if (action.data.length > 4) {
          draft.mode.street = "River";
          draft.mode.streetAction = "Valuebet";
        } else if (action.data.length > 3) {
          draft.mode.street = "Turn";
          draft.mode.streetAction = "Valuebet";
        } else if (action.data.length > 2) {
          draft.mode.street = "Flop";
          draft.mode.streetAction = "Valuebet";
        } else {
          draft.mode.street = "Preflop";
          draft.mode.streetAction = "Raise4BetCall";
        }

        draft.loadEquities = false;
        break;

      case INIT_SAVE_SCENARIO:
        break;

      case SAVE_SCENARIO_SUCCESS:
        break;

      case SAVE_SCENARIO_FAILED:
        break;

      case INIT_GET_SCENARIO:
        break;

      case GET_SCENARIO_SUCCESS:
        draft.rangeRepoIP = action.data.results[0].t.rangeRepo[0];
        draft.rangeRepoOOP = action.data.results[0].t.rangeRepo[1];
        draft.deadcards = action.data.results[0].t.board.split(",");
        draft.mode.isIP = true;
        draft.ranges = action.data.results[0].t.rangeRepo[0];
        break;

      case GET_SCENARIO_FAIL:
        break;

      case INIT_GET_ALL_SCENARIO:
        break;

      case GET_ALL_SCENARIO_SUCCESS:
        draft.scenarioBoards = action.data.map(({ t: { board } }) => board);
        break;

      case GET_ALL_SCENARIO_FAIL:
        break;

      case CHANGE_MODE_SUIT_SELECTED:
        if (draft.mode.suitSelection.indexOf(action.data) >= 0) {
          draft.mode.suitSelection = draft.mode.suitSelection.filter(
            cardsSuit => cardsSuit !== action.data
          );
        } else
          draft.mode.suitSelection = [...draft.mode.suitSelection, action.data];
        break;

      case CHANGE_USE_ONE_FLOP_BETSIZE:
        draft.mode.useTwoFlopSizes = action.data;
        break;

      default:
        break;
    }
  });
export default mainPageReducer;
export { initialState };
