import React from "react";
import { calculateEquity } from "./EquityCalculations.js";
import { StyledCol, ColorCard, StyledRow } from "./Styles.js";

export const orderedCard = [
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

export const displayCardSuit = (cardOne, cardTwo) => {
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

export const getCards = (cardOne, cardTwo) => {
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

export const generateCardGrid = (PreflopRanges, Position) => {
  let cardClone = {};

  orderedCard.forEach(cardOne =>
    orderedCard.forEach(cardTwo => {
      let hand = getCards(cardOne, cardTwo) + displayCardSuit(cardOne, cardTwo);
      if (PreflopRanges) {
        PreflopRanges.forEach(({ hands }, idx) => {
          if (hands.indexOf(hand) >= 0) {
            cardClone = {
              ...cardClone,
              [hand]: {
                colorCards: ["#8bddbe", "#ed87a7", "#6b6c7c", "#d3d3d3"][idx],
                equity: "n/a"
              }
            };
          }
        });
      }
    })
  );

  return cardClone;
};

export const addEquityCardGrid = (deadcards, otherRange, cards) => {
  let inputBoard = deadcards.reduce((acc, inpCard, idx) => {
    if (idx > 0) return acc + "," + inpCard;
    else return inpCard;
  }, "");
  let inputRange = otherRange.reduce((acc, { hands }) => {
    if (hands.length > 0) return [...acc, ...hands];
    else return acc;
  }, []);
  let newCards = Object.keys(cards).reduce((acc, card) => {
    return {
      ...acc,
      [card]: {
        colorCards: cards[card].colorCards,
        equity: calculateEquity(card, inputBoard, inputRange)
      }
    };
  }, []);
  return newCards;
};

export const generateBoard = (PreflopRangesOnly, bind, cards) => {
  let allPreflopHands = PreflopRangesOnly.reduce((acc, curr) => {
    if (acc.hands && curr.hands) return [...acc.hands, ...curr.hands];
    else return [...acc, ...curr.hands];
  }, []);

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
            coloring={
              cards && cards.hasOwnProperty(cardHand)
                ? cards[cardHand].colorCards
                : "#AAA"
            } //here
            border_attrib={allPreflopHands.indexOf(cardHand) >= 0}
          >
            {cardHand}
            <br />
            {cards && cardHand && cards.hasOwnProperty(cardHand)
              ? cards[cardHand].equity
              : "n/a"}{" "}
            //here
          </ColorCard>
        </StyledCol>
      );
    });
    return <StyledRow xs={13}>{columnJSX}</StyledRow>;
  });
  return setNewManyHands;
};
