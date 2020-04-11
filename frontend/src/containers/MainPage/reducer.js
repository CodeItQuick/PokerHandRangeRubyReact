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

let getCards = (cardOne, cardTwo) => {
  let card1 = "",
    card2 = "";
  if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
    card1 = cardOne;
    card2 = cardTwo;
  } else if (cardOne === cardTwo) {
    card1 = cardOne;
    card2 = cardTwo;
  } else {
    card1 = cardTwo;
    card2 = cardOne;
  }
  return card1 + card2;
};
const displayCardSuit = (cardOne, cardTwo) => {
  let displaySuit = "";
  if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
    displaySuit = "s";
  } else if (cardOne === cardTwo) {
    displaySuit = "";
  } else {
    displaySuit = "o";
  }
  return displaySuit;
};
const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_HAND_RANGE_SELECT:
        console.log(draft);

        if (draft.mode.street != action.data.name) {
          draft.rangeColors = {
            green: [],
            blue: [],
            purple: [],
            red: []
          }; //reset range colors for new range
          let newRangeColors = {};
          draft.ranges[[action.data.name]].map(streetAction => {
            newRangeColors = {
              [streetAction.color]: [...streetAction.prHandString]
            };
          });
        }
        draft.mode.street = action.data.name;
        draft.mode.streetAction = action.data.value;
        break;
      case SET_HAND_RANGE:
        console.log(action);

        draft.ranges[[draft.mode.street]][
          [draft.mode.streetAction]
        ].prHandString.push(action.data.cards);
        draft.rangeColors[
          [draft.ranges[[draft.mode.street]][[draft.mode.streetAction]].color]
        ].push(action.data.cards);
        draft.rangeColors.green.push(action.data.cards);
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
