import { SET_IS_IP } from './constants';

export const setIsIP = ({ position, newRangeOOP, newRangeIP, newRanges }, state) => {
	return {
		...state,
		mode: {
			...state.mode,
			isIP: position
		},
		rangeRepoOOP: newRangeOOP,
		rangeRepoIP: newRangeIP,
		ranges: newRanges
	};
};

export const initIsIP = (data) => {
	return {
		type: SET_IS_IP,
		data
	};
};
