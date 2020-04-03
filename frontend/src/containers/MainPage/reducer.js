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
  SET_HAND_RANGE_VALUES
} from "./constants.js";

export const initialStates = {
  mode: {
    street: "",
    streetAction: ""
  },
  ranges: {
    Preflop: {
      disabled: false,
      action: "Raise4betCall",
      Raise4betCall: {
        color: "green",
        active: "red",
        prHandString: []
      },
      Raise4betFold: {
        color: "blue",
        active: false,
        prHandString: []
      },
      RaiseCall: {
        color: "purple",
        active: false,
        prHandString: []
      },
      RaiseFold: {
        color: "red",
        active: false,
        prHandString: []
      }
    },
    Flop: {
      disabled: true,
      valuebet: {
        color: "green",
        prHandString: []
      },
      bluff: {
        color: "blue",
        prHandString: []
      },
      checkCall: {
        color: "purple",
        prHandString: []
      },
      checkFold: {
        color: "red",
        prHandString: []
      }
    },
    Turn: {
      disabled: true,
      valuebet: {
        color: "green",
        prHandString: []
      },
      bluff: {
        color: "blue",
        prHandString: []
      },
      checkCall: {
        color: "purple",
        prHandString: []
      },
      checkFold: {
        color: "red",
        prHandString: []
      }
    },
    River: {
      disabled: true,
      valuebet: {
        color: "green",
        prHandString: []
      },
      bluff: {
        color: "blue",
        prHandString: []
      },
      checkCall: {
        color: "purple",
        prHandString: []
      },
      checkFold: {
        color: "red",
        prHandString: []
      }
    }
  }
};

const globalReducer = (state = initialStates, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_HAND_RANGE_SELECT:
        console.log(action);
        draft.mode.street = action.data.name;
        draft.mode.streetAction = action.data.value;
        break;
      case SET_HAND_RANGE_VALUES:
        if (
          draft.ranges.Preflop.Raise4betCall.prHandString.indexOf(
            action.data.name
          ) >= 0
        )
          draft.ranges[[draft.mode.street]][
            [draft.mode.streetAction]
          ].prHandString.pop(action.data.name);
        else
          draft.ranges[[draft.mode.street]][
            [draft.mode.streetAction]
          ].prHandString.push(action.data.name);
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

export default globalReducer;
