import React, { useState, useEffect, memo, Fragment } from "react";
import { useDispatch } from "react-redux";

import { Grid, Button, Table } from "semantic-ui-react";
import { useDrag, useGesture, useMove } from "react-use-gesture";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectSelectedStreet,
  makeSelectLoadEquities,
  makeSelectDeadcards,
  makeSelectOtherRange,
  makeSelectHandEquities,
  makeSelectMode,
  makeSelectRange,
  makeSelectRangesPreflop
} from "../selectors";

import BoardOfHands from "./StateUpdate";
//TODO: implement interact.js or draggable instead of this react library

import { calculateEquity } from "./EquityCalculations";
import CardHandSuit from "./CardHandSuit";

//FIXME: the equity is wrong on the river range vs range
export const calcEquities = (cards, deadcards, otherRange, street) => {
  let calcHandEquities;

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
          [new CardHandSuit(cardValue.substr(0, 1), cardValue.substr(1, 1))],
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
  SelectedRanges,
  loadEquities,
  deadcards,
  otherRange,
  handEquities,
  mode: { street, streetAction, isIP },
  ranges,
  SelectedStreet,
  preflopRanges
}) => {
  const [manyHands, setManyHands] = useState();
  const [instanceOfBoardHands, updateInstanceOfBoardHands] = useState(false);
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
    if (!instanceOfBoardHands)
      updateInstanceOfBoardHands(new BoardOfHands(bind));

    //If there are new equities to be entered, dispatch the action
  }, [false, bind]);

  useEffect(() => {
    if (instanceOfBoardHands) {
      instanceOfBoardHands.updateCardGrid(preflopRanges, SelectedRanges);

      setManyHands(instanceOfBoardHands.view());
    }
    //If there are new equities to be entered, dispatch the action
  }, [instanceOfBoardHands, SelectedRanges, preflopRanges, bind]);

  return (
    <Table celled striped unstackable>
      {manyHands}
    </Table>
  ); //TO-DO: BUG this generates console error
};

const mapStateToProps = () => {
  const getRangesSelected = makeSelectSelectedStreet();
  const getLoadEquities = makeSelectLoadEquities();
  const getCards = makeSelectDeadcards();
  const getOtherRange = makeSelectOtherRange();
  const getHandEquities = makeSelectHandEquities();
  const getMode = makeSelectMode();
  const getRanges = makeSelectRange();
  const getRangesPreflop = makeSelectRangesPreflop();

  const mapState = state => {
    return {
      SelectedRanges: getRangesSelected(state),
      ranges: getRanges(state),
      loadEquities: getLoadEquities(state),
      handEquities: getHandEquities(state),
      deadcards: getCards(state),
      otherRange: getOtherRange(state),
      mode: getMode(state),
      preflopRanges: getRangesPreflop(state)
    };
  };

  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Board);
