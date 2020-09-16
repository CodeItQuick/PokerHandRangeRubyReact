import {
	SET_HAND_RANGE,
	SET_HAND_RANGE_SELECT,
	INIT_ALL_USER_HAND_RANGES,
	SET_DEAD_CARDS,
	GET_DEAD_CARDS,
	SET_IS_IP,
	LOAD_EQUITIES,
	RESET_STATE,
  INIT_SAVE_SCENARIO,
  MAIN_SET_IS_IP,
} from './constants';
import { mapNewHandRange } from './stateRangeFunctions';

export function initMainSetIsIP(data) {
  return {
    type: MAIN_SET_IS_IP,
    data
  }
}

export function mainSetIsIP({newRangeIP, newRangeOOP, newRanges}, state) {
  return {
      ...state,
      rangeRepoOOP: newRangeOOP,
      rangeRepoIP: newRangeIP,
      ranges: newRanges
		}
};

export function initSetHandRangeSelect(data) {
  return {
    type: SET_HAND_RANGE_SELECT,
    data
  }
}
export function setHandRangeSelect({ name, value }, state) {
	return {
		...state,
		mode: {
			suitSelection: state?.mode?.suitSelection || [],
			isIP: state?.mode?.isIP || true,
			useTwoFlopSizes: state?.mode?.useTwoFlopSizes || false,
			street: name || 'Preflop',
			streetAction: value
		},
		loadEquities: false
	};
}

export function initSetHandRange(data) {
  return {
    type: SET_HAND_RANGE,
    data
  }
}
export function setHandRange(ranges, state) {
  return {
		...state,
    	ranges: [...ranges]
	};
}

export function initSetDeadCards(data) {
  return {
    type: SET_DEAD_CARDS,
    data
  }
}

export function setDeadCards(data, state) {
	if (data.length > 4) {
		return {
      ...state,
      deadcards: data,
			mode: {
        isIP: state?.mode?.isIP || true,
        suitSelection: state?.mode?.suitSelection || [],
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes || false,
				street: 'River',
				streetAction: 'Valuebet'
			}
		};
	} else if (data.length > 3) {
		return {
      ...state,
      deadcards: data,
			mode: {
        isIP: state?.mode?.isIP || true,
        suitSelection: state?.mode?.suitSelection || [],
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes || false,
				street: 'Turn',
				streetAction: 'Valuebet'
			}
		};
	} else if (data.length > 2) {
		return {
      ...state,
      deadcards: data,
			mode: {
        isIP: state?.mode?.isIP || true,
        suitSelection: state?.mode?.suitSelection || [],
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes || false,
				street: 'Flop',
				streetAction: 'Valuebet'
			}
		};
	} else {
		return {
      ...state,
      deadcards: data,
			mode: {
        isIP: state?.mode?.isIP || true,
        suitSelection: state?.mode?.suitSelection || [],
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes || false,
				street: 'Preflop',
				streetAction: 'Raise4BetCall'
			}
		};
	}
}

export function getScenarioSuccess(data, state) {
	return {
    ...state,
		rangeRepoIP: data.results[0].t.rangeRepo[0],
		rangeRepoOOP: data.results[0].t.rangeRepo[1],
		deadcards: data.results[0].t.board.split(','),
		mode: {
			isIP: true
		},
		ranges: data.results[0].t.rangeRepo[0]
	};
}

export function getScenarioFail(data, state) {
	return {
    ...state,
		data
	};
}

export function getAllScenarioSuccess(action, state) {
	return {
    ...state,
		scenarioBoards: action.data.map(({ t: { board } }) => board)
	};
}

export function initSaveScenario(data) {
	return {
    type: INIT_SAVE_SCENARIO,
		data
	};
}

export function saveScenarioSuccess(data, state) {
	return {
    ...state,
		data
	};
}
export function initGetScenario(data, state) {
	return {
    ...state,
		data
	};
}

export function initGetAllScenario(data, state) {
	return {
    ...state,
		data
	};
}

export function getAllScenarioFail(data, state) {
	return {
    ...state,
		data
	};
}

export function changeModeSuitSelection(mode, action, state) {
	if (mode.suitSelection.indexOf(action.data) >= 0) {
		return {
      		...state,
			mode: {
				suitSelection: mode.suitSelection.filter((cardsSuit) => cardsSuit !== action.data)
			}
		};
	} else {
		return {
      		...state,
			mode: {
				suitSelection: [ ...mode.suitSelection, action.data ]
			}
		};
	}
}

export function changeUseOneFlopBetsize(data, state) {
	return {
    ...state,
		mode: {
			useTwoFlopSizes: data
		}
	};
}
