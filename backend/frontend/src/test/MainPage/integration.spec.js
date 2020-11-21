import React from "react";
import reducer, { initialState } from "../../containers/MainPage/reducer";
import * as types from "./../../containers/MainPage/constants";
import {
  initGetScenario,
  initGetAllScenario,
} from "../../containers/MainPage/actions";

import nock from "nock";
import httpResponseGetScenario from "./httpResponseGetScenario.json";
import httpResponseGetAllScenario from "./httpResponseGetAllScenario.json";
import Scenario from "./../../containers/MainPage/EngineClasses/Scenario";
import SagaTester from "redux-saga-tester";
import saga from "./../../containers/MainPage/saga";
import Enzyme, { mount } from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import ScenarioLoader from "./../../containers/MainPage/ScenarioLoader";
import { Provider } from "react-redux";
import configureStore from "./../../configureStore";

Enzyme.configure({ adapter: new ReactSixteenAdapter() });
// describe("Integration its: ", () => {
test.skip("The reducer when action GET_SCENARIO_SUCCESS should return the new state for the reducer", async () => {
  // nock('http://localhost:3000')
  // .post('/api/private/get-scenario')
  // .reply(200, httpResponseGetScenario)
  nock("https://www.poker-range-appalyzer.com")
    .post("/api/private/get-scenario")
    .reply(200, httpResponseGetScenario);
  let sagaiter = null;

  sagaiter = new SagaTester({ initialState, reducers: reducer });

  sagaiter.start(saga);

  const scenario = new Scenario({
    board: "AcTh4s",
    rangeRepoIP: initialState.rangeRepoIP,
    rangeRepoOOP: initialState.rangeRepoOOP,
    user: "Evan",
    ScenarioName: "it Scenario",
    OpenerPosition: "CO",
    DefenderPosition: "BU",
  });

  sagaiter.dispatch(initGetScenario({ scenario, token: "dummy" }));

  await sagaiter.waitFor(types.GET_SCENARIO_SUCCESS);

  const finalReducerValue = sagaiter.getState();

  // await sagaiter.waitFor(getScenarioSuccess());
  expect(finalReducerValue.rangeRepoIP[0].hands).to.deep.equal([
    "A7s",
    "A6s",
    "A5s",
    "A4s",
    "A3s",
    "A2s",
  ]);
  expect(finalReducerValue.ranges.length).to.equal(18);
});

test.skip("The reducer when action GET_ALL_SCENARIO_SUCCESS should return the new state for the reducer", async () => {
  nock("http://localhost:3000")
    .post("/api/private/get-all-scenario")
    .reply(200, httpResponseGetAllScenario);
  nock("https://www.poker-range-appalyzer.com")
    .post("/api/private/get-all-scenario")
    .reply(200, httpResponseGetAllScenario);
  let sagaiter = null;

  sagaiter = new SagaTester({ initialState, reducers: reducer });

  sagaiter.start(saga);

  const scenario = new Scenario({
    board: "AcTh4s",
    rangeRepoIP: initialState.rangeRepoIP,
    rangeRepoOOP: initialState.rangeRepoOOP,
    user: "Evan",
    ScenarioName: "it Scenario",
    OpenerPosition: "CO",
    DefenderPosition: "BU",
  });

  sagaiter.dispatch(initGetAllScenario({ scenario }));

  await sagaiter.waitFor(types.GET_ALL_SCENARIO_SUCCESS);

  const finalReducerValue = sagaiter.getState();

  expect(finalReducerValue.scenarioBoards).toStrictEqual([
    ["AcAsAh", "fdsaasdfasdfasdfasdf", "BU", "MP"],
    ["Jh4h2s", "875fancyflop", "BU", "MP"],
    ["AcTs", "asdf1234", "SB", "MP"],
    ["Ac", "asfdsdfasdfasdf", "SB", "UTG"],
  ]);
});

test.skip("a token gets passed to the saga correctly", () => {
  nock("https://www.poker-range-appalyzer.com")
    .post("/api/private/get-scenario")
    .reply(200, httpResponseGetScenario);
  const newInitialState = initialState;

  //Setup the state to have a number of Boards to load
  newInitialState.scenarioBoards.push(["Ac4c4h", "875fancyflop", "UTG", "MP"]);
  newInitialState.scenarioBoards.push([
    "Ac4c4h",
    "875fancyfUTGpped",
    "UTG",
    "MP",
  ]);
  newInitialState.scenarioBoards.push(["AcAsAh", "itFile", "UTG", "CO"]);

  //Create the ScenarioLoader with a state
  const store = configureStore(newInitialState, null);

  const navComponent = mount(
    <Provider store={store}>
      <ScenarioLoader active={true} onCloseModal={false} token="Bearer dummy" />
    </Provider>
  );

  //Click on the button to load a new scenario
  const clickButtonReturnValues = navComponent
    .find(".load-button")
    .get(0)
    .props.onClick();

  //Token is expected to be called "dummy"
  const tokenExpectedValue = clickButtonReturnValues.data.token;
  expect(tokenExpectedValue).to.equal("Bearer dummy");
});

// });
