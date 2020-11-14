import { call, put, all, takeLatest } from "redux-saga/effects";

import {
  INIT_SAVE_SCENARIO,
  INIT_GET_SCENARIO,
  INIT_GET_ALL_SCENARIO,
} from "./constants";
import {
  getScenarioSuccess,
  getScenarioFail,
  getAllScenarioSuccess,
} from "./actions";
import request from "../../utils/request";

/**
 * Get All Hand Ranges request/response handler
 */
export function* saveScenario({
  data: {
    deadcards,
    rangeRepoIP,
    rangeRepoOOP,
    user,
    OpenerPosition,
    DefenderPosition,
    Filename,
    token,
  },
}) {
  const requestUrl = `https://www.poker-range-appalyzer.com/api/private/insert`;

  if (!token) return;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const body = {
    deadcards,
    rangeRepoIP,
    rangeRepoOOP,
    user,
    positionOpener: OpenerPosition,
    positionDefender: DefenderPosition,
    Filename,
  };

  const requestParams = {
    body: JSON.stringify(body),
    headers,
    method: "POST",
  };

  try {
    yield call(request, requestUrl, requestParams);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Get All Hand Ranges request/response handler
 */
export function* getScenario({ data: { scenario, token } }) {
  const requestUrl = `https://www.poker-range-appalyzer.com/api/private/get-scenario`;

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = {
      boardcards: scenario.displayDeadcards(),
    };

    const requestParams = {
      body: JSON.stringify(body),
      headers,
      method: "POST",
    };

    //yield call/put/cancelled APICALL
    const response = yield call(request, requestUrl, requestParams);

    yield put(getScenarioSuccess(response));
    // yield put(allUserHandRangesSuccess(allRanges));
  } catch (err) {
    console.log(err);
    yield put(getScenarioFail(err));

    //yield errorHandling
    // yield put(allUserHandRangesFail(err));
  }
}

/**
 * Get All Hand Ranges request/response handler
 */
export function* getAllScenario({ data: token }) {
  const requestUrl = `https://www.poker-range-appalyzer.com/api/private/get-all-scenario`;

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestParams = {
      headers,
      method: "POST",
    };

    //yield call/put/cancelled APICALL
    const response = yield call(request, requestUrl, requestParams);
    yield put(getAllScenarioSuccess(response));
  } catch (err) {
    console.log(err);
    // yield put(getScenarioFail(err));

    //yield errorHandling
    // yield put(allUserHandRangesFail(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* handData() {
  yield all([
    takeLatest(INIT_SAVE_SCENARIO, saveScenario),
    takeLatest(INIT_GET_SCENARIO, getScenario),
    takeLatest(INIT_GET_ALL_SCENARIO, getAllScenario),
  ]);
}
