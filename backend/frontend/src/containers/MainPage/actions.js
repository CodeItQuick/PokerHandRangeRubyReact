import {
  SET_HAND_RANGE,
  SET_HAND_RANGE_SELECT,
  SET_DEAD_CARDS,
  INIT_SAVE_SCENARIO,
  INIT_GET_ALL_SCENARIO,
  GET_ALL_SCENARIO_SUCCESS,
  INIT_GET_SCENARIO,
  GET_SCENARIO_SUCCESS,
  CHANGE_MODE_SUIT_SELECTION,
} from "./constants";

export function initSetHandRangeSelect(data) {
  return {
    type: SET_HAND_RANGE_SELECT,
    data,
  };
}
export function setHandRangeSelect({ name, value }, state) {
  return {
    ...state,
    mode: {
      suitSelection: state?.mode?.suitSelection || [],
      isIP: state?.mode?.isIP || true,
      useTwoFlopSizes: state?.mode?.useTwoFlopSizes || false,
      street: name || "Preflop",
      streetAction: value,
    },
    loadEquities: false,
  };
}

export function initSetHandRange(data, state) {
  return {
    type: SET_HAND_RANGE,
    data,
  };
}
export function setHandRange(ranges, state) {
  return {
    ...state,
    ranges: [...ranges],
  };
}

export function initSetDeadCards(data) {
  return {
    type: SET_DEAD_CARDS,
    data,
  };
}

export function setDeadCards(data, state) {
  if (data.length > 4) {
    return {
      ...state,
      deadcards: data,
      mode: {
        isIP: state?.mode?.isIP,
        suitSelection: state?.mode?.suitSelection,
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes,
        street: "River",
        streetAction: "Valuebet",
      },
    };
  } else if (data.length > 3) {
    return {
      ...state,
      deadcards: data,
      mode: {
        isIP: state?.mode?.isIP,
        suitSelection: state?.mode?.suitSelection,
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes,
        street: "Turn",
        streetAction: "Valuebet",
      },
    };
  } else if (data.length > 2) {
    return {
      ...state,
      deadcards: data,
      mode: {
        isIP: state?.mode?.isIP,
        suitSelection: state?.mode?.suitSelection,
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes,
        street: "Flop",
        streetAction: "Valuebet",
      },
    };
  } else {
    return {
      ...state,
      deadcards: data,
      mode: {
        isIP: state?.mode?.isIP,
        suitSelection: state?.mode?.suitSelection,
        useTwoFlopSizes: state?.mode?.useTwoFlopSizes,
        street: "Preflop",
        streetAction: "Raise4BetCall",
      },
    };
  }
}

export function getScenarioSuccess(data) {
  return {
    type: GET_SCENARIO_SUCCESS,
    data,
  };
}

export const transformHandRange = (data, repoType) =>
  data
    .filter(({ HandName }) => HandName === repoType)
    .map(({ BetType, Street, PokerHands }) => ({
      Street,
      BetType,
      hands: PokerHands.length === 0 ? [] : PokerHands.split(", "),
    }));

export const assignDeadcards = (board) => {
  if (board.length > 4 * 2)
    return [
      board.substr(0, 2),
      board.substr(2, 2),
      board.substr(4, 2),
      board.substr(6, 2),
      board.substr(8, 2),
    ];
  else if (board.length > 3 * 2)
    return [
      board.substr(0, 2),
      board.substr(2, 2),
      board.substr(4, 2),
      board.substr(6, 2),
    ];
  else if (board.length > 2 * 2)
    return [board.substr(0, 2), board.substr(2, 2), board.substr(4, 2)];
  else if (board.length > 1 * 2)
    return [board.substr(0, 2), board.substr(2, 2)];
  else if (board.length > 0 * 2) return [board.substr(0, 2)];
  else return [];
};

export function getScenarioSuccessProcess(data, state) {
  data = Object.keys(data).map((copy) => data[copy]);
  return {
    ...state,
    rangeRepoIP: transformHandRange(data, "rangeRepoIP"),
    rangeRepoOOP: transformHandRange(data, "rangeRepoOOP"),
    deadcards: assignDeadcards(data[0]?.Board),
    mode: {
      ...state.mode,
      street: "Flop",
      streetAction: "Valuebet",
      isIP: true,
    },
    ranges: transformHandRange(data, "rangeRepoIP"),
  };
}

export function getScenarioFail(data, state) {
  return {
    ...state,
    data,
  };
}
export function getAllScenarioSuccess(data) {
  return {
    type: GET_ALL_SCENARIO_SUCCESS,
    data,
  };
}
export function getAllScenarioSuccessProcess(action, state) {
  return {
    ...state,
    scenarioBoards: action,
  };
}

export function initSaveScenario(data) {
  return {
    type: INIT_SAVE_SCENARIO,
    data,
  };
}

export function initGetScenario(data) {
  return {
    type: INIT_GET_SCENARIO,
    data,
  };
}

export function initGetAllScenario(data, state) {
  return {
    type: INIT_GET_ALL_SCENARIO,
    data,
  };
}

export function getAllScenarioFail(data, state) {
  return {
    ...state,
    data,
  };
}

export function changeModeSuitSelection(data) {
  return {
    type: CHANGE_MODE_SUIT_SELECTION,
    data,
  };
}

export function changeModeSuitSelectionSuccess(mode, action, state) {
  if (mode.suitSelection.indexOf(action.data) >= 0) {
    return {
      ...state,
      mode: {
        ...state.mode,
        suitSelection: mode.suitSelection.filter(
          (cardsSuit) => cardsSuit !== action.data
        ),
      },
    };
  } else {
    return {
      ...state,
      mode: {
        ...state.mode,
        suitSelection: [...mode.suitSelection, action.data],
      },
    };
  }
}

export function changeUseOneFlopBetsize(data, state) {
  return {
    ...state,
    mode: {
      useTwoFlopSizes: data,
    },
  };
}
