import produce from "immer";

import { UPDATE_RANGE_COLORS } from "./constants.js";

export const initialState = {
  mode: {
    street: "",
    mode: ""
  },
  rangeColors: {
    green: [],
    blue: [],
    purple: [],
    red: []
  }
};

const boardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_RANGE_COLORS:
        break;
      default:
        break;
    }
  });

export default boardPageReducer;
