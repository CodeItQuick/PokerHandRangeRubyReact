import { SET_HAND_RANGE_SELECT } from "./constants";


const initSetHandRangeSelect = (data) => {
  return {
    type: SET_HAND_RANGE_SELECT,
    data
  }
}
export { initSetHandRangeSelect } 
export function setHandRangeSelect({ name, value }, state) {
	return {
		...state,
		mode: {
			suitSelection: state?.mode?.suitSelection || [],
			isIP: state.mode.isIP,
			useTwoFlopSizes: state?.mode?.useTwoFlopSizes || false,
			street: name || 'Preflop',
			streetAction: value
		},
		loadEquities: false
	};
}