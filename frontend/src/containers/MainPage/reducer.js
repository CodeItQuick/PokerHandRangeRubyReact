import produce from "immer";

import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  SET_DEAD_CARDS,
  SET_IS_IP,
  LOAD_EQUITIES,
  LOAD_EQUITIES_SUCCESS,
  RESET_STATE
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
  handEquities: [{}, {}]
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
        draft.ranges = action.data;
        draft.loadEquities = false;

        break;

      case SET_DEAD_CARDS:
        draft.deadcards = action.data;
        draft.loadEquities = false;
        break;

      case RESET_STATE:
        draft = initialState;
        break;

      default:
        break;
    }
  });
export default mainPageReducer;
export { initialState };
