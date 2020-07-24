import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  INIT_ALL_USER_HAND_RANGES,
  SET_DEAD_CARDS,
  GET_DEAD_CARDS,
  SET_IS_IP,
  LOAD_EQUITIES,
  RESET_STATE,
  INIT_SAVE_SCENARIO
} from "./constants";

export function setHandRangeSelect(data) {
  return {
    type: SET_HAND_RANGE_SELECT,
    data
  };
}

export function setHandRange(data) {
  return {
    type: SET_HAND_RANGE,
    data
  };
}

export function initAllUserHandRanges() {
  return {
    type: INIT_ALL_USER_HAND_RANGES
  };
}

export function setDeadCards(data) {
  return {
    type: SET_DEAD_CARDS,
    data
  };
}

export function setIsIP(data) {
  return {
    type: SET_IS_IP,
    data
  };
}

export function loadEquities() {
  return {
    type: LOAD_EQUITIES
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}

export function initSaveScenario(data) {
  return {
    type: INIT_SAVE_SCENARIO,
    data
  };
}

//TODO: Implement this
// export function loadEquitiesSuccess(data) {
//   return {
//     type: LOAD_EQUITIES_SUCCESS,
//     data,
//   };
// }
