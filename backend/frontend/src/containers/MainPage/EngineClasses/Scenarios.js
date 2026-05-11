import React from "react";
import { Tab, Table } from "semantic-ui-react";
import Scenario from "./Scenario";
import ScenarioComponent from "../ScenarioLoader/scenarioComponent";

export class Scenarios {
  constructor(scenarios) {
    this.scenarios = scenarios;
    this.position = "UTG";
  }

  injectToken(token) {
    this.token = token;
    return this;
  }

  getOpenerPosition() {
    return this.position;
  }

  getPageCountForPosition(position) {
    return (
      Math.floor(
        this.scenarios.filter(
          (scenario, idx) => scenario.getOpenerPosition() === position
        ).length / 10
      ) + 1
    );
  }

  getScenariosForPage({ activePage }) {
    const availableScenarios = this.scenarios
      .filter((scenario, idx) => scenario.getOpenerPosition() === this.position)
      .filter((_, idx) => idx < activePage * 10 && idx >= activePage * 10 - 10);
    const scenarioPage = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ].map(
      (_, idx) =>
        availableScenarios[idx] ||
        new Scenario({
          board: "",
          DefenderPosition: "",
          OpenerPosition: "",
          ScenarioName: "",
        })
    );
    return scenarioPage;
  }
  scenarioCountsByPosition() {
    return ["UTG", "MP", "CO", "BU", "SB"].map(
      (position) =>
        this.scenarios.filter(
          (scenario) => scenario.getOpenerPosition() === position
        ).length
    );
  }

  scenarioCountForPosition() {
    return this.scenarios.filter(
      (scenario) => scenario.getOpenerPosition() === this.position
    ).length;
  }
}
