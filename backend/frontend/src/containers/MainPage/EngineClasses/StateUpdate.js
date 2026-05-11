import React from "react";
import { StyledCol, ColorCard, StyledRow } from "../Board/Styles.js";

import { StartingHandBuilder } from "./StartingHandBuilder";
import TableGridColumn from "../Board/TableGridColumn";
import HandRange from "./HandRange";

import { initialState } from "../reducer.js";
import { Table } from "semantic-ui-react";

export default class StartingHandGrid {
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
    this.handGrid = this.generateHandGrid();
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
        ({ Street, BetType, hands }) => new HandRange(Street, BetType, hands)
      );
    this.bind = bind;
  }

  generateHandGrid() {
    let handGrid = this.rankOrder.map((firstRank) =>
      this.rankOrder.map((secondRank) =>
        new StartingHandBuilder().build(firstRank, secondRank)
      )
    );
    return handGrid;
  }

  updateCardGrid(preflopRanges, selectedRanges) {
    let handColorMap;

    handColorMap = selectedRanges.reduce((acc, handRange) => {
      if (handRange.toHandColorMap() === {}) return acc;
      else return { ...acc, ...handRange.toHandColorMap() };
    }, {});

    this.preflopRanges = preflopRanges;
    this.handColorMap = handColorMap;
  }

  view() {
    let allPreflopHands = this.preflopRanges.map((handRange) =>
      handRange.allStartingHands()
    );

    let gridRows = this.handGrid.map((row, index) => {
      let rowCells = row.map((startingHand) => {
        return (
          <TableGridColumn
            cardHand={startingHand}
            bind={this.bind}
            allPreflopHands={allPreflopHands}
            handColorMap={this.handColorMap}
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

export const buildHandColorMap = (preflopRanges, position) => {
  let handColorMap = {};

  preflopRanges.forEach(({ hands }, index) => {
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
          ][index],
          equity: "n/a",
        },
      };
    });
  });

  return handColorMap;
};
