import React from "react";
import ScenarioComponent from "./scenarioComponent";

class Scenarios {
  constructor(scenarioArray) {
    this.scenarios = scenarioArray;
  }

  displayScenarios(token) {
    return this.scenarios.map(scenario => (
      <div>
        <ScenarioComponent scenario={scenario} token={token} />
      </div>
    ));
  }
}

export default Scenarios;
