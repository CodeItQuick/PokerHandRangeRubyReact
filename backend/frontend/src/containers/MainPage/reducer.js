import produce from "immer";

import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  INIT_CREATE_NEW_FOLDER,
  CREATE_NEW_FOLDER_SUCCESS,
  CREATE_NEW_FOLDER_FAIL,
  SET_HAND_RANGE_GROUP,
  SET_DYNAMIC_FOLDER_INFO,
  SAVE_AND_LOAD,
  LOAD_NEW_FOLDER,
  INIT_ALL_USER_HAND_RANGES,
  ALL_USER_HAND_RANGES_SUCCESS,
  ALL_USER_HAND_RANGES_FAIL,
  SET_DEAD_CARDS
} from "./constants.js";

import { saveOldRangeRepo, loadNewRange } from "./stateRangeFunctions";
import { sampleData, ranges, rangeRepo } from "./sampleData.js";

const initialState = {
  mode: sampleData.mode,
  rangeSelectionArray: sampleData.rangeSelectionArray,
  rangeColors: sampleData.rangeColors,
  rangeRepo: rangeRepo,
  ranges: ranges,
  deadcards: []
};

//TODO: Make ranges convert between easy to read ranges
const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_HAND_RANGE_SELECT:
        draft.mode.street = action.data.name || "Preflop";
        draft.mode.streetAction = action.data.value;
        break;

      case SET_HAND_RANGE:
        draft.ranges = action.data;

        break;

      case INIT_CREATE_NEW_FOLDER:
        break;

      case CREATE_NEW_FOLDER_SUCCESS:
        //Populate the range repository that holds all ranges from the DB
        console.log(action.data);
        break;

      case SET_DYNAMIC_FOLDER_INFO:
        draft.rangeRepo = saveOldRangeRepo(
          draft.rangeRepo,
          draft.rangeSelectionArray,
          draft.ranges
        );
        draft.rangeSelectionArray = action.data;
        draft.ranges = loadNewRange(draft.rangeRepo, action.data);

        break;

      case INIT_ALL_USER_HAND_RANGES:
        draft.ranges = initialState.ranges;
        break;

      case ALL_USER_HAND_RANGES_SUCCESS:
        //Populate the range repository that holds all ranges from the DB
        draft.rangeRepo = action.data.map(
          ({ FolderName, GroupName, RangeName, RangeScope }) => {
            return {
              FolderName,
              FolderGroupName: GroupName,
              Position: RangeName,
              ranges: RangeScope
            };
          }
        );
        break;

      case ALL_USER_HAND_RANGES_FAIL:
        break;

      case SET_DEAD_CARDS:
        draft.deadcards = action.data;
        break;

      default:
        break;
    }
  });
export default mainPageReducer;
export { initialState };
