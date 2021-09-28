import React from "react";
import Enzyme, { shallow } from "enzyme";

import { initialState } from "./../../../containers/MainPage/reducer";
import Scenario from "./../../../containers/MainPage/EngineClasses/Scenario";
import { Scenarios } from "./../../../containers/MainPage/EngineClasses/Scenarios";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import ScenariosComponent from "./../../../containers/MainPage/ScenarioLoader/ScenariosComponent";
import { expect } from "chai";

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe("ScenarioLoader", () => {
  it("the scenario object can be instantiated", () => {
    let scenario = new Scenario("AcTd5s3s2s");

    expect(scenario).to.be.instanceOf(Scenario);
  });

  it("the scenario object returns valid objects", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({
      board: "AcTd5s3s2s",
      rangeRepoIP,
      rangeRepoOOP,
    });

    expect(scenario.displayDeadcards()).to.deep.equal("AcTd5s3s2s");
  });

  it("the scenario object returns valid defender positions", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({
      board: "AcTd4h",
      rangeRepoIP,
      rangeRepoOOP,
      user: "Evan",
      ScenarioName: "First Scenario",
      OpenerPosition: "MP",
      DefenderPosition: "SB",
    });

    expect(scenario.displayDefenderPosition()).to.deep.equal("SB");
  });

  it("the scenario object returns valid opener positions", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({
      board: "AcTd4h",
      rangeRepoIP,
      rangeRepoOOP,
      user: "Evan",
      ScenarioName: "First Scenario",
      OpenerPosition: "MP",
      DefenderPosition: "SB",
    });
    expect(scenario.displayOpenerPosition()).to.deep.equal("MP");
  });
  it("the scenario object returns valid scenario name", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario({
      board: "AcTd4h",
      rangeRepoIP,
      rangeRepoOOP,
      user: "Evan",
      ScenarioName: "First Scenario",
      OpenerPosition: "MP",
      DefenderPosition: "SB",
    });
    expect(scenario.displayScenarioName()).to.deep.equal("First Scenario");
  });
  it("the scenarios object can be instantiated", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;

    const scenarios = new Scenarios([]);

    expect(scenarios).to.be.instanceOf(Scenarios);
  });

  it("the scenarios object can render when given a scenario component", () => {
    const rangeRepoOOP = initialState.rangeRepoOOP;
    const rangeRepoIP = initialState.rangeRepoIP;
    const scenario = new Scenario("AcTd5s3s2s", rangeRepoIP, rangeRepoOOP);

    const scenarios = new Scenarios([scenario]);

    expect(
      shallow(<ScenariosComponent position={"UTG"} scenarios={scenarios} />)
        .length
    ).to.equal(1);
  });

  it("the scenarios object can render when given multiple scenario component", () => {
    const scenario1 = new Scenario("AcTd5s3s2s", "Scenario 1", "UTG", "SB");
    const scenario2 = new Scenario("AcTd5s3s2s", "Scenario 2", "UTG", "MP");

    const scenarios = new Scenarios([scenario1, scenario2]);

    expect(
      shallow(<ScenariosComponent position={"UTG"} scenarios={scenarios} />)
        .length
    ).to.equal(1);
  });
});
