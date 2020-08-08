import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import Scenario from "../../../src/containers/MainPage/ScenarioLoader/Scenario";
import Scenarios from "../../../src/containers/MainPage/ScenarioLoader/Scenarios";
import ScenarioComponent from "../../../src/containers/MainPage/ScenarioLoader/scenarioComponent";

describe("ScenarioLoader", () => {
  test("the scenario object can be instantiated", () => {
    let scenario = new Scenario("AcTd5s3s2s");

    expect(scenario).toBeDefined();
  });

  test("the scenario object returns valid objects", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    expect(scenario.displayScenario()).toStrictEqual("AcTd5s3s2s");
  });

  test("the scenarios object can be instantiated", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([]);

    expect(scenarios).toBeDefined();
  });

  test("the scenarios object can display a scenario component", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([scenario]);

    expect(scenarios.displayScenarios()).toStrictEqual([
      <div>
        <ScenarioComponent scenario={scenario} />
      </div>,
    ]);
  });

  test("the scenarios object can display multiple scenario component", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario1 = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);
    const scenario2 = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([scenario1, scenario2]);

    expect(scenarios.displayScenarios()).toStrictEqual([
      <div>
        <ScenarioComponent scenario={scenario1} />
      </div>,
      <div>
        <ScenarioComponent scenario={scenario2} />
      </div>,
    ]);
  });
});
