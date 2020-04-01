import { call, put, all, takeLatest, cancelled } from "redux-saga/effects";
import qs from "qs";

import { CONSTANTS } from "./constants";
import { theseAreActions } from "./actions";

/**
 * Listing Category request/response handler
 */
export function* generatorFunction(params) {
  try {
    //yield call/put/cancelled APICALL
  } catch (err) {
    //yield errorHandling
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* listingData() {
  yield all([takeLatest(CONSTANT, generatorFunction)]);
}
