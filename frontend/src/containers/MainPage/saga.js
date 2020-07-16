import { call, put, all, takeLatest, cancelled } from "redux-saga/effects";
import qs from "qs";

import { INIT_ALL_USER_HAND_RANGES, INIT_CREATE_NEW_FOLDER } from "./constants";
import { allUserHandRangesSuccess, allUserHandRangesFail } from "./actions";
import request from "../../utils/request";
import { INIT_REGISTER_USER } from "../Auth/constants";

let baseURL;

if (process.env.NODE_ENV !== "production")
  baseURL = `${process.env.REACT_APP_API_URL}`;
else baseURL = `${process.env.REACT_APP_PRODUCTION_API_URL}`;

/**
 * Root saga manages watcher lifecycle
 */
export default function* handData() {}
