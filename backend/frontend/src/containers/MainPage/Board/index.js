import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import { Grid, Button } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";
import { useDrag, useGesture, useMove } from "react-use-gesture";
import { useSpring, animated } from "react-spring";

import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectRangesPreflop,
  makeSelectRangesPreflopOnly
} from "../selectors";

import { setHandRange } from "../actions.js";
import styled from "styled-components";

//TODO: implement interact.js or draggable instead of this react library

const ColorCard = styled(animated.button)`
  cursor: pointer;
  padding-left: 0px;
  padding-right: 2px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100% !important;
  height: 40px !important;
  margin: 0px;
  font-size: 7px;
  text-align: center;
  color: black;
  background-color: ${props => props.coloring};
  ${props =>
    props.border_attrib ? "border: 3px dashed black;" : "border: none;"}
  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 20px;
    padding: 5px;
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 30px;
    padding: 5px;
    font-size: 12px;
  }
  @media (min-width: 992px) {
    width: 30px;
    padding: 10px;
    font-size: 12px;
  }
`;

const StyledRow = styled(Row)`
  margin: 0px;
  width: 100%;
  flex-wrap: nowrap !important;
`;

const StyledCol = styled(Col)`
  margin: 0px;
  width: 100% !important;
  height: 40px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  justify-content: flex-start;
`;
const orderedCard = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2"
];
const displayCardSuit = (cardOne, cardTwo) => {
  let displaySuit = "";
  if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
    displaySuit = "s";
  } else if (cardOne === cardTwo) {
    displaySuit = "";
  } else {
    displaySuit = "o";
  }
  return displaySuit;
};

let getCards = (cardOne, cardTwo) => {
  let card1 = "",
    card2 = "";
  if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
    card1 = cardOne;
    card2 = cardTwo;
  } else if (cardOne === cardTwo) {
    card1 = cardOne;
    card2 = cardTwo;
  } else {
    card1 = cardTwo;
    card2 = cardOne;
  }
  return card1 + card2;
};

const Board = ({ onMouseOverHandler, PreflopRanges, PreflopRangesOnly }) => {
  const [manyHands, setManyHands] = useState();
  const [cards, setCards] = useState({});

  //This sets the cards to a value for reading later, listing the cards and
  //the color in a single column is annoying/tedious
  useEffect(() => {
    let cardClone = {};

    orderedCard.forEach(cardOne =>
      orderedCard.forEach(cardTwo => {
        let hand =
          getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo);
        if (PreflopRanges) {
          PreflopRanges.forEach(({ Street, BetType, hands }, idx) => {
            if (hands.indexOf(hand) >= 0) {
              cardClone = {
                ...cardClone,
                [hand]: {
                  colorCards: ["#8bddbe", "#ed87a7", "#6b6c7c", "#d3d3d3"][idx]
                }
              };
            }
          });
        }
      })
    );

    setCards(cardClone);
  }, [PreflopRanges]);

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
            </ColorCard>
          </StyledCol>
        );
      });
      return <StyledRow xs={13}>{columnJSX}</StyledRow>;
    });

    setManyHands(setNewManyHands);
  }, [cards, bind, PreflopRangesOnly]);

  return <Container fluid>{manyHands}</Container>; //TO-DO: BUG this generates console error
};

const mapStateToProps = () => {
  const getRangesPreflop = makeSelectRangesPreflop();
  const getRangesPreflopOnly = makeSelectRangesPreflopOnly();

  const mapState = state => {
    return {
      PreflopRanges: getRangesPreflop(state),
      PreflopRangesOnly: getRangesPreflopOnly(state)
    };
  };

  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(Board);
