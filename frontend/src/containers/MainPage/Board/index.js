import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import { Grid, Button } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";

import { setHandRange } from "../actions.js";
import styled from "styled-components";

const ColorCard = styled.button`
  padding-left: 0px;
  padding-right: 2px;
  width: 100% !important;
  height: 20px !important;
  margin: 0px;
  font-size: 7px;
  text-align: center;
  color: white;
  background-color: ${props => props.coloring};

  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 20px;
    padding: 0px;
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 30px;
    padding: 0px;
    font-size: 12px;
  }
  @media (min-width: 992px) {
    width: 30px;
    padding: 0px;
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
  height: 20px !important;
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

const Board = ({ handClickHandler, ranges, rangeColors, mode }) => {
  const [manyHands, setManyHands] = useState();
  const [cards, setCards] = useState({});
  const dispatch = useDispatch();

  console.log(rangeColors, ranges, mode);

  useEffect(() => {
    let cardClone = {};

    orderedCard.forEach(cardOne =>
      orderedCard.forEach(cardTwo => {
        let hands =
          getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo);
        if (rangeColors) {
          Object.keys(rangeColors).forEach(cardColors => {
            if (
              rangeColors[cardColors] &&
              rangeColors[cardColors].indexOf(hands) >= 0
            ) {
              cardClone = {
                ...cardClone,
                [hands]: { colorCards: cardColors }
              };
            }
          });
        }
      })
    );

    console.log(cardClone);
    setCards(cardClone);
  }, [rangeColors]);

  console.log(cards["AKs"] ? cards["AKs"].colorCards : cards);

  useEffect(() => {
    let toSetManyHands = [];

    toSetManyHands = orderedCard.map(cardOne =>
      orderedCard.reduce((acc, cardTwo, idx) => {
        acc.push([cardOne, cardTwo]);
        return acc;
      }, [])
    );
    console.log(toSetManyHands);
    let setNewManyHands = toSetManyHands.map((row, idx) => {
      let columnJSX = row.map(([cardOne, cardTwo]) => (
        <StyledCol xs={1}>
          <ColorCard
            onClick={e =>
              handClickHandler(e, {
                cards:
                  getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo)
              })
            }
            hand={
              getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo)
            }
            coloring={
              cards[
                getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo)
              ]
                ? cards[
                    [
                      getCards(cardOne, cardTwo) +
                        displayCardSuit(cardOne, cardTwo)
                    ]
                  ].colorCards
                : "#AAA"
            }
          >
            {[getCards(cardOne, cardTwo), displayCardSuit(cardOne, cardTwo)]}
          </ColorCard>
        </StyledCol>
      ));
      return <StyledRow xs={13}>{columnJSX}</StyledRow>;
    });
    setManyHands(setNewManyHands);
  }, [rangeColors, cards]);

  return <Container fluid>{manyHands}</Container>;
};

export default Board;
