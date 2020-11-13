import React from "react";
import { Table } from "semantic-ui-react";
import ScenarioComponent from "./scenarioComponent";

class Scenarios {
  constructor(scenarioArray) {
    this.scenarios = scenarioArray;
  }

  displayScenarios(token) {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Scenario Name</Table.HeaderCell>
            <Table.HeaderCell>Opener Position</Table.HeaderCell>
            <Table.HeaderCell>Defending Position</Table.HeaderCell>
            <Table.HeaderCell>Board</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.scenarios.length === 1 ? (
            <ScenarioComponent scenario={this.scenarios[0]} token={token} />
          ) : (
            this.scenarios.map((scenario) => (
              <ScenarioComponent scenario={scenario} token={token} />
            ))
          )}
        </Table.Body>
      </Table>
    );
  }
}

export default Scenarios;
