import { call, put, all, takeLatest, fork } from "redux-saga/effects";

import {
  INIT_SAVE_SCENARIO,
  INIT_GET_SCENARIO,
  INIT_GET_ALL_SCENARIO,
  START_CONVERSATION,
  START_CONNECT_CHAT,
} from "./constants";
import {
  getScenarioSuccess,
  getScenarioFail,
  getAllScenarioSuccess,
  startConversationSuccess,
  newChatSessionObject,
  newChatSessionFn,
} from "./actions";
import request from "../../utils/request";
import { ChatSessionObject } from "amazon-connect-chatjs";
// import "./amazon-connect-chat-interface.js";

const baseURL = "https://www.poker-range-appalyzer.com";

/**
 * Get All Hand Ranges request/response handler
 */
export function* saveScenario({
  data: {
    deadcards,
    rangeRepoIP,
    rangeRepoOOP,
    user,
    OpenerPosition,
    DefenderPosition,
    Filename,
    token,
  },
}) {
  const requestUrl = `${baseURL}/api/private/insert`;

  if (!token) return;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const body = {
    deadcards,
    rangeRepoIP,
    rangeRepoOOP,
    user,
    positionOpener: OpenerPosition,
    positionDefender: DefenderPosition,
    Filename,
  };

  const requestParams = {
    body: JSON.stringify(body),
    headers,
    method: "POST",
    credentials: "include",
  };

  try {
    yield call(request, requestUrl, requestParams);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Get All Hand Ranges request/response handler
 */
export function* getScenario({ data: { scenario, token } }) {
  const requestUrl = `${baseURL}/api/private/get-scenario`;

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = {
      boardcards: scenario.displayDeadcards(),
    };

    const requestParams = {
      body: JSON.stringify(body),
      headers,
      method: "POST",
      credentials: "include",
    };

    //yield call/put/cancelled APICALL
    const response = yield call(request, requestUrl, requestParams);

    yield put(getScenarioSuccess(response));
    // yield put(allUserHandRangesSuccess(allRanges));
  } catch (err) {
    console.log(err);
    yield put(getScenarioFail(err));

    //yield errorHandling
    // yield put(allUserHandRangesFail(err));
  }
}

/**
 * Get All Hand Ranges request/response handler
 */
export function* getAllScenario({ data: token }) {
  const requestUrl = `${baseURL}/api/private/get-all-scenario`;

  if (!token) return;

  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestParams = {
      headers,
      method: "POST",
      credentials: "include",
    };

    //yield call/put/cancelled APICALL
    const response = yield call(request, requestUrl, requestParams);
    yield put(getAllScenarioSuccess(response));
  } catch (err) {
    console.log(err);
    // yield put(getScenarioFail(err));

    //yield errorHandling
    // yield put(allUserHandRangesFail(err));
  }
}

/**
 * Get All Hand Ranges request/response handler
 */
export function* communicateMessage({ data }) {
  const requestUrl = `https://3uj83kbjaf.execute-api.us-east-1.amazonaws.com/prod/api`;
  console.log(data); //?
  // if (!token) return;
  try {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // Authorization: `Bearer ${token}`,
    };

    const requestParams = {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    };

    const response = yield call(request, requestUrl, requestParams); //?

    yield put(
      startConversationSuccess({
        ...response,
        recentIntent: data.currentIntent,
        inputTranscript: data.inputTranscript,
      })
    );
  } catch (err) {
    console.log(err);
    // yield put(getScenarioFail(err));

    //yield errorHandling
    // yield put(allUserHandRangesFail(err));
  }
}

export function* startConnectChat() {
  // AmazonConnect.connect.ChatSession.setGlobalConfig({
  //   region: "us-east-1"
  // });
  const contactFlowId = "5e786b39-f6d8-40c9-a51b-8803feb89f8f";
  const instanceId = "3f117463-2a78-40c0-b0aa-cb1f90fae9a2";
  const requestUrl =
    "https://yk940tr4lj.execute-api.us-east-1.amazonaws.com/Prod/"; // TODO: Fill in

  const initiateChatRequest = {
    ParticipantDetails: {
      DisplayName: "Superman",
    },
    ContactFlowId: contactFlowId,
    InstanceId: instanceId,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const requestParams = {
    headers,
    method: "POST",
    body: JSON.stringify(initiateChatRequest),
  };

  try {
    const response = yield call(request, requestUrl, requestParams); //?
    console.log(response);

    const chatDetails = {
      ContactId: response.data.startChatResult.ContactId, //required: *yes*. The alphanumeric string id identifying this contact.
      ParticipantId: response.data.startChatResult.ParticipantId, //required: *yes*. The alphanumeric string id identifying this participant.
      ParticipantToken: response.data.startChatResult.ParticipantToken, //required: *yes*. The alphanumeric token that allows us to fetch our auth token for AWS SDK Chat API calls
    };

    const options = {
      region: "us-east-1", //required: no. Represents the region (like "us-west-2", "eu-central-1", etc) for the AWS SDK client to use.
    };

    const args = {
      chatDetails: chatDetails, //required: *yes*
      type: window.connect.ChatSession.SessionTypes.CUSTOMER, //required: *yes*. Two types of sessionType:
      //window.connect.ChatSession.SessionTypes.CUSTOMER
      //window.connect.ChatSession.SessionTypes.AGENT
      options: options, //required: no. See below for example
      // "websocketManager": WebSocketManager //required: no, only for AGENT type chat sessions. This comes from Streams
    };

    //This is the object returned by a successful call to the StartChatContact API.
    //From the agent-side, these fields should all be available via Streams.

    // let ChatSessionCreated = window.connect.ChatSession.create(args);
    // ChatSessionCreated.connect().then(stuff => console.log(stuff)).catch(response => console.log(response));
    // console.log(ChatSessionCreated);

    //return the ChatSessionCreatedObject for more functionality
    yield put(newChatSessionFn(args));
  } catch (err) {
    console.log("Error! ", err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* handData() {
  yield all([
    takeLatest(INIT_SAVE_SCENARIO, saveScenario),
    takeLatest(INIT_GET_SCENARIO, getScenario),
    takeLatest(INIT_GET_ALL_SCENARIO, getAllScenario),
    takeLatest(START_CONVERSATION, communicateMessage),
    takeLatest(START_CONNECT_CHAT, startConnectChat),
  ]);
}
