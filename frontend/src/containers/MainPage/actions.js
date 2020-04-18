import {
  SET_HAND_RANGE,
  GET_HAND_RANGE,
  SET_HAND_RANGE_FOLDER,
  CREATE_HAND_RANGE_FOLDER,
  SET_HAND_RANGE_GROUP,
  EDIT_HAND_RANGE_FOLDER,
  SET_HAND_RANGE_SELECT
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
