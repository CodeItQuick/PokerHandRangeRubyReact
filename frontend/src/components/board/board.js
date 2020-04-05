import React from "react";
import { Grid } from "semantic-ui-react";
import Hand from "../hand/hand";

const orderedCardInitial = [
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
const Board = ({
  orderedCard = orderedCardInitial,
  onHandClick,
  classColor
}) => {
  const displayCard = (indexCardOne, indexCardTwo, cardOne, cardTwo) => {
    let displaySuit, card1, card2;

    if (indexCardOne < indexCardTwo) {
      displaySuit = "s";
      card1 = cardOne;
      card2 = cardTwo;
    } else if (indexCardOne === indexCardTwo) {
      displaySuit = "";
      card1 = cardOne;
      card2 = cardTwo;
    } else {
      displaySuit = "o";
      card2 = cardOne;
      card1 = cardTwo;
    }

    return (
      <Hand
        key={cardOne + cardTwo}
        cardOne={card1}
        cardTwo={card2}
        suit={displaySuit}
        onHandClick={onHandClick}
        classColor={classColor}
      ></Hand>
    );
  };

  return (
    <Grid>
      <Grid.Row className="card-grid" columns={13}>
        {orderedCard.map((cardOne, indexCardOne) =>
          orderedCard.map((cardTwo, indexCardTwo) =>
            displayCard(indexCardOne, indexCardTwo, cardOne, cardTwo)
          )
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Board;
