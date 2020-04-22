import { call, put, all, takeLatest, cancelled } from "redux-saga/effects";
import qs from "qs";

import { GET_ALL_USER_HAND_RANGES, INIT_CREATE_NEW_FOLDER } from "./constants";
import { createNewFolderSuccess, createNewFolderFail } from "./actions";
import request from "../../utils/request";
import { INIT_REGISTER_USER } from "../Auth/constants";

/**
 * Get All Hand Ranges request/response handler
 */
export function* getAllHandRanges(params) {
  const requestUrl = `${process.env.REACT_APP_API_URL}/hand_ranges/user_id/1`;

  try {
    //yield call/put/cancelled APICALL
    const allRanges = yield call(request, requestUrl);
    console.log(allRanges);
  } catch (err) {
    //yield errorHandling
    console.log(err);
  }
}

/**
 * Register User request/response handler
 */
export function* registerUser(params) {
  console.log(params);

  const requestUrl = `${process.env.REACT_APP_API_URL}/hand_ranges/user_id/1`;

  const headers = {
    "Content-Type": "application/json"
  };

  const body = JSON.stringify({
    params: params.data
  });

  const requestParams = {
    body,
    headers,
    method: "POST"
  };

  try {
    //yield call/put/cancelled APICALL
    const allRanges = yield call(request, requestUrl, requestParams);
    console.log(allRanges);
  } catch (err) {
    //yield errorHandling
    console.log(err);
  }
}

/**
 * Create New Folder request/response handler
 */
export function* createNewFolder(params) {
  console.log(params);
  //FIXME: Hardcoded the user_id, folder_name, need to add those as parameters
  const requestUrl = `${process.env.REACT_APP_API_URL}/hand_ranges/`;

  const headers = {
    "Content-Type": "application/json"
  };

  const body = JSON.stringify({
    user_id: 2,
    folder_name: "Folder 3"
  });

  const requestParams = {
    body,
    headers,
    method: "POST"
  };

  try {
    //yield call/put/cancelled APICALL
    const allRanges = yield call(request, requestUrl, requestParams);
    yield put(createNewFolderSuccess(allRanges));
    console.log(allRanges);
  } catch (err) {
    yield put(createNewFolderFail(err));
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* handData() {
  yield all([takeLatest(GET_ALL_USER_HAND_RANGES, getAllHandRanges)]);
  yield all([takeLatest(INIT_REGISTER_USER, registerUser)]);
  yield all([takeLatest(INIT_CREATE_NEW_FOLDER, createNewFolder)]);
}
