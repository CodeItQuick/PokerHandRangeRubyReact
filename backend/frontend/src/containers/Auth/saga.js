import { call, put, takeLatest, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import qs from "qs";

import request from "../../utils/request";
import {
  USER_SIGNIN,
  USER_REQUESTED,
  AUTH_CHECK_STATE,
  USER_SIGNOUT,
  USER_SIGNUP,
  INIT_REGISTER_USER
} from "./constants.js";
import {
  userSigninSuccess,
  userSigninFail,
  requestUser,
  logout,
  userLoaded,
  logoutSuccess,
  userSignupSuccess,
  userSignupFail,
  userSignin
} from "./actions";

let baseURL;

if (process.env.NODE_ENV !== "production")
  baseURL = `${process.env.REACT_APP_API_URL}`;
else baseURL = `${process.env.REACT_APP_PRODUCTION_API_URL}`;

const stripHtmlTags = str => {
  if (str === null || str === "") return false;
  str = str.toString();
  return str.replace(/<[^>]*>/g, "");
};

export function* logoutSaga() {
  yield call([localStorage, "removeItem"], "token");
  yield put(logoutSuccess());
  yield put(push("/"));
}

export function* authStateSaga({ userid }) {
  console.log(userid);
  const requestURL = `${baseURL}/users/${userid}`;
  const headers = {};
  const token = yield localStorage.getItem("token");

  if (!token) {
    yield put(logout());
  } else {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, { headers });
    yield put(userLoaded(response));
  } catch (err) {
    yield put(logout());
  }
}

export function* userSigninSaga({ user: { name, password } }) {
  const headers = {
    "Content-Type": "application/json"
  };
  const body = JSON.stringify({
    name,
    password
  });

  const requestParams = {
    body,
    headers,
    method: "POST"
  };

  const requestURL = `${baseURL}/login`;

  try {
    const response = yield call(request, requestURL, requestParams);
    const { user, token } = response;
    console.log(user);
    yield localStorage.setItem("token", token);
    yield put(requestUser(user.id));
    yield put(userSigninSuccess(token));
  } catch (error) {
    try {
      const err = yield error.response.json();
      if (
        err &&
        (err.code === "invalid_email" ||
          err.code === "incorrect_password" ||
          err.code === "invalid_username")
      ) {
        yield put(userSigninFail("Wrong username or password."));
      } else {
        const message = yield stripHtmlTags(err.message);
        yield put(userSigninFail(message));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export function* userSignupSaga({ user }) {
  const params = qs.stringify(user);
  const requestURL = `${baseURL}/users?${params}`;

  try {
    let response = yield call(request, requestURL, { method: "POST" });
    console.log(response);
    yield put(userSignin(user));
    yield put(userSigninSuccess(response));
  } catch (error) {
    try {
      const err = yield error.response.json();
      yield put(userSignupFail(err.message));
    } catch (e) {
      console.log(e);
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userRoot() {
  yield all([
    takeLatest(USER_SIGNIN, userSigninSaga),
    takeLatest(USER_REQUESTED, authStateSaga),
    takeLatest(AUTH_CHECK_STATE, authStateSaga),
    takeLatest(USER_SIGNOUT, logoutSaga),
    takeLatest(INIT_REGISTER_USER, userSignupSaga)
  ]);
}
