import React from "react";
import { Table } from "semantic-ui-react";
import styled from "styled-components";
import GeneratedLegendTable from "./GeneratedLegendTable";

const StyledInvertedRow = styled(Table.Row)`
  color: white;
  background-color: black;
`;

const LegendTable = ({
  numberOfCombos,
  indexOfActions = [0, 1, 2, 3],
  streetActions,
}) => (
  <Table unstackable fixed>
    <Table.Body>
      <StyledInvertedRow>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Range # Combos</Table.HeaderCell>
        <Table.HeaderCell>% of Range</Table.HeaderCell>
        <Table.HeaderCell>% of Hands</Table.HeaderCell>
      </StyledInvertedRow>
      {indexOfActions.map((index) => (
        <GeneratedLegendTable
          streetActions={streetActions}
          numberOfCombos={numberOfCombos}
          index={index}
        />
      ))}
    </Table.Body>
  </Table>
);

export default LegendTable;
