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
  SET_CLASS_COLOR,
  SET_HAND_RANGE_VALUES
} from "./constants.js";

const initialState = {
  mode: {
    street: "",
    streetAction: ""
  },
  rangeColors: {
    green: [],
    blue: [],
    purple: [],
    red: []
  },
  ranges: {
    Preflop: {
      disabled: false,
      Raise4BetCall: {
        color: "green",
        active: "red",
        prHandString: [],
        colorCard: "green card-button"
      },
      Raise4BetFold: {
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
      Valuebet: {
        color: "green",
        prHandString: [],
        colorCard: "green card-button"
      },
      Bluff: {
        color: "blue",
        prHandString: [],
        colorCard: "blue card-button"
      },
      CheckCall: {
        color: "purple",
        prHandString: [],
        colorCard: "purple card-button"
      },
      CheckFold: {
        color: "red",
        prHandString: [],
        colorCard: "red card-button"
      }
    },
    Turn: {
      disabled: true,
      Valuebet: {
        color: "green",
        prHandString: [],
        colorCard: "green card-button"
      },
      Bluff: {
        color: "blue",
        prHandString: [],
        colorCard: "blue card-button"
      },
      CheckCall: {
        color: "purple",
        prHandString: [],
        colorCard: "purple card-button"
      },
      CheckFold: {
        color: "red",
        prHandString: [],
        colorCard: "red card-button"
      }
    },
    River: {
      disabled: true,
      Valuebet: {
        color: "green",
        prHandString: [],
        colorCard: "green card-button"
      },
      Bluff: {
        color: "blue",
        prHandString: [],
        colorCard: "blue card-button"
      },
      CheckCall: {
        color: "purple",
        prHandString: [],
        colorCard: "purple card-button"
      },
      CheckFold: {
        color: "red",
        prHandString: [],
        colorCard: "red card-button"
      }
    }
  }
};
const orderedCard = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2"
];

const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_HAND_RANGE_SELECT:
        console.log(action);

        if (draft.mode.street != action.data.name) {
          draft.rangeColors = {
            green: [],
            blue: [],
            purple: [],
            red: []
          }; //reset range colors for new range
          let newRangeColors = {};
          Object.keys(draft.ranges[[action.data.name]]).forEach(
            streetAction => {
              console.log(streetAction);
              newRangeColors = {
                ...newRangeColors,
                [draft.ranges[[action.data.name]][streetAction].color]:
                  draft.ranges[[action.data.name]][streetAction].prHandString
              };
            }
          );
          draft.rangeColors = newRangeColors;
        }
        draft.mode.street = action.data.name;
        draft.mode.streetAction = action.data.value;
        break;
      case SET_HAND_RANGE:
        const rangesIndex = draft.ranges[[draft.mode.street]][
          [draft.mode.streetAction]
        ].prHandString.indexOf(action.data.cards);

        if (rangesIndex >= 0)
          draft.ranges[[draft.mode.street]][
            [draft.mode.streetAction]
          ].prHandString.splice(rangesIndex, 1);
        else
          draft.ranges[[draft.mode.street]][
            [draft.mode.streetAction]
          ].prHandString.push(action.data.cards);

        const colorIndex = draft.rangeColors[
          [draft.ranges[[draft.mode.street]][[draft.mode.streetAction]].color]
        ].indexOf(action.data.cards);

        if (colorIndex >= 0)
          draft.rangeColors[
            [draft.ranges[[draft.mode.street]][[draft.mode.streetAction]].color]
          ].splice(colorIndex, 1);
        else
          draft.rangeColors[
            [draft.ranges[[draft.mode.street]][[draft.mode.streetAction]].color]
          ].push(action.data.cards);

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
export { initialState };
