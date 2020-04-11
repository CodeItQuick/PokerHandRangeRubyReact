import React, { useState, useEffect, memo } from "react";
import { Grid, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import { setHandRange } from "../actions.js";

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
            if (rangeColors[cardColors].indexOf(hands) >= 0) {
              cardClone = {
                ...cardClone,
                [hands]: { colorCards: cardColors + " button-card" }
              };
              console.log(cardClone);
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

    orderedCard.forEach(cardOne =>
      orderedCard.forEach(cardTwo => {
        toSetManyHands = [
          ...toSetManyHands,
          <Grid.Column>
            <Button
              onClick={handClickHandler}
              className={
                cards[
                  [
                    getCards(cardOne, cardTwo) +
                      displayCardSuit(cardOne, cardTwo)
                  ]
                ]
                  ? cards[
                      [
                        getCards(cardOne, cardTwo) +
                          displayCardSuit(cardOne, cardTwo)
                      ]
                    ].colorCards
                  : "white button-card"
              }
              hand={
                getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo)
              }
            >
              {getCards(cardOne, cardTwo)}
              {displayCardSuit(cardOne, cardTwo)}
            </Button>
          </Grid.Column>
        ];
      })
    );

    setManyHands(toSetManyHands);
  }, [rangeColors, cards]);

  return (
    <Grid>
      <Grid.Row columns={13}>{manyHands}</Grid.Row>
    </Grid>
  );
};

export default Board;
