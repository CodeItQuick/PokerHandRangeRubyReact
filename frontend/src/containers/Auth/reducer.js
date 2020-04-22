import produce from "immer";
import {
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  CLEAR_ERROR_STATE,
  USER_LOADED,
  USER_SIGNOUT_SUCCESS,
  INIT_REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL
} from "./constants";

export const initialState = {
  loading: false,
  error: { invalid: false, message: null },
  params: {},
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

      case INIT_REGISTER_USER:
        draft.loading = true;
        draft.params = action.user;
        break;

      case REGISTER_USER_SUCCESS:
        draft.loading = false;
        break;

      case REGISTER_USER_FAIL:
        draft.loading = false;
        draft.error.invalid = true;
        draft.error.message = action.error;
        break;
    }
  });

export default authReducer;
