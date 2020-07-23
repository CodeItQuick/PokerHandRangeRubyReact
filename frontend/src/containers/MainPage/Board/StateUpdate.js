import React from "react";
import { calculateEquity } from "./EquityCalculations.js";
import { StyledCol, ColorCard, StyledRow } from "./Styles.js";
import CardHandSuit from "./CardHandSuit";
import TableGridColumn from "./TableGridColumn.js";
import { initialState } from "../reducer.js";
import { Table } from "semantic-ui-react";

export default class BoardOfHands {
  constructor(bind) {
    this.orderedCard = [
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
    this.hands = this.generateCardGrid();
    this.PreflopRangesOnly = initialState.ranges.filter(
      ({ Street }) => Street == "Preflop"
    );
    this.bind = bind;
  }

  generateCardGrid() {
    let cardGrid = this.orderedCard.map(cardOne =>
      this.orderedCard.map(cardTwo => {
        let hand = new CardHandSuit(cardOne, cardTwo);
        return hand;
      })
    );
    console.log(cardGrid); //?
    return cardGrid;
  }

  updateCardGrid(PreflopRanges, RangesSelected) {
    let cardClone = {};

    console.log(RangesSelected);

    RangesSelected.forEach(({ hands }, idx) => {
      hands.forEach(
        hand =>
          (cardClone = {
            ...cardClone,
            [hand.cardOne + hand.cardTwo + hand.suit || hand.getHand()]: {
              colorCards: ["#8bddbe", "#ed87a7", "#6b6c7c", "#d3d3d3"][idx],
              equity: "n/a"
            }
          })
      );
    });

    this.PreflopRangesOnly = PreflopRanges;
    this.cards = cardClone;
  }

  view() {
    let allPreflopHands = this.PreflopRangesOnly.reduce((acc, curr) => {
      if (acc.hands && curr.hands) return [...acc.hands, ...curr.hands];
      else return [...acc, ...curr.hands];
    }, []);

    let setNewManyHands = this.hands.map((row, idx) => {
      let columnJSX = row.map(cardHand => {
        return (
          <TableGridColumn
            cardHand={cardHand}
            bind={this.bind}
            allPreflopHands={allPreflopHands}
            cards={this.cards}
          />
        );
      });
      return <StyledRow>{columnJSX}</StyledRow>;
    });
    return <Table.Body id="cardgridtable">{setNewManyHands}</Table.Body>;
  }
}

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

export const generateCardGrid = (PreflopRanges, Position) => {
  let cardClone = {};

  orderedCard.forEach(cardOne =>
    orderedCard.forEach(cardTwo => {
      let hand = new CardHandSuit(cardOne, cardTwo);
      if (PreflopRanges) {
        PreflopRanges.forEach(({ hands }, idx) => {
          if (hand.isInRange(hands)) {
            cardClone = {
              ...cardClone,
              [hand.getHand()]: {
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
