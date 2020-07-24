import { call, put, all, takeLatest, cancelled } from "redux-saga/effects";
import qs from "qs";

import { INIT_SAVE_SCENARIO } from "./constants";
import { allUserHandRangesSuccess, allUserHandRangesFail } from "./actions";
import request from "../../utils/request";

let baseURL;

if (process.env.NODE_ENV !== "production")
  baseURL = `${process.env.REACT_APP_API_URL}`;
else baseURL = `${process.env.REACT_APP_PRODUCTION_API_URL}`;

/**
 * Get All Hand Ranges request/response handler
 */
export function* saveScenario(data) {
  const requestUrl = `${baseURL}/api/public`;

  const headers = {
    "Content-Type": "application/json",
    Bearer: localStorage.getItem("Bearer")
  };

  const body = JSON.stringify({
    params: data
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
    // yield put(allUserHandRangesSuccess(allRanges));
  } catch (err) {
    //yield errorHandling
    // yield put(allUserHandRangesFail(err));
  }
}

/**
 * Register User request/response handler
 */
export function* registerUser(params) {
  const requestUrl = `${baseURL}/api/private`;

  const headers = {
    "Content-Type": "application/json",
    Bearer: localStorage.getItem("Bearer")
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
  } catch (err) {
    //yield errorHandling
    console.log(err);
  }
}

// /**
//  * Create New Folder request/response handler
//  */
// export function* createNewFolder(params) {
//   //FIXME: Hardcoded the user_id, folder_name, need to add those as parameters
//   const requestUrl = `${baseURL}/hand_ranges/`;

//   const headers = {
//     "Content-Type": "application/json",
//   };

//   const body = JSON.stringify({
//     user_id: 2,
//     folder_name: "Folder 3",
//   });

//   const requestParams = {
//     body,
//     headers,
//     method: "POST",
//   };

//   try {
//     //yield call/put/cancelled APICALL
//     const allRanges = yield call(request, requestUrl, requestParams);
//     yield put(createNewFolderSuccess(allRanges));
//   } catch (err) {
//     yield put(createNewFolderFail(err));
//   }
// }

/**
 * Root saga manages watcher lifecycle
 */
export default function* handData() {
  yield all([takeLatest(INIT_SAVE_SCENARIO, saveScenario)]);
}
