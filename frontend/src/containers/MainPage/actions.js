import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  GET_ALL_USER_HAND_RANGES,
  INIT_CREATE_NEW_FOLDER,
  CREATE_NEW_FOLDER_SUCCESS,
  CREATE_NEW_FOLDER_FAIL
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

export function getAllUserHandRanges(data) {
  return {
    type: GET_ALL_USER_HAND_RANGES,
    data
  };
}

export function initCreateNewFolder(data) {
  return {
    type: INIT_CREATE_NEW_FOLDER,
    data
  };
}

export function createNewFolderSuccess(data) {
  return {
    type: CREATE_NEW_FOLDER_SUCCESS,
    data
  };
}

export function createNewFolderFail(data) {
  return {
    type: CREATE_NEW_FOLDER_FAIL,
    data
  };
}
