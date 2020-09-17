import { SET_IS_IP } from './constants';
import { setIsIP } from './action';
import { initialState } from '../reducer';
const progressIndicatorReducer = function(state = initialState, action) {
	switch (action.type) {
		case SET_IS_IP:
			return setIsIP(action.data, state);
		default:
			return state;
	}
};

export default progressIndicatorReducer;
