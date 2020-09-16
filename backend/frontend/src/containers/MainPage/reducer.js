import {
	SET_HAND_RANGE,
	SET_DEAD_CARDS,
	GET_SCENARIO_SUCCESS,
	GET_ALL_SCENARIO_SUCCESS,
	CHANGE_MODE_SUIT_SELECTED,
	CHANGE_USE_ONE_FLOP_BETSIZE,
	MAIN_SET_IS_IP
} from './constants.js';

import { sampleData, ranges } from './sampleData.js';
import {
	setHandRange,
	getScenarioSuccess,
	getAllScenarioSuccess,
	changeModeSuitSelection,
	changeUseOneFlopBetsize,
	setDeadCards,
	mainSetIsIP
} from './actions.js';

import { currentRangesReducer } from './CurrentRanges/reducer';
import progressIndicatorReducer from './ProgressIndicator/reducer.js';

const initialState = {
	mode: sampleData.mode,
	rangeSelectionArray: sampleData.rangeSelectionArray,
	rangeColors: sampleData.rangeColors,
	rangeRepoIP: sampleData.rangeRepoIP,
	rangeRepoOOP: sampleData.rangeRepoOOP,
	ranges: ranges,
	deadcards: [],
	loadEquities: false,
	handEquities: [ {}, {} ],
	scenarioBoards: []
};

//TODO: Make ranges convert between easy to read ranges
export const mainPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_HAND_RANGE: //?
			console.log(action);
			return setHandRange(action.data, state);

		case SET_DEAD_CARDS:
			return setDeadCards(action.data, state);

		case GET_SCENARIO_SUCCESS:
			return getScenarioSuccess(action.data);

		case GET_ALL_SCENARIO_SUCCESS:
			return getAllScenarioSuccess(action);

		case CHANGE_MODE_SUIT_SELECTED:
			return changeModeSuitSelection(state.mode, action);

		case CHANGE_USE_ONE_FLOP_BETSIZE:
			return changeUseOneFlopBetsize(action.data);

		case MAIN_SET_IS_IP:
			return mainSetIsIP(action.data, state);

		default:
			return state;
	}
};
const combined = (functionOne, functionTwo, functionThree) => (state, action) =>
	functionOne(functionTwo(functionThree(state, action), action), action);

const combine = combined(mainPageReducer, currentRangesReducer, progressIndicatorReducer);
export default combine;
export { initialState };
