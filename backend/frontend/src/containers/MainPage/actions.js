import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  INIT_ALL_USER_HAND_RANGES,
  SET_DEAD_CARDS,
  GET_DEAD_CARDS,
  SET_IS_IP,
  LOAD_EQUITIES,
  RESET_STATE,
  INIT_SAVE_SCENARIO,
  SAVE_SCENARIO_SUCCESS,
  SAVE_SCENARIO_FAILED,
  INIT_GET_SCENARIO,
  GET_SCENARIO_SUCCESS,
  GET_SCENARIO_FAIL,
  INIT_GET_ALL_SCENARIO,
  GET_ALL_SCENARIO_FAIL,
  GET_ALL_SCENARIO_SUCCESS,
  CHANGE_MODE_SUIT_SELECTED,
  CHANGE_USE_ONE_FLOP_BETSIZE
} from "./constants";

export function setHandRangeSelect(data) {
  return {
    type: SET_HAND_RANGE_SELECT,
    data
  };
}

export function setHandRange(data, cards) {
  return {
    type: SET_HAND_RANGE,
    data,
    cards
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

export function saveScenarioSuccess(data) {
  return {
    type: SAVE_SCENARIO_SUCCESS,
    data
  };
}
export function saveScenarioFail(data) {
  return {
    type: SAVE_SCENARIO_FAILED,
    data
  };
}
export function initGetScenario(data) {
  return {
    type: INIT_GET_SCENARIO,
    data
  };
}

export function getScenarioSuccess(data) {
  return {
    type: GET_SCENARIO_SUCCESS,
    data
  };
}
export function getScenarioFail(data) {
  return {
    type: GET_SCENARIO_FAIL,
    data
  };
}
export function initGetAllScenario(data) {
  return {
    type: INIT_GET_ALL_SCENARIO,
    data
  };
}
export function getAllScenarioSuccess(data) {
  return {
    type: GET_ALL_SCENARIO_SUCCESS,
    data
  };
}
export function getAllScenarioFail(data) {
  return {
    type: GET_ALL_SCENARIO_FAIL,
    data
  };
}
export function changeModeSuitSelection(data) {
  return {
    type: CHANGE_MODE_SUIT_SELECTED,
    data
  };
}

export function changeUseOneFlopBetsize(data) {
  return {
    type: CHANGE_USE_ONE_FLOP_BETSIZE,
    data
  };
}
