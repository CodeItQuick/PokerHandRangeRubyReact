/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_MENU = "pokerRangeAppalyzer/App/LOAD_MENU";
export const LOAD_MENU_SUCCESS = "pokerRangeAppalyzer/App/LOAD_MENU_SUCCESS";
export const LOAD_MENU_ERROR = "pokerRangeAppalyzer/App/LOAD_MENU_ERROR";

export const LOAD_CATEGORIES = "pokerRangeAppalyzer/App/LOAD_CATEGORIES";
export const LOAD_CATEGORIES_SUCCESS =
  "pokerRangeAppalyzer/App/LOAD_CATEGORIES_SUCCESS";
export const LOAD_CATEGORIES_ERROR =
  "pokerRangeAppalyzer/App/LOAD_CATEGORIES_ERROR";

export const LOAD_REGIONS = "pokerRangeAppalyzer/App/LOAD_REGIONS";
export const LOAD_REGIONS_SUCCESS =
  "pokerRangeAppalyzer/App/LOAD_REGIONS_SUCCESS";
export const LOAD_REGIONS_ERROR = "pokerRangeAppalyzer/App/LOAD_REGIONS_ERROR";
