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
// hooks/UseDataApi.js
import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:3001/";

const useRequest1 = ({ requestURL, getOrPost }) => {
  // This is just for demo purposes, you probably want to separate the data from loading state and potentially add other states such as failures, etc..

  try {
    let response = yield(fetch(url + requestURL, getOrPost));
  } catch (e) {
    console.log(e);
    //yield(put());
  }
};

export default useRequest1;
