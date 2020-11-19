import React from "react";
import { Table } from "semantic-ui-react";
import ScenarioComponent from "./scenarioComponent";

const ScenariosComponent = ({ scenarios, position, activePage }) => {
  scenarios.position = position;

  return (
    <Table height="502px" unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Scenario Name</Table.HeaderCell>
          <Table.HeaderCell>Open</Table.HeaderCell>
          <Table.HeaderCell>Defend</Table.HeaderCell>
          <Table.HeaderCell>Board</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {scenarios.filteredScenarios({ activePage }).map((scenario) => (
          <ScenarioComponent
            scenario={scenario}
            token={scenarios.token}
            className="scenario-component-rendered"
          />
        ))}
      </Table.Body>
    </Table>
  );
};

export default ScenariosComponent;
