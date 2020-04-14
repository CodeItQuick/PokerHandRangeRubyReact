import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Header, Table } from "semantic-ui-react";

const StyledContainer = styled(Container)`
  font-size: 1rem;
`;

const StyledRedRow = styled(Table.Row)`
  color: white;
  background-color: red;
`;

const StyledVioletRow = styled(Table.Row)`
  color: white;
  background-color: purple;
`;

const StyledBlueRow = styled(Table.Row)`
  color: white;
  background-color: blue;
`;

const StyledGreenRow = styled(Table.Row)`
  color: white;
  background-color: green;
`;

const StyledInvertedHeader = styled(Table.Header)`
  color: white;
  background-color: black;
`;
const StyledInvertedRow = styled(Table.Row)`
  color: white;
  background-color: black;
`;

const BoardLegend = ({ wholeRange, mode }) => {
  console.log(wholeRange);
  const numberOfCombos = comboNumber => {
    if (mode && mode.street && wholeRange[[mode.street]] !== undefined)
      return wholeRange[[mode.street]][
        Object.keys(wholeRange[[mode.street]])[comboNumber]
      ].prHandString
        .map(acc => {
          console.log(acc);
          if (acc.indexOf("s") >= 0) return 4;
          else if (acc.indexOf("o") >= 0) return 12;
          else if (acc[1]) return 6;
        })
        .reduce((a, b) => a + b, 0);
    else return null;
  };

  const nameOfAction = comboNumber => {
    if (mode && mode.street && wholeRange[[mode.street]] !== undefined)
      return Object.keys(wholeRange[[mode.street]])[comboNumber];
    else return "";
  };

  return (
    <StyledContainer>
      <Table>
        <StyledInvertedHeader>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Range # Combos</Table.HeaderCell>
            <Table.HeaderCell>% of Range</Table.HeaderCell>
            <Table.HeaderCell>% of Hands</Table.HeaderCell>
          </Table.Row>
        </StyledInvertedHeader>
        <Table.Body>
          <StyledGreenRow>
            <Table.Cell>{nameOfAction(1)}</Table.Cell>
            <Table.Cell>{numberOfCombos(1)}</Table.Cell>
            <Table.Cell>
              {(
                (100 * numberOfCombos(1)) /
                (numberOfCombos(1) +
                  numberOfCombos(2) +
                  numberOfCombos(3) +
                  numberOfCombos(4))
              ).toFixed(2)}
            </Table.Cell>
            <Table.Cell>
              {((numberOfCombos(1) / 1326) * 100).toFixed(2)}
            </Table.Cell>
          </StyledGreenRow>
          <StyledVioletRow>
            <Table.Cell>{nameOfAction(2)}</Table.Cell>
            <Table.Cell>{numberOfCombos(2)}</Table.Cell>
            <Table.Cell>
              {(
                (100 * numberOfCombos(2)) /
                (numberOfCombos(1) +
                  numberOfCombos(2) +
                  numberOfCombos(3) +
                  numberOfCombos(4))
              ).toFixed(2)}
            </Table.Cell>
            <Table.Cell>
              {((numberOfCombos(2) / 1326) * 100).toFixed(2)}
            </Table.Cell>
          </StyledVioletRow>
          <StyledBlueRow>
            <Table.Cell>{nameOfAction(3)}</Table.Cell>
            <Table.Cell>{numberOfCombos(3)}</Table.Cell>
            <Table.Cell>
              {(
                (100 * numberOfCombos(3)) /
                (numberOfCombos(1) +
                  numberOfCombos(2) +
                  numberOfCombos(3) +
                  numberOfCombos(4))
              ).toFixed(2)}
            </Table.Cell>
            <Table.Cell>
              {((numberOfCombos(3) / 1326) * 100).toFixed(2)}
            </Table.Cell>
          </StyledBlueRow>
          <StyledRedRow>
            <Table.Cell>{nameOfAction(4)}</Table.Cell>
            <Table.Cell>{numberOfCombos(4)}</Table.Cell>
            <Table.Cell>
              {(
                (100 * numberOfCombos(4)) /
                (numberOfCombos(1) +
                  numberOfCombos(2) +
                  numberOfCombos(3) +
                  numberOfCombos(4))
              ).toFixed(2)}
            </Table.Cell>
            <Table.Cell>
              {((numberOfCombos(4) / 1326) * 100).toFixed(2)}
            </Table.Cell>
          </StyledRedRow>
          <StyledInvertedRow>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>
              {numberOfCombos(1) +
                numberOfCombos(2) +
                numberOfCombos(3) +
                numberOfCombos(4)}
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              {(
                (100 *
                  (numberOfCombos(1) +
                    numberOfCombos(2) +
                    numberOfCombos(3) +
                    numberOfCombos(4))) /
                1326
              ).toFixed(2)}
            </Table.Cell>
          </StyledInvertedRow>
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

export default BoardLegend;
