import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  INIT_ALL_USER_HAND_RANGES,
  ALL_USER_HAND_RANGES_SUCCESS,
  ALL_USER_HAND_RANGES_FAIL,
  INIT_CREATE_NEW_FOLDER,
  CREATE_NEW_FOLDER_SUCCESS,
  CREATE_NEW_FOLDER_FAIL,
  SET_HAND_RANGE_GROUP,
  SET_DYNAMIC_FOLDER_INFO,
  SAVE_AND_LOAD,
  LOAD_NEW_FOLDER,
  SET_DEAD_CARDS,
  GET_DEAD_CARDS,
  SET_IS_IP,
  LOAD_EQUITIES,
  LOAD_EQUITIES_SUCCESS
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

//TODO: Implement this
// export function loadEquitiesSuccess(data) {
//   return {
//     type: LOAD_EQUITIES_SUCCESS,
//     data,
//   };
// }
