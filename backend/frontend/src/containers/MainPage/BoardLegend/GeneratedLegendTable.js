import React from "react";
import { Table } from "semantic-ui-react";
import styled from "styled-components";

const StyledColorRow = styled(Table.Cell)`
  color: white;
  background-color: ${(props) =>
    ["#0f6125", "#a30b00", "#005e8a", "#8e00bd", "#003d3e", "#713400"][
      props.index
    ]};
`;
const GeneratedLegendTable = ({ streetActions, numberOfCombos, index }) => {
  return (
    <Table.Row>
      <StyledColorRow index={index}>
        <strong>{streetActions[index]}</strong>
      </StyledColorRow>
      <Table.Cell>{numberOfCombos[index]}</Table.Cell>
      <Table.Cell id="Raise4BetValueTutorial">
        {numberOfCombos.reduce((acc, curr) => acc + curr, 0) !== 0
          ? (
              (100 * numberOfCombos[index]) /
              numberOfCombos.reduce((acc, curr) => acc + curr, 0)
            ).toFixed(2)
          : "0"}
      </Table.Cell>
      <Table.Cell>
        {((numberOfCombos[index] / 1326) * 100).toFixed(2)}
      </Table.Cell>
    </Table.Row>
  );
};

export default GeneratedLegendTable;
