/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import {
  LOAD_MENU,
  LOAD_MENU_SUCCESS,
  LOAD_MENU_ERROR,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_REGIONS_SUCCESS,
  LOAD_REGIONS,
  LOAD_REGIONS_ERROR
} from "./constants";

// The initial state of the App
export const initialState = {
  loading: true,
  error: false,
  menus: {},
  categories: false,
  regions: { loading: true }
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MENU:
        draft.menus = { [action.slug]: {} };
        break;

      case LOAD_MENU_SUCCESS:
        draft.menus[action.menu.slug] = action.menu;
        break;

      case LOAD_MENU_ERROR:
        draft.error = action.error;
        break;

      case LOAD_CATEGORIES:
        draft.categories = false;
        break;

      case LOAD_CATEGORIES_SUCCESS:
        draft.categories = action.categories;
        break;

      case LOAD_CATEGORIES_ERROR:
        draft.error = action.error;
        break;

      case LOAD_REGIONS:
        draft.regions.loading = true;
        draft.regions.error = false;
        draft.regions.data = false;
        break;

      case LOAD_REGIONS_SUCCESS:
        draft.regions.data = action.regions;
        draft.regions.loading = false;
        break;

      case LOAD_REGIONS_ERROR:
        draft.regions.error = action.error;
        draft.regions.loading = false;
        break;
    }
  });

export default appReducer;
