/*
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  CLEAR_ERROR_STATE,
  USER_SIGNOUT,
  USER_SIGNOUT_SUCCESS,
  USER_REQUESTED,
  USER_LOADED,
  AUTH_CHECK_STATE,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL
} from "./constants";

export function userSignin(user) {
  return {
    type: USER_SIGNIN,
    user
  };
}

export function userSigninSuccess(token) {
  return {
    type: USER_SIGNIN_SUCCESS,
    token
  };
}

export function userSigninFail(error) {
  return {
    type: USER_SIGNIN_FAIL,
    error
  };
}

export function requestUser() {
  return {
    type: USER_REQUESTED
  };
}

export function userLoaded(user) {
  return {
    type: USER_LOADED,
    user
  };
}

export function logout() {
  return {
    type: USER_SIGNOUT
  };
}

export function logoutSuccess() {
  return {
    type: USER_SIGNOUT_SUCCESS
  };
}

export function authCheckState() {
  return {
    type: AUTH_CHECK_STATE
  };
}

export function clearErrorState() {
  return {
    type: CLEAR_ERROR_STATE
  };
}

export function userSignup(user) {
  return {
    type: USER_SIGNUP,
    user
  };
}

export function userSignupSuccess(user) {
  return {
    type: USER_SIGNUP_SUCCESS,
    user
  };
}

export function userSignupFail(error) {
  return {
    type: USER_SIGNUP_FAIL,
    error
  };
}
