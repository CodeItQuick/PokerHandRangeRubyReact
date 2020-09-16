/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';
import globalReducer, { initialState } from './containers/MainPage/reducer';
import progressIndicatorReducer from './containers/MainPage/ProgressIndicator/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
	const rootReducer = combineReducers({
		global: globalReducer,
		router: connectRouter(history),
		mode: progressIndicatorReducer,
		...injectedReducers
	});

	return rootReducer;
} //?
