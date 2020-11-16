import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import Scenario from "../../../src/containers/MainPage/ScenarioLoader/Scenario";
import Scenarios from "../../../src/containers/MainPage/ScenarioLoader/Scenarios";
import ScenariosIndex from "../../../src/containers/MainPage/ScenarioLoader";
import ScenarioComponent from "../../../src/containers/MainPage/ScenarioLoader/scenarioComponent";
import { Table } from "semantic-ui-react";
import ReactSixteenAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new ReactSixteenAdapter() })

describe("ScenarioLoader", () => {
  test("the scenario object can be instantiated", () => {
    let scenario = new Scenario("AcTd5s3s2s");

    expect(scenario).toBeDefined();
  });

  test("the scenario object returns valid objects", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({board: "AcTd5s3s2s", rangeRepoIP, rangeRepoOOP});

    expect(scenario.displayDeadcards()).toStrictEqual("AcTd5s3s2s");
  });
  
  test("the scenario object returns valid defender positions", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({
      board: "AcTd4h",
      rangeRepoIP,
      rangeRepoOOP,
      user: "Evan",
      ScenarioName: "First Scenario",
      OpenerPosition: "MP",
      DefenderPosition: "SB"
    });

    expect(scenario.displayDefenderPosition()).toStrictEqual("SB");
  });
  
  test("the scenario object returns valid opener positions", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({
      board: "AcTd4h",
      rangeRepoIP,
      rangeRepoOOP,
      user: "Evan",
      ScenarioName: "First Scenario",
      OpenerPosition: "MP",
      DefenderPosition: "SB"
    });
    expect(scenario.displayOpenerPosition()).toStrictEqual("MP");
  });
  test("the scenario object returns valid scenario name", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({
      board: "AcTd4h",
      rangeRepoIP,
      rangeRepoOOP,
      user: "Evan",
      ScenarioName: "First Scenario",
      OpenerPosition: "MP",
      DefenderPosition: "SB"
    });
    expect(scenario.displayScenarioName()).toStrictEqual("First Scenario");
  });
  test("the scenarios object can be instantiated", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([]);

    expect(scenarios).toBeDefined();
  });

  test("the scenarios object can render when given a scenario component", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([scenario]);

    expect(shallow(scenarios.renderScenario({position: 'UTG'})).length).toBe(1);
  });

  test("the scenarios object can render when given multiple scenario component", () => {
    const scenario1 = new Scenario("AcTd5s3s2s", "Scenario 1", "UTG", "SB");
    const scenario2 = new Scenario("AcTd5s3s2s", "Scenario 2", "UTG", "MP");

    const scenarios = new Scenarios([scenario1, scenario2]);

    expect(shallow(scenarios.renderScenario({position: 'UTG'})).length).toBe(1);
  });
});
