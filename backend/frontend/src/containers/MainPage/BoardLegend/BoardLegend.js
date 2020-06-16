import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Header, Table, Tab, Button } from "semantic-ui-react";

const StyledContainer = styled(Container)`
  font-size: 1rem;
`;

const StyledGreenRow = styled(Table.Row)`
  color: black;
  background-color: #8bddbe;
`;

const StyledVioletRow = styled(Table.Row)`
  color: black;
  background-color: #ed87a7;
`;

const StyledBlueRow = styled(Table.Row)`
  color: black;
  background-color: #6b6c7c;
`;

const StyledRedRow = styled(Table.Row)`
  color: black;
  background-color: #d3d3d3;
`;

const StyledInvertedHeader = styled(Table.Header)`
  color: white;
  background-color: black;
`;
const StyledInvertedRow = styled(Table.Row)`
  color: white;
  background-color: black;
`;
//TODO: Make a board legend for Preflop/Flop/Turn/River

const legendTable = (
  numberOfCombos,
  nameOfAction,
  onHandleStreetHandlerButtons,
  street,
  streetActions
) => (
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
        <Table.Cell>{streetActions[0]}</Table.Cell>
        <Table.Cell>{numberOfCombos[0]}</Table.Cell>
        <Table.Cell id="Raise4BetValueTutorial">
          {(
            (100 * numberOfCombos[0]) /
            (numberOfCombos[0] +
              numberOfCombos[1] +
              numberOfCombos[2] +
              numberOfCombos[3])
          ).toFixed(2)}
        </Table.Cell>
        <Table.Cell>{((numberOfCombos[0] / 1326) * 100).toFixed(2)}</Table.Cell>
        <Table.Cell>
          <Button
            onClick={e =>
              onHandleStreetHandlerButtons(e, {
                street,
                streetAction: streetActions[0]
              })
            }
          >
            Choose Hands
          </Button>
        </Table.Cell>
      </StyledGreenRow>
      <StyledVioletRow>
        <Table.Cell>{streetActions[1]}</Table.Cell>
        <Table.Cell>{numberOfCombos[1]}</Table.Cell>
        <Table.Cell id="Raise4BetBluffTutorial">
          {(
            (100 * numberOfCombos[1]) /
            (numberOfCombos[0] +
              numberOfCombos[1] +
              numberOfCombos[2] +
              numberOfCombos[3])
          ).toFixed(2)}
        </Table.Cell>
        <Table.Cell>{((numberOfCombos[1] / 1326) * 100).toFixed(2)}</Table.Cell>
        <Table.Cell>
          <Button
            onClick={e =>
              onHandleStreetHandlerButtons(e, {
                street,
                streetAction: streetActions[1]
              })
            }
          >
            Choose Hands
          </Button>
        </Table.Cell>
      </StyledVioletRow>
      <StyledBlueRow>
        <Table.Cell>{streetActions[2]}</Table.Cell>
        <Table.Cell>{numberOfCombos[2]}</Table.Cell>
        <Table.Cell>
          {(
            (100 * numberOfCombos[2]) /
            (numberOfCombos[0] +
              numberOfCombos[1] +
              numberOfCombos[2] +
              numberOfCombos[3])
          ).toFixed(2)}
        </Table.Cell>
        <Table.Cell>{((numberOfCombos[2] / 1326) * 100).toFixed(2)}</Table.Cell>
        <Table.Cell>
          <Button
            onClick={e =>
              onHandleStreetHandlerButtons(e, {
                street,
                streetAction: streetActions[2]
              })
            }
          >
            Choose Hands
          </Button>
        </Table.Cell>
      </StyledBlueRow>
      <StyledRedRow>
        <Table.Cell>{streetActions[3]}</Table.Cell>
        <Table.Cell>{numberOfCombos[3]}</Table.Cell>
        <Table.Cell>
          {(
            (100 * numberOfCombos[3]) /
            (numberOfCombos[0] +
              numberOfCombos[1] +
              numberOfCombos[2] +
              numberOfCombos[3])
          ).toFixed(2)}
        </Table.Cell>
        <Table.Cell>{((numberOfCombos[3] / 1326) * 100).toFixed(2)}</Table.Cell>
        <Table.Cell>
          <Button
            onClick={e =>
              onHandleStreetHandlerButtons(e, {
                street,
                streetAction: streetActions[3]
              })
            }
          >
            Choose Hands
          </Button>
        </Table.Cell>
      </StyledRedRow>
      <StyledInvertedRow>
        <Table.Cell>Total</Table.Cell>
        <Table.Cell>
          {numberOfCombos[0] +
            numberOfCombos[1] +
            numberOfCombos[2] +
            numberOfCombos[3]}
        </Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>
          {(
            (100 *
              (numberOfCombos[0] +
                numberOfCombos[1] +
                numberOfCombos[2] +
                numberOfCombos[3])) /
            1326
          ).toFixed(2)}
        </Table.Cell>
      </StyledInvertedRow>
    </Table.Body>
  </Table>
);

const BoardLegend = ({
  wholeRange,
  onHandleStreetHandler,
  onHandleStreetHandlerButtons,
  mode: { street, streetAction }
}) => {
  const streetActions = {
    Preflop: ["Raise4BetCall", "Raise4BetFold", "RaiseCall", "RaiseFold"],
    Postflop: ["Valuebet", "Bluff", "CheckCall", "CheckFold"]
  };

  const [currentStreet, updateCurrentStreet] = useState("Preflop");
  const [numberOfCombos, updateNumberOfCombos] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (street == "Preflop") updateCurrentStreet("Preflop");
    else updateCurrentStreet("Postflop");
  }, [street, streetAction]);

  //TODO: potential bug? method outside useEffect
  useEffect(() => {
    let wholeRangeFiltered = wholeRange.filter(
      ({ hands, Street }) => hands && Street == street
    );
    wholeRangeFiltered = wholeRangeFiltered.map(({ hands }) => {
      return hands.reduce((acc, hand) => {
        if (hand.indexOf("s") >= 0) return acc + 4;
        //Suited Combos
        else if (hand.indexOf("o") >= 0) return acc + 12;
        //Offsuit Combos
        else return acc + 6; //Pair Combos
      }, 0);
    });
    updateNumberOfCombos(wholeRangeFiltered);
  }, [wholeRange]);

  const panes = [
    {
      menuItem: "Preflop",
      name: "Preflop",
      value: "Raise4BetCall",
      render: () => (
        <Fragment>
          {legendTable(
            numberOfCombos,
            nameOfAction,
            onHandleStreetHandlerButtons,
            street,
            streetActions[currentStreet]
          )}{" "}
        </Fragment>
      )
    },
    {
      menuItem: "Flop",
      name: "Flop",
      value: "Valuebet",
      render: () => (
        <Fragment>
          {legendTable(
            numberOfCombos,
            nameOfAction,
            onHandleStreetHandlerButtons,
            street,
            streetActions[currentStreet]
          )}
        </Fragment>
      )
    },
    {
      menuItem: "Turn",
      name: "Turn",
      value: "Valuebet",
      render: () => (
        <Fragment>
          {legendTable(
            numberOfCombos,
            nameOfAction,
            onHandleStreetHandlerButtons,
            street,
            streetActions[[currentStreet]]
          )}
        </Fragment>
      )
    },
    {
      menuItem: "River",
      name: "River",
      value: "Valuebet",
      render: () => (
        <Fragment>
          {legendTable(
            numberOfCombos,
            nameOfAction,
            onHandleStreetHandlerButtons,
            street,
            streetActions[[currentStreet]]
          )}
        </Fragment>
      )
    }
  ];
  const nameOfAction = comboNumber => {
    if (street && wholeRange[[street]] !== undefined)
      return Object.keys(wholeRange[[street]])[comboNumber];
    else return "";
  };

  return (
    <StyledContainer>
      <Tab
        panes={panes}
        menu={{ fluid: true, tabular: true }}
        onTabChange={onHandleStreetHandler}
      />
    </StyledContainer>
  );
};

export default BoardLegend;
