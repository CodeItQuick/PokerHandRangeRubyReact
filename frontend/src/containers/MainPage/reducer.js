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
  ALL_USER_HAND_RANGES_FAIL
} from "./constants.js";

import { saveOldRangeRepo, loadNewRange } from "./stateRangeFunctions";

const initialState = {
  mode: {
    street: "Preflop",
    streetAction: "Raise4BetCall"
  },
  rangeSelectionArray: {
    folderID: "Evan's Second Folder",
    folderSubgroupName: "Opening Ranges",
    folderSubgroupRangeName: "UTG"
  },
  rangeColors: {
    "0": [],
    "1": [],
    "2": [],
    "3": []
  },
  rangeRepo: [
    {
      FolderName: "Evan's Second Folder",
      FolderGroupName: "Opening Ranges",
      Position: "UTG",
      ranges: [{}]
    },
    {
      FolderName: "Evan's Second Folder",
      FolderGroupName: "Opening Ranges",
      Position: "MP",
      ranges: [{}]
    },
    {
      FolderName: "Evan's Second Folder",
      FolderGroupName: "Opening Ranges",
      Position: "CO",
      ranges: [
        {
          Street: "Preflop",
          BetType: "Raise4BetCall",
          hands: []
        }
      ]
    },
    {
      FolderName: "Evan's Second Folder",
      FolderGroupName: "Opening Ranges",
      Position: "BU",
      ranges: [
        {
          Street: "Preflop",
          BetType: "Raise4BetCall",
          hands: []
        }
      ]
    },
    {
      FolderName: "Evan's Second Folder",
      FolderGroupName: "Opening Ranges",
      Position: "SB",
      ranges: [
        {
          Street: "Preflop",
          BetType: "Raise4BetCall",
          hands: []
        }
      ]
    }
  ],
  ranges: [
    {
      Street: "Preflop",
      BetType: "Raise4BetCall",
      hands: []
    },
    {
      Street: "Preflop",
      BetType: "Raise4BetFold",
      hands: []
    },
    {
      Street: "Preflop",
      BetType: "RaiseCall",
      hands: []
    },
    {
      Street: "Preflop",
      BetType: "RaiseFold",
      hands: []
    },
    {
      Street: "Flop",
      BetType: "Valuebet",
      hands: []
    },
    {
      Street: "Flop",
      BetType: "Bluff",
      hands: []
    },
    {
      Street: "Flop",
      BetType: "CheckCall",
      hands: []
    },
    {
      Street: "Flop",
      BetType: "CheckFold",
      hands: []
    },
    {
      Street: "Turn",
      BetType: "Valuebet",
      hands: []
    },
    {
      Street: "Turn",
      BetType: "Bluff",
      hands: []
    },
    {
      Street: "Turn",
      BetType: "CheckCall",
      hands: []
    },
    {
      Street: "Turn",
      BetType: "CheckFold",
      hands: []
    },
    {
      Street: "River",
      BetType: "Valuebet",
      hands: []
    },
    {
      Street: "River",
      BetType: "Bluff",
      hands: []
    },
    {
      Street: "River",
      BetType: "CheckCall",
      hands: []
    },
    {
      Street: "River",
      BetType: "CheckFold",
      hands: []
    }
  ]
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
          initialState,
          draft.rangeRepo,
          draft.rangeSelectionArray,
          draft.ranges
        );
        draft.rangeSelectionArray = action.data;
        draft.ranges = loadNewRange(initialState, draft.rangeRepo, action.data);

        break;

      case INIT_ALL_USER_HAND_RANGES:
        draft.ranges = initialState.ranges;
        break;

      case ALL_USER_HAND_RANGES_SUCCESS:
        //Populate the range repository that holds all ranges from the DB
        draft.rangeRepo = [];
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

      default:
        break;
    }
  });
export default mainPageReducer;
export { initialState };
