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

export const LOAD_MENU = "airsells/App/LOAD_MENU";
export const LOAD_MENU_SUCCESS = "airsells/App/LOAD_MENU_SUCCESS";
export const LOAD_MENU_ERROR = "airsells/App/LOAD_MENU_ERROR";

export const LOAD_CATEGORIES = "airsells/App/LOAD_CATEGORIES";
export const LOAD_CATEGORIES_SUCCESS = "airsells/App/LOAD_CATEGORIES_SUCCESS";
export const LOAD_CATEGORIES_ERROR = "airsells/App/LOAD_CATEGORIES_ERROR";

export const LOAD_REGIONS = "airsells/App/LOAD_REGIONS";
export const LOAD_REGIONS_SUCCESS = "airsells/App/LOAD_REGIONS_SUCCESS";
export const LOAD_REGIONS_ERROR = "airsells/App/LOAD_REGIONS_ERROR";
