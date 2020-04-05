import produce from "immer";

import {
  GET_HAND_RANGE,
  SET_HAND_RANGE,
  SET_HAND_RANGE_FOLDER,
  SET_HAND_RANGE_GROUP,
  GET_HAND_RANGE_FOLDER,
  CREATE_HAND_RANGE_FOLDER,
  EDIT_HAND_RANGE_FOLDER,
  SET_HAND_RANGE_SELECT,
  SET_CLASS_COLOR
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
          active: "red",
          prHandString: [],
          colorCard: "green card-button"
        },
        Raise4betFold: {
          color: "blue",
          active: false,
          prHandString: [],
          colorCard: "blue card-button"
        },
        RaiseCall: {
          color: "purple",
          active: false,
          prHandString: [],
          colorCard: "purple card-button"
        },
        RaiseFold: {
          color: "red",
          active: false,
          prHandString: [],
          colorCard: "red card-button"
        }
      },
      Flop: {
        disabled: true,
        valuebet: {
          color: "green",
          prHandString: [],
          colorCard: "green card-button"
        },
        bluff: {
          color: "blue",
          prHandString: [],
          colorCard: "blue card-button"
        },
        checkCall: {
          color: "purple",
          prHandString: [],
          colorCard: "purple card-button"
        },
        checkFold: {
          color: "red",
          prHandString: [],
          colorCard: "red card-button"
        }
      },
      Turn: {
        disabled: true,
        valuebet: {
          color: "green",
          prHandString: [],
          colorCard: "green card-button"
        },
        bluff: {
          color: "blue",
          prHandString: [],
          colorCard: "blue card-button"
        },
        checkCall: {
          color: "purple",
          prHandString: [],
          colorCard: "purple card-button"
        },
        checkFold: {
          color: "red",
          prHandString: [],
          colorCard: "red card-button"
        }
      },
      River: {
        disabled: true,
        valuebet: {
          color: "green",
          prHandString: [],
          colorCard: "green card-button"
        },
        bluff: {
          color: "blue",
          prHandString: [],
          colorCard: "blue card-button"
        },
        checkCall: {
          color: "purple",
          prHandString: [],
          colorCard: "purple card-button"
        },
        checkFold: {
          color: "red",
          prHandString: [],
          colorCard: "red card-button"
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
        console.log(action.data);
        draft.globalHands.ranges[[draft.globalHands.mode.street]][
          [draft.globalHands.mode.streetAction]
        ].prHandString.push(action.data.name);
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
