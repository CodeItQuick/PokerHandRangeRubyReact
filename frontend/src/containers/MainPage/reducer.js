import produce from "immer";

import {
  GET_HAND_RANGE,
  SET_HAND_RANGE,
  SET_HAND_RANGE_FOLDER,
  SET_HAND_RANGE_GROUP,
  GET_HAND_RANGE_FOLDER,
  CREATE_HAND_RANGE_FOLDER,
  EDIT_HAND_RANGE_FOLDER,
  SET_HAND_RANGE_SELECT
} from "./constants.js";

export const initialState = {
  globalHands: {
    mode: {
      street: "",
      streetAction: ""
    },
    ranges: {
      Preflop: {
        disabled: false,
        Raise4betCall: {
          color: "green",
          active: "red"
        },
        Raise4betFold: {
          color: "blue",
          active: false
        },
        RaiseCall: {
          color: "purple",
          active: false
        },
        RaiseFold: {
          color: "red",
          active: false
        }
      },
      Flop: {
        disabled: true,
        valuebet: {
          color: "green"
        },
        bluff: {
          color: "blue"
        },
        checkCall: {
          color: "purple"
        },
        checkFold: {
          color: "red"
        }
      },
      Turn: {
        disabled: true,
        valuebet: {
          color: "green"
        },
        bluff: {
          color: "blue"
        },
        checkCall: {
          color: "purple"
        },
        checkFold: {
          color: "red"
        }
      },
      River: {
        disabled: true,
        valuebet: {
          color: "green"
        },
        bluff: {
          color: "blue"
        },
        checkCall: {
          color: "purple"
        },
        checkFold: {
          color: "red"
        }
      }
    }
  }
};

const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_HAND_RANGE_SELECT:
        draft.globalHands.mode.street = action.data.name;
        draft.globalHands.mode.streetAction = action.data.value;
        break;
      case GET_HAND_RANGE:
        draft.mode[[action.data.name]] = action.data.value; //sets the range street and values.
        break;
      case SET_HAND_RANGE:
        break;
      case SET_HAND_RANGE_FOLDER:
        break;
      case SET_HAND_RANGE_GROUP:
        break;
      case GET_HAND_RANGE_FOLDER:
        break;
      case CREATE_HAND_RANGE_FOLDER:
        break;
      case EDIT_HAND_RANGE_FOLDER:
        break;

      default:
        break;
    }
  });

export default mainPageReducer;
