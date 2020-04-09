import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Hand from "../hand/hand";

const Board = ({ onHandClick, ranges = [] }) => {
  const [manyHands, setManyHands] = useState();

  useEffect(() => {
    const orderedCard1 = [
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
    const orderedCard2 = [
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
    console.log(ranges);

    let displayCardSuit = (cardOne, cardTwo) => {
      let displaySuit = "";
      if (orderedCard1.indexOf(cardOne) < orderedCard1.indexOf(cardTwo)) {
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
      if (orderedCard1.indexOf(cardOne) < orderedCard1.indexOf(cardTwo)) {
        card1 = cardOne;
        card2 = cardTwo;
      } else if (cardOne === cardTwo) {
        card1 = cardOne;
        card2 = cardTwo;
      } else {
        card1 = cardOne;
        card2 = cardTwo;
      }
      return { card1, card2 };
    };
    let toSetManyHands = [];
    console.log(orderedCard1);

    orderedCard1.forEach(cardOne =>
      orderedCard2.forEach(cardTwo => {
        console.log(displayCardSuit(cardOne, cardTwo)); //?
        toSetManyHands = [
          ...toSetManyHands,
          <Hand
            key={cardOne + cardTwo + displayCardSuit(cardOne, cardTwo)}
            cards={cardOne + cardTwo + displayCardSuit(cardOne, cardTwo)}
            onHandClick={onHandClick}
            colorCard={
              ranges.length > 0 &&
              ranges.indexOf(
                cardOne + cardTwo + displayCardSuit(cardOne, cardTwo)
              ) >= 0
                ? "green button-card"
                : "white button-card"
            }
          ></Hand>
        ];
      })
    );
    setManyHands(toSetManyHands);
  }, [ranges, onHandClick]);

  return (
    <Grid>
      <Grid.Row className="card-grid" columns={13}>
        {manyHands}
      </Grid.Row>
    </Grid>
  );
};

export default Board;
