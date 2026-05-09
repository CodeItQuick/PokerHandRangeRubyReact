import React from "react";
import { StyledCol, ColorCard, StyledRow } from "../Board/Styles.js";

import { StartingHandBuilder } from "./StartingHandBuilder";
import TableGridColumn from "../Board/TableGridColumn";
import RangeObject from "./RangeObject";

import { initialState } from "../reducer.js";
import { Table } from "semantic-ui-react";

export default class BoardOfHands {
  constructor(bind) {
    this.rankOrder = [
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
      "2",
    ];
    this.handGrid = this.generateCardGrid();
    this.preflopRanges = initialState.ranges
      .filter(({ Street, BetType }) => {
        if (Street === "Flop") return Street === "Preflop";
        if (Street === "Turn")
          return (
            Street === "Flop" && (BetType === "Valuebet" || BetType === "Bluff")
          );
        if (Street === "River")
          return (
            Street === "Turn" && (BetType === "Valuebet" || BetType === "Bluff")
          );
      })
      .map(
        ({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
      );
    this.bind = bind;
  }

  generateCardGrid() {
    let cardGrid = this.rankOrder.map((cardOne) =>
      this.rankOrder.map((cardTwo) =>
        new StartingHandBuilder().build(cardOne, cardTwo)
      )
    );
    return cardGrid;
  }

  updateCardGrid(preflopRanges, selectedRanges) {
    let handColorMap;

    handColorMap = selectedRanges.reduce((acc, rangeObject) => {
      if (rangeObject.displayInfo() === {}) return acc;
      else return { ...acc, ...rangeObject.displayInfo() };
    }, {});

    this.preflopRanges = preflopRanges;
    this.handColorMap = handColorMap;
  }

  view() {
    let allPreflopHands = this.preflopRanges.map((rangeObject) =>
      rangeObject.allHandsOneArray()
    );

    let gridRows = this.handGrid.map((row, idx) => {
      let rowCells = row.map((startingHand) => {
        return (
          <TableGridColumn
            cardHand={startingHand}
            bind={this.bind}
            allPreflopHands={allPreflopHands}
            cards={this.handColorMap}
          />
        );
      });
      return <StyledRow>{rowCells}</StyledRow>;
    });
    return <Table.Body id="cardgridtable">{gridRows}</Table.Body>;
  }
}

export const rankOrder = [
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
  "2",
];

export const generateCardGrid = (preflopRanges, position) => {
  let handColorMap = {};

  preflopRanges.forEach(({ hands }, idx) => {
    hands.forEach((hand) => {
      handColorMap = {
        ...handColorMap,
        [hand.getHand()]: {
          colorCards: [
            "#0F6125",
            "#ed87a7",
            "#3ac0ff",
            "#dc73ff",
            "#003d3e",
            "#8A4000",
          ][idx],
          equity: "n/a",
        },
      };
    });
  });

  return handColorMap;
};
