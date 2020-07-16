import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import { Grid, Button } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";
import { useDrag, useGesture, useMove } from "react-use-gesture";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectRangesPreflop,
  makeSelectRangesPreflopOnly,
  makeSelectLoadEquities,
  makeSelectDeadcards,
  makeSelectOtherRange,
  makeSelectHandEquities,
  makeSelectMode
} from "../selectors";

import { generateCardGrid, generateBoard } from "./StateUpdate";
//TODO: implement interact.js or draggable instead of this react library

import { calculateEquity } from "./EquityCalculations";

//FIXME: the equity is wrong on the river range vs range
export const calcEquities = (cards, deadcards, otherRange, street) => {
  let calcHandEquities;

  console.log(cards, deadcards, otherRange, street); //?

  let deadcardsForStreet;
  if (street == "Preflop") deadcardsForStreet = "";
  else if (street == "Flop") deadcardsForStreet = deadcards.slice(0, 3).join();
  else if (street == "Turn") deadcardsForStreet = deadcards.slice(0, 4).join();
  else if (street == "River") deadcardsForStreet = deadcards.slice(0, 5).join();

  calcHandEquities = Object.keys(cards).reduce((acc, cardValue) => {
    return {
      ...acc,
      [cardValue]: {
        colorCards: cards[cardValue].colorCards,
        equity: calculateEquity(
          [cardValue],
          deadcardsForStreet,
          otherRange.reduce(
            (acc, { hands: [handsArr] }) =>
              handsArr ? [...acc, handsArr] : acc,
            []
          )
        ).toFixed(2)
      }
    };
  }, {});

  return calcHandEquities;
};

const Board = ({
  onMouseOverHandler,
  PreflopRanges,
  loadEquities,
  deadcards,
  otherRange,
  handEquities,
  mode: { street, streetAction, isIP }
}) => {
  const [manyHands, setManyHands] = useState();
  const [cards, setCards] = useState();
  const dispatch = useDispatch();

  // Set the drag hook and define component movement based on gesture data
  const bind = useGesture({
    onDrag: props =>
      onMouseOverHandler(
        {
          cards: props.args[props.args.length - 1],
          onMouseDownEvent:
            (props.memo !== props.args[props.args.length - 1] && props.down) ||
            (props.first && props.down)
        },
        { threshold: 40, filterTaps: false }
      ),
    onMove: props =>
      onMouseOverHandler(
        {
          cards: props.args[props.args.length - 1],
          onMouseDownEvent:
            (props.memo !== props.args[0] && props.down) ||
            (props.first && props.down)
        },
        { threshold: 40, delay: true }
      )
  });

  useEffect(() => {
    let newCards;

    //set the new cards
    let PosIndex = isIP ? "0" : "1";
    //generate the card grid
    newCards = generateCardGrid(PreflopRanges, isIP);

    let displayCardsOr = newCards;

    let generatedBoard = generateBoard(PreflopRanges, bind, displayCardsOr);
    setManyHands(generatedBoard);
    setCards(displayCardsOr);
    //If there are new equities to be entered, dispatch the action
  }, [PreflopRanges, isIP, handEquities]);

  useEffect(() => {
    //set the new cards
    let newCards = generateCardGrid(PreflopRanges, isIP);

    if (loadEquities) {
      let calcHandEquities = calcEquities(
        newCards,
        deadcards,
        otherRange,
        street
      );

      let displayCardsOr = calcHandEquities ? calcHandEquities : newCards;

      let generatedBoard = generateBoard(PreflopRanges, bind, displayCardsOr);
      setManyHands(generatedBoard);
      //If there are new equities to be entered, dispatch the action
      //TODO: Implement this
      // dispatch(loadEquitiesSuccess({ Position, newCards: calcHandEquities }));
    }
  }, [loadEquities]);

  return <Container fluid>{manyHands}</Container>; //TO-DO: BUG this generates console error
};

const mapStateToProps = () => {
  const getRangesPreflop = makeSelectRangesPreflop();
  const getLoadEquities = makeSelectLoadEquities();
  const getCards = makeSelectDeadcards();
  const getOtherRange = makeSelectOtherRange();
  const getHandEquities = makeSelectHandEquities();
  const getMode = makeSelectMode();

  const mapState = state => {
    return {
      PreflopRanges: getRangesPreflop(state),
      loadEquities: getLoadEquities(state),
      handEquities: getHandEquities(state),
      deadcards: getCards(state),
      otherRange: getOtherRange(state),
      mode: getMode(state)
    };
  };

  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Board);
