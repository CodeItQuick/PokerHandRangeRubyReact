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
  makeSelectPosition,
  makeSelectLoadEquities,
  makeSelectDeadcards,
  makeSelectOtherRange,
  makeSelectHandEquities
} from "../selectors";

import { setHandRange, loadEquities, loadEquitiesSuccess } from "../actions.js";

import { StyledCol, ColorCard, StyledRow } from "./Styles.js";
import {
  getCards,
  displayCardSuit,
  orderedCard,
  addEquityCardGrid,
  generateCardGrid
} from "./StateUpdate";
//TODO: implement interact.js or draggable instead of this react library

const Board = ({
  onMouseOverHandler,
  PreflopRanges,
  PreflopRangesOnly,
  Position,
  loadEquities,
  deadcards,
  otherRange,
  handEquities
}) => {
  const [manyHands, setManyHands] = useState();
  const [cards, setCards] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    let newCards = addEquityCardGrid(deadcards, otherRange, cards);
    dispatch(loadEquitiesSuccess({ Position, newCards }));
    if (Position == true) setCards(handEquities[0]);
    else setCards(handEquities[1]);
  }, [loadEquities]);

  useEffect(() => {
    let newCards = generateCardGrid(PreflopRanges, Position);
    setCards(newCards);
  }, [PreflopRanges, Position]);

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
    let allPreflopHands = PreflopRangesOnly.reduce((acc, curr) => {
      if (acc.hands && curr.hands) return [...acc.hands, ...curr.hands];
      else return [...acc, ...curr.hands];
    });

    let toSetManyHands = [];

    toSetManyHands = orderedCard.map(cardOne =>
      orderedCard.reduce((acc, cardTwo, idx) => {
        acc.push([cardOne, cardTwo]);
        return acc;
      }, [])
    );

    let setNewManyHands = toSetManyHands.map((row, idx) => {
      let columnJSX = row.map(([cardOne, cardTwo]) => {
        let cardHand =
          getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo);

        return (
          <StyledCol xs={1} key={cardHand}>
            <ColorCard
              key={"colorcard" + cardHand}
              id={"colorButton" + cardHand}
              {...bind(cardHand)}
              hand={cardHand}
              coloring={cards[cardHand] ? cards[cardHand].colorCards : "#AAA"}
              border_attrib={allPreflopHands.indexOf(cardHand) >= 0}
            >
              {cardHand}
              <br />
              {cards[cardHand] ? cards[cardHand].equity : "n/a"}
            </ColorCard>
          </StyledCol>
        );
      });
      return <StyledRow xs={13}>{columnJSX}</StyledRow>;
    });

    setManyHands(setNewManyHands);
  }, [cards, bind, PreflopRangesOnly, Position]);

  return <Container fluid>{manyHands}</Container>; //TO-DO: BUG this generates console error
};

const mapStateToProps = () => {
  const getRangesPreflop = makeSelectRangesPreflop();
  const getRangesPreflopOnly = makeSelectRangesPreflopOnly();
  const getPosition = makeSelectPosition();
  const getLoadEquities = makeSelectLoadEquities();
  const getCards = makeSelectDeadcards();
  const getOtherRange = makeSelectOtherRange();
  const getHandEquities = makeSelectHandEquities();

  const mapState = state => {
    return {
      PreflopRanges: getRangesPreflop(state),
      PreflopRangesOnly: getRangesPreflopOnly(state),
      Position: getPosition(state),
      loadEquities: getLoadEquities(state),
      handEquities: getHandEquities(state),
      deadcards: getCards(state),
      otherRange: getOtherRange(state)
    };
  };

  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Board);
