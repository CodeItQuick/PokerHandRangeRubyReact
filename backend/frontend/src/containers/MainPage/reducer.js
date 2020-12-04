import {
  SET_HAND_RANGE,
  SET_DEAD_CARDS,
  GET_SCENARIO_SUCCESS,
  GET_ALL_SCENARIO_SUCCESS,
  CHANGE_MODE_SUIT_SELECTION,
  START_CONVERSATION_SUCCESS,
  CHAT_SESSION_FN,
  EMPTY_CHAT_SESSION_FN,
  START_CONVERSATION_FAIL,
  RESET_ERROR,
} from "./constants.js";

import { sampleData, ranges } from "./sampleData.js";
import {
  setHandRange,
  setDeadCards,
  getAllScenarioSuccessProcess,
  getScenarioSuccessProcess,
  changeModeSuitSelectionSuccess,
  storeConversationSuccess,
  storeConversationFail,
  storeChatSessionObject,
  emptyChatSession,
} from "./actions.js";

import { currentRangesReducer } from "./CurrentRanges/reducer";
import progressIndicatorReducer from "./ProgressIndicator/reducer.js";

const initialState = {
  mode: sampleData.mode,
  rangeSelectionArray: sampleData.rangeSelectionArray,
  rangeColors: sampleData.rangeColors,
  rangeRepoIP: sampleData.rangeRepoIP,
  rangeRepoOOP: sampleData.rangeRepoOOP,
  ranges: ranges,
  deadcards: [],
  loadEquities: false,
  handEquities: [{}, {}],
  scenarioBoards: [],
  helpChat: sampleData.helpChat,
  chatSessionFn: false,
  err: false,
};

//TODO: Make ranges convert between easy to read ranges
export const mainPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HAND_RANGE: //?
      return setHandRange(action.data, state);

    case SET_DEAD_CARDS:
      return setDeadCards(action.data, state);

    case GET_SCENARIO_SUCCESS:
      return getScenarioSuccessProcess(action.data, state);

    case GET_ALL_SCENARIO_SUCCESS:
      return getAllScenarioSuccessProcess(action.data, state);

    case CHANGE_MODE_SUIT_SELECTION:
      return changeModeSuitSelectionSuccess(state.mode, action, state);

    case START_CONVERSATION_SUCCESS:
      return storeConversationSuccess(action.data, state);

    case START_CONVERSATION_FAIL:
      return storeConversationFail(state);

    case RESET_ERROR:
      return { ...state, err: false };

    case CHAT_SESSION_FN:
      return storeChatSessionObject(action.chatSessionFn, state);

    case EMPTY_CHAT_SESSION_FN:
      return emptyChatSession(state);

    default:
      return state;
  }
};
const combined = (functionOne, functionTwo, functionThree) => (state, action) =>
  functionOne(functionTwo(functionThree(state, action), action), action);

const combine = combined(
  mainPageReducer,
  progressIndicatorReducer,
  currentRangesReducer
);
export default combine;
export { initialState };
