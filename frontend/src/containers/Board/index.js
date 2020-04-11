import React, { useState, useEffect, memo } from "react";
import { Grid, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { makeSelectRangeColors, makeSelectRanges } from "./selectors";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { compose } from "redux";
import reducer from "./reducer.js";
import useInjectReducer from "../../HOC/useInjectReducer";
import { updateRangeColors } from "./action";
import { makeSelectMode } from "../MainPage/selectors";

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
  return { card1, card2 };
};

const key = "global";

const Board = ({ ranges, rangeColors, mode }) => {
  const [manyHands, setManyHands] = useState();
  const dispatch = useDispatch();
  const [cards, setCards] = useState({
    green: ["AA"],
    blue: ["KK"],
    purple: ["QQ"],
    red: ["JJ"]
  });
  const [hand, setHands] = useState({});
  useInjectReducer({ key, reducer });

  console.log(rangeColors, ranges, mode);

  const handClickHandler = (e, data) => {
    console.log(e);
    console.log(data);
    dispatch(updateRangeColors({ hand: data.hand }));
    setCards({
      green: ["AA"],
      blue: ["KK"],
      purple: ["QQ"],
      red: ["JJ"]
    });
  };
  useEffect(() => {
    let handClone = {};

    orderedCard.forEach(cardOne =>
      orderedCard.forEach(cardTwo => {
        let hands =
          getCards(cardOne, cardTwo).card1 +
          getCards(cardOne, cardTwo).card2 +
          displayCardSuit(cardOne, cardTwo);
        Object.keys(cards).map(cardColors => {
          if (cards[[cardColors]].indexOf(hands) >= 0)
            handClone[hands] = cardColors + " button-card";
          else if (!handClone[hands]) handClone[hands] = "white button-card";
        });
      })
    );
    setHands(handClone);
  }, [cards]);

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
                hand[
                  [
                    getCards(cardOne, cardTwo).card1 +
                      getCards(cardOne, cardTwo).card2 +
                      displayCardSuit(cardOne, cardTwo)
                  ]
                ]
              }
              hand={
                getCards(cardOne, cardTwo).card1 +
                getCards(cardOne, cardTwo).card2 +
                displayCardSuit(cardOne, cardTwo)
              }
            >
              {getCards(cardOne, cardTwo).card1}
              {getCards(cardOne, cardTwo).card2}
              {displayCardSuit(cardOne, cardTwo)}
            </Button>
          </Grid.Column>
        ];
      })
    );
    setManyHands(toSetManyHands);
  }, [hand]);

  return (
    <Grid>
      <Grid.Row columns={13}>{manyHands}</Grid.Row>
    </Grid>
  );
};

const makeMapStateToProps = createStructuredSelector({
  rangeColors: makeSelectRangeColors(),
  ranges: makeSelectRanges(),
  mode: makeSelectMode()
}); //?

const withConnect = connect(makeMapStateToProps, null);

export default compose(withConnect, memo)(Board);
