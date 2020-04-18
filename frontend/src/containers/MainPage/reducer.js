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
    street: "Preflop",
    streetAction: "Raise4BetCall"
  },
  rangeColors: {
    "#8BDDBE": [],
    "#ED87A7": [],
    "#6B6C7C": [],
    "#D3D3D3": []
  },
  ranges: {
    Preflop: {
      disabled: false,
      Raise4BetCall: {
        color: "#8BDDBE",
        active: "red",
        prHandString: [],
        colorCard: "#D3D3D3 card-button"
      },
      Raise4BetFold: {
        color: "#ED87A7",
        active: false,
        prHandString: [],
        colorCard: "#6B6C7C card-button"
      },
      RaiseCall: {
        color: "#6B6C7C",
        active: false,
        prHandString: [],
        colorCard: "#ED87A7 card-button"
      },
      RaiseFold: {
        color: "#D3D3D3",
        active: false,
        prHandString: [],
        colorCard: "#8BDDBE card-button"
      }
    },
    Flop: {
      disabled: true,
      Valuebet: {
        color: "#8BDDBE",
        prHandString: [],
        colorCard: "#D3D3D3 card-button"
      },
      Bluff: {
        color: "#ED87A7",
        prHandString: [],
        colorCard: "#6B6C7C card-button"
      },
      CheckCall: {
        color: "#6B6C7C",
        prHandString: [],
        colorCard: "#ED87A7 card-button"
      },
      CheckFold: {
        color: "#D3D3D3",
        prHandString: [],
        colorCard: "#8BDDBE card-button"
      }
    },
    Turn: {
      disabled: true,
      Valuebet: {
        color: "#8BDDBE",
        prHandString: [],
        colorCard: "#D3D3D3 card-button"
      },
      Bluff: {
        color: "#ED87A7",
        prHandString: [],
        colorCard: "#6B6C7C card-button"
      },
      CheckCall: {
        color: "#6B6C7C",
        prHandString: [],
        colorCard: "#ED87A7 card-button"
      },
      CheckFold: {
        color: "#D3D3D3",
        prHandString: [],
        colorCard: "#8BDDBE card-button"
      }
    },
    River: {
      disabled: true,
      Valuebet: {
        color: "#8BDDBE",
        prHandString: [],
        colorCard: "#D3D3D3 card-button"
      },
      Bluff: {
        color: "#ED87A7",
        prHandString: [],
        colorCard: "#6B6C7C card-button"
      },
      CheckCall: {
        color: "#6B6C7C",
        prHandString: [],
        colorCard: "#ED87A7 card-button"
      },
      CheckFold: {
        color: "#D3D3D3",
        prHandString: [],
        colorCard: "#8BDDBE card-button"
      }
    }
  }
};

const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_HAND_RANGE_SELECT:
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
        let rangesIndex = -1;
        if (
          draft.ranges[[draft.mode.street]][[draft.mode.streetAction]] !==
          undefined
        )
          rangesIndex = draft.ranges[[draft.mode.street]][
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

      default:
        break;
    }
  });
export default mainPageReducer;
export { initialState };
