import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import { Grid, Button } from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";

import { setHandRange } from "../actions.js";
import styled from "styled-components";

const ColorCard = styled.button`
  padding: 6px;
  width: 45px;
  text-align: center;
  color: white;
  background-color: ${props => props.coloring};
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
        <ColorCard
          onClick={e =>
            handClickHandler(e, {
              cards:
                getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo)
            })
          }
          hand={getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo)}
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
      ));
      return <Row>{columnJSX}</Row>;
    });
    setManyHands(setNewManyHands);
  }, [rangeColors, cards]);

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexWrap: "no-wrap"
      }}
    >
      {manyHands}
    </div>
  );
};

export default Board;
