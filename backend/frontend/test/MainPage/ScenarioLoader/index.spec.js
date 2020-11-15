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
import { Table } from "semantic-ui-react";

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

  test("the scenarios object can display a scenario component", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([scenario]);

    expect(scenarios.displayScenarios()).toEqual(
      <Table as="table">
        <Table.Header as="thead">
          <Table.Row as="tr" cellAs="td">
            <Table.HeaderCell as="th">Scenario Name</Table.HeaderCell>
            <Table.HeaderCell as="th">Opener Position</Table.HeaderCell>
            <Table.HeaderCell as="th">Defending Position</Table.HeaderCell>
            <Table.HeaderCell as="th">Board</Table.HeaderCell>
            <Table.HeaderCell as="th" />
          </Table.Row>
        </Table.Header>
        <Table.Body as="tbody">
          <ScenarioComponent 
            scenario={
              {"DefenderPosition": undefined, "OpenerPosition": undefined, 
              "ScenarioName": undefined, "deadcards": undefined, "rangeRepoIP": undefined, 
              "rangeRepoOOP": undefined, "user": "evan"}} 
              token={undefined} 
          />
        </Table.Body>
      </Table>
    );
  });

  test("the scenarios object can display multiple scenario component", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario1 = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);
    const scenario2 = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([scenario1, scenario2]);

    expect(scenarios.renderScenario({position: 'UTG'})).toEqual(
      <Table as="table">
        <Table.Header as="thead">
          <Table.Row as="tr" cellAs="td">
            <Table.HeaderCell as="th">Scenario Name</Table.HeaderCell>
            <Table.HeaderCell as="th">Opener Position</Table.HeaderCell>
            <Table.HeaderCell as="th">Defending Position</Table.HeaderCell>
            <Table.HeaderCell as="th">Board</Table.HeaderCell>
            <Table.HeaderCell as="th" />
          </Table.Row>
        </Table.Header>
        <Table.Body as="tbody">
          <ScenarioComponent scenario={{"DefenderPosition": undefined, "OpenerPosition": undefined, "ScenarioName": undefined, "deadcards": undefined, "rangeRepoIP": undefined, "rangeRepoOOP": undefined, "user": "evan"}} token={undefined} />
          <ScenarioComponent scenario={{"DefenderPosition": undefined, "OpenerPosition": undefined, "ScenarioName": undefined, "deadcards": undefined, "rangeRepoIP": undefined, "rangeRepoOOP": undefined, "user": "evan"}} token={undefined} />
        </Table.Body>
      </Table>,
    );
  });
});
