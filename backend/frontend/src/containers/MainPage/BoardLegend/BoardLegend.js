import React, { Fragment, useState, useEffect, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Header, Table, Tab, Button } from "semantic-ui-react";
import _ from "lodash";
import useInjectReducer from "../../../HOC/useInjectReducer";

import reducer from "../reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectDeadcards,
  makeSelectMode,
  makeSelectSelectedStreet
} from "../selectors";

import CardHandSuit from "../Board/CardHandSuit";

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
  color: white;
  background-color: #3ac0ff;
`;

const StyledRedRow = styled(Table.Row)`
  color: white;
  background-color: #dc73ff;
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
  <Table unstackable fixed>
    <Table.Body>
      <StyledInvertedRow>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Range # Combos</Table.HeaderCell>
        <Table.HeaderCell>% of Range</Table.HeaderCell>
        <Table.HeaderCell>% of Hands</Table.HeaderCell>
      </StyledInvertedRow>
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
          ).toFixed(2) || 0}
        </Table.Cell>
        <Table.Cell>{((numberOfCombos[0] / 1326) * 100).toFixed(2)}</Table.Cell>
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

const comboCounter = (hands, chosenStreet, board) => {
  if (!hands) return 0;

  let filteredBoard = [];
  if (chosenStreet == "Flop" && board.length >= 3)
    filteredBoard = [board[0].trim(), board[1].trim(), board[2].trim()];
  else if (chosenStreet == "Turn" && board.length >= 4)
    filteredBoard = [
      board[0].trim(),
      board[1].trim(),
      board[2].trim(),
      board[3].trim()
    ];
  else if (chosenStreet == "River" && board.length >= 5)
    filteredBoard = [
      board[0].trim(),
      board[1].trim(),
      board[2].trim(),
      board[3].trim(),
      board[4].trim()
    ];

  let boardContains = [];
  if (!(filteredBoard == false))
    boardContains = filteredBoard.filter(boardCard => {
      if (
        boardCard == false ||
        boardCard == undefined ||
        hands == undefined ||
        hands == false
      )
        return false;
      if (hands.length === 2 && boardCard.substr(0, 1) == hands.substr(0, 1))
        return 3;
      return (
        (boardCard &&
          hands &&
          hands.length >= 2 &&
          boardCard.substr(0, 1) === hands.substr(0, 1) &&
          boardCard.substr(1, 1) === hands.substr(3, 1).toLowerCase()) ||
        (boardCard &&
          hands &&
          hands.length > 5 &&
          boardCard.substr(0, 1) === hands.substr(1, 1) &&
          boardCard.substr(1, 1) ===
            hands
              .split(" ")[1]
              .substr(0, 1)
              .toLowerCase()) ||
        (boardCard &&
          hands.length > 2 &&
          hands.substr(0, 1) === hands.substr(1, 1) &&
          boardCard.substr(1, 1) === hands.substr(2, 1).toLowerCase())
      );
    });

  if (hands.length > 4 && boardContains.length === 0) return 1;
  if (hands.length > 4 && boardContains.length > 0) return 0;

  let hand = new CardHandSuit(
    hands.cardOne,
    hands.cardTwo,
    hands ? hands.substr(2, hands.length - 1) : ""
  ); //FIXME: UGLY

  // For specific combos
  if (hand.getCards().length > 4) return 1;

  //Suited Combos
  if (hand.isSuit("s")) {
    let specificHands = [
      hand.getHand().charAt(0) + "s" + hand.getHand().charAt(1) + "s",
      hand.getHand().charAt(0) + "c" + hand.getHand().charAt(1) + "c",
      hand.getHand().charAt(0) + "d" + hand.getHand().charAt(1) + "d",
      hand.getHand().charAt(0) + "h" + hand.getHand().charAt(1) + "h"
    ];
    let addCombos = filteredBoard.reduce((acc, boardCard) => {
      let totalHands = specificHands.reduce((acc2, specificCards) => {
        if (specificCards.indexOf(boardCard) >= 0) {
          return [...acc2, specificCards];
        } else return acc2;
      }, [])[0];
      if (totalHands) return { ...acc, [totalHands]: 0 };
      else return { ...acc };
    }, 0);
    return 4 - Object.keys(addCombos).length;
  }
  //Offsuit Combos
  else if (hand.isSuit("o")) {
    let numOccurances = _.countBy(_.split(board, "", 12));
    let subtractFirstCard = numOccurances[hand.getHand().charAt(0)] || 0;
    let subtractSecondCard = numOccurances[hand.getHand().charAt(1)] || 0;
    let numCards = (4 - subtractFirstCard) * (4 - subtractSecondCard) - 4;
    return numCards;
  } else {
    //Pair Combos
    let numOccurances = _.countBy(_.split(board, "", 12));
    let subtractFirstCard = numOccurances[hand.getHand().charAt(0)] || 0;
    let subtractSecondCard = numOccurances[hand.getHand().charAt(1)] || 0;

    let numCards = ((4 - subtractFirstCard) * (3 - subtractSecondCard)) / 2;
    return numCards;
  }
};

export const countHandCombo = (wholeRange, chosenStreet, board) => {
  let filteredRange = wholeRange.filter(
    rangeObject => rangeObject.filterForHandsInRange(chosenStreet).length == 0
  );
  let wholeRangeNum = wholeRange.map(rangeObject =>
    rangeObject.allHandsOneArray().reduce((acc, hand) => {
      return acc + comboCounter(hand.getHand(), chosenStreet, board);
    }, 0)
  );

  return wholeRangeNum;
};

const BoardLegend = ({
  wholeRange,
  onHandleStreetHandlerButtons,
  mode: { street },
  deadcards
}) => {
  const streetActions = {
    Preflop: ["Raise4BetCall", "Raise4BetFold", "RaiseCall", "RaiseFold"],
    Flop: ["Valuebet", "Bluff", "CheckCall", "CheckFold"],
    Turn: ["Valuebet", "Bluff", "CheckCall", "CheckFold"],
    River: ["Valuebet", "Bluff", "CheckCall", "CheckFold"]
  };

  const [numberOfCombos, updateNumberOfCombos] = useState([0, 0, 0, 0]);

  //TODO: potential bug? method outside useEffect
  useEffect(() => {
    updateNumberOfCombos(countHandCombo(wholeRange, street, deadcards));
  }, [wholeRange, street, deadcards]);

  const nameOfAction = comboNumber => {
    if (street && wholeRange[street] !== undefined)
      return Object.keys(wholeRange[street])[comboNumber];
    else return "";
  };

  return (
    <StyledContainer>
      {legendTable(
        numberOfCombos,
        nameOfAction,
        onHandleStreetHandlerButtons,
        street,
        streetActions[street]
      )}
    </StyledContainer>
  );
};

const mapStateToProps = () => {
  const getDeadcards = makeSelectDeadcards();
  const getMode = makeSelectMode();
  const getSelectedRange = makeSelectSelectedStreet();

  const mapState = state => {
    return {
      deadcards: getDeadcards(state),
      mode: getMode(state),
      wholeRange: getSelectedRange(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(BoardLegend);
