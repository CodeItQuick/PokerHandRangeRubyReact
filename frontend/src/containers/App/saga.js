import { call, put, takeLatest, all } from "redux-saga/effects";
import request from "utils/request";
import { SEARCH_REQUEST } from "containers/ListingsPage/constants";
import { getListingsSaga } from "containers/ListingsPage/saga";
import { LOAD_MENU, LOAD_CATEGORIES, LOAD_REGIONS } from "./constants";
import {
  menuLoaded,
  menuLoadingError,
  categoriesLoaded,
  categoriesLoadingError,
  regionsLoaded,
  regionsLoadingError
} from "./actions";

/**
 * Menu request/response handler
 */
export function* getMenu({ slug }) {
  const requestURL = `${process.env.REACT_APP_AIRSELLS_URL}/wp-json/menus/v1/menus/${slug}`;

  try {
    // Call our request helper (see 'utils/request')
    const menu = yield call(request, requestURL);
    yield put(menuLoaded(menu));
  } catch (err) {
    yield put(menuLoadingError(err));
  }
}

/**
 * Listing Categories request/response handler
 */
export function* getCategories() {
  const requestURL = `${process.env.REACT_APP_AIRSELLS_URL}/wp-json/wp/v2/listing_category?per_page=50`;

  try {
    // Call our request helper (see 'utils/request')
    const categories = yield call(request, requestURL);
    yield put(categoriesLoaded(categories));
  } catch (err) {
    yield put(categoriesLoadingError(err));
  }
}

/**
 * Regions request/response handler
 */
export function* getRegions() {
  const requestURL = `${process.env.REACT_APP_AIRSELLS_URL}/wp-json/wp/v2/region`;

  try {
    // Call our request helper (see 'utils/request')
    const regions = yield call(request, requestURL);
    yield put(regionsLoaded(regions));
  } catch (err) {
    yield put(regionsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LOAD_MENU, getMenu),
    takeLatest(LOAD_CATEGORIES, getCategories),
    takeLatest(LOAD_REGIONS, getRegions),
    takeLatest(SEARCH_REQUEST, getListingsSaga)
  ]);
}
