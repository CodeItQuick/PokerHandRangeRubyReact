import React from "react";
import { Tab, Table } from "semantic-ui-react";
import Scenario from "./Scenario";
import ScenarioComponent from "../ScenarioLoader/scenarioComponent";

export class Scenarios {
  constructor(scenarioArray) {
    this.scenarios = scenarioArray;
    this.position = "UTG";
  }

  injectToken(token) {
    this.token = token;
    return this;
  }

  displayOpenerPosition() {
    return this.position;
  }

  displayScenarioArrayLength(position) {
    return (
      Math.floor(
        this.scenarios.filter(
          (scenario, idx) => scenario.displayOpenerPosition() === position
        ).length / 10
      ) + 1
    );
  }

  filteredScenarios({ activePage }) {
    const availableScenarios = this.scenarios
      .filter(
        (scenario, idx) => scenario.displayOpenerPosition() === this.position
      )
      .filter((_, idx) => idx < activePage * 10 && idx >= activePage * 10 - 10);
    const fill10ElementArray = [
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
    return fill10ElementArray;
  }
  filteredScenariosArray() {
    return ["UTG", "MP", "CO", "BU", "SB"].map(
      (position) =>
        this.scenarios.filter(
          (scenario) => scenario.displayOpenerPosition() === position
        ).length
    );
  }

  filteredScenariosPosition() {
    return this.scenarios.filter(
      (scenario) => scenario.displayOpenerPosition() === this.position
    ).length;
  }
}
