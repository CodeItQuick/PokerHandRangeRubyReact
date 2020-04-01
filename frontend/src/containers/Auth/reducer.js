import produce from "immer";
import {
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  CLEAR_ERROR_STATE,
  USER_LOADED,
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNUP_FAIL
} from "./constants";

export const initialState = {
  loading: false,
  error: { invalid: false, message: null },
  data: false,
  token: null
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_SIGNIN:
        draft.loading = true;
        draft.data = false;
        draft.token = null;
        draft.error.invalid = false;
        draft.error.message = null;
        break;

      case USER_SIGNIN_SUCCESS:
        draft.loading = false;
        draft.token = action.token;
        break;

      case USER_LOADED:
        draft.data = action.user;
        break;

      case USER_SIGNIN_FAIL:
        draft.loading = false;
        draft.error.invalid = true;
        draft.error.message = action.error;
        break;

      case CLEAR_ERROR_STATE:
        draft.error.invalid = false;
        draft.error.message = null;
        break;

      case USER_SIGNOUT_SUCCESS:
        draft.data = false;
        draft.token = null;
        break;

      case USER_SIGNUP:
        draft.loading = true;
        break;

      case USER_SIGNUP_SUCCESS:
        draft.loading = false;
        break;

      case USER_SIGNUP_FAIL:
        draft.loading = false;
        draft.error.invalid = true;
        draft.error.message = action.error;
        break;
    }
  });

export default authReducer;
