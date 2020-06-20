import React, { Fragment, useState, useEffect, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Header, Table, Tab, Button } from "semantic-ui-react";
import _ from "lodash";
import useInjectReducer from "../../../HOC/useInjectReducer";

import reducer from "../reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectDeadcards, makeSelectMode } from "../selectors";

const key = "global";

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

const comboCounter = (hand, chosenStreet, board) => {
  console.log(board[0]); //?let filteredBoard = [];
  let filteredBoard = [];
  if (chosenStreet == "Flop" && board.length >= 3)
    filteredBoard = [
      board[0].trim().charAt(0),
      board[1].trim().charAt(0),
      board[2].trim().charAt(0)
    ];
  else if (chosenStreet == "Turn" && board.length >= 4)
    filteredBoard = [
      board[0].trim().charAt(0),
      board[1].trim().charAt(0),
      board[2].trim().charAt(0),
      board[3].trim().charAt(0)
    ];
  else if (chosenStreet == "River" && board.length >= 5)
    filteredBoard = [
      board[0].trim().charAt(0),
      board[1].trim().charAt(0),
      board[2].trim().charAt(0),
      board[3].trim().charAt(0),
      board[4].trim().charAt(0)
    ];
  if (hand.indexOf("s") >= 0) {
    let numOccurances = _.countBy(filteredBoard);
    let subtractFirstCard = numOccurances[hand.charAt(0)] || 0;
    let subtractSecondCard = numOccurances[hand.charAt(1)] || 0;
    let numCards = 4 - subtractFirstCard - subtractSecondCard;
    return numCards;
  }
  //Suited Combos
  else if (hand.indexOf("o") >= 0) {
    let numOccurances = _.countBy(_.split(board, "", 12));
    let subtractFirstCard = numOccurances[hand.charAt(0)] || 0;
    let subtractSecondCard = numOccurances[hand.charAt(1)] || 0;
    let numCards = (4 - subtractFirstCard) * (4 - subtractSecondCard) - 4;
    return numCards;
  }
  //Offsuit Combos
  else {
    let numOccurances = _.countBy(_.split(board, "", 12));
    let subtractFirstCard = numOccurances[hand.charAt(0)] || 0;
    let subtractSecondCard = numOccurances[hand.charAt(1)] || 0;

    let numCards = ((4 - subtractFirstCard) * (3 - subtractSecondCard)) / 2;
    return numCards; //Pair Combos
  }
};

export const countHandCombo = (wholeRange, chosenStreet, board) => {
  let wholeRangeFiltered = wholeRange.filter(
    ({ hands, Street }) => chosenStreet == Street
  );
  let wholeRangeNum = wholeRangeFiltered.map(({ hands }) => {
    return hands.reduce((acc, hand) => {
      console.log(hand, chosenStreet, board);
      return acc + comboCounter(hand, chosenStreet, board);
    }, 0);
  });
  return wholeRangeNum;
};

const BoardLegend = ({
  wholeRange,
  onHandleStreetHandler,
  onHandleStreetHandlerButtons,
  mode,
  deadcards
}) => {
  useInjectReducer({ key, reducer });
  const streetActions = {
    Preflop: ["Raise4BetCall", "Raise4BetFold", "RaiseCall", "RaiseFold"],
    Flop: ["Valuebet", "Bluff", "CheckCall", "CheckFold"],
    Turn: ["Valuebet", "Bluff", "CheckCall", "CheckFold"],
    River: ["Valuebet", "Bluff", "CheckCall", "CheckFold"]
  };

  console.log(mode.street);
  const [numberOfCombos, updateNumberOfCombos] = useState([0, 0, 0, 0]);

  //TODO: potential bug? method outside useEffect
  useEffect(() => {
    updateNumberOfCombos(countHandCombo(wholeRange, mode.street, deadcards));
  }, [wholeRange, mode.street, deadcards]);

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
            mode.street,
            streetActions[mode.street]
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
            mode.street,
            streetActions[mode.street]
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
            mode.street,
            streetActions[mode.street]
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
            mode.street,
            streetActions[mode.street]
          )}
        </Fragment>
      )
    }
  ];
  const nameOfAction = comboNumber => {
    if (mode.street && wholeRange[mode.street] !== undefined)
      return Object.keys(wholeRange[mode.street])[comboNumber];
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

const mapStateToProps = () => {
  const getDeadcards = makeSelectDeadcards();
  const getMode = makeSelectMode();

  const mapState = state => {
    return {
      deadcards: getDeadcards(state),
      mode: getMode(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(BoardLegend);
