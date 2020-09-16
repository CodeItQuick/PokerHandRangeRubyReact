import { SET_HAND_RANGE_SELECT } from './constants';

import { sampleData, ranges } from '../sampleData.js';
import { setHandRangeSelect } from './actions.js';
import { initialState } from '../reducer';
import mainPageReducer from '../reducer';

//TODO: Make ranges convert between easy to read ranges
export const currentRangesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_HAND_RANGE_SELECT:
			console.log(state);
			return setHandRangeSelect(action.data, state);

		default:
			return state;
	}
};

export default currentRangesReducer;
export { initialState };
