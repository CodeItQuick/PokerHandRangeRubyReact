import React, { useState, useEffect, memo, Fragment } from "react";
import { useDispatch } from "react-redux";

import { Grid, Button, Table } from "semantic-ui-react";
import { useDrag, useGesture, useMove } from "react-use-gesture";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectSelectedRanges,
  makeSelectLoadEquities,
  makeSelectDeadcards,
  makeSelectOtherRange,
  makeSelectHandEquities,
  makeSelectMode,
  makeSelectRange,
  makeSelectRangesPreflop
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

const displayWidgetAndSetManyHands = (preflopRanges, isIP, bind) => {
  let newCards;

  //generate the card grid
  newCards = generateCardGrid(preflopRanges, isIP);

  let generatedBoard = generateBoard(preflopRanges, bind, newCards);

  return [generatedBoard, newCards];
};

//TODO: make 119->131 should be a function
const loadNewBoardOnLoadStreet = (
  loadEquities,
  ranges,
  isIP,
  otherRange,
  street,
  bind,
  deadcards
) => {
  if (loadEquities) {
    let newCards = generateCardGrid(ranges, isIP);
    let calcHandEquities = calcEquities(
      newCards,
      deadcards,
      otherRange,
      street
    );

    let displayCardsOr = calcHandEquities ? calcHandEquities : newCards;

    return generateBoard(ranges, bind, displayCardsOr);
  }
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
    const [newManyHands, newSetCards] = displayWidgetAndSetManyHands(
      preflopRanges,
      isIP,
      bind
    );
    setManyHands(newManyHands);
    setCards(newSetCards);
    //If there are new equities to be entered, dispatch the action
  }, [SelectedStreet, preflopRanges, ranges, isIP, handEquities]);

  useEffect(() => {
    //set the new cards

    if (loadEquities) {
      const newSetManyHands = loadNewBoardOnLoadStreet(
        loadEquities,
        ranges,
        isIP,
        otherRange,
        street,
        bind,
        deadcards
      );
      setManyHands(newSetManyHands);
    }

    //If there are new equities to be entered, dispatch the action
    //TODO: Implement this
    // dispatch(loadEquitiesSuccess({ Position, newCards: calcHandEquities }));
  }, [street, loadEquities]);

  return (
    <Table celled striped unstackable>
      <Table.Body>{manyHands}</Table.Body>
    </Table>
  ); //TO-DO: BUG this generates console error
};

const mapStateToProps = () => {
  const getRangesSelected = makeSelectSelectedRanges();
  const getLoadEquities = makeSelectLoadEquities();
  const getCards = makeSelectDeadcards();
  const getOtherRange = makeSelectOtherRange();
  const getHandEquities = makeSelectHandEquities();
  const getMode = makeSelectMode();
  const getRanges = makeSelectRange();
  const getSelectedStreet = makeSelectSelectedRanges();
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
      SelectedStreet: getSelectedStreet(state),
      preflopRanges: getRangesPreflop(state)
    };
  };

  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Board);
