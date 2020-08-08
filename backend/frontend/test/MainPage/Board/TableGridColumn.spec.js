import React from "react";

import CardHandSuit from "../../../src/containers/MainPage/Board/CardHandSuit";
import { colorCell } from "../../../src/containers/MainPage/Board/TableGridColumn";

describe("Table Grid Column", () => {
  test(" the function colorCell returns the given colorCard suit", () => {
    const cards = { "77": { colorCards: "#8bddbe", equity: "n/a" } };
    const cardHandSuit = new CardHandSuit("7", "7", "");

    const result = colorCell(cards, cardHandSuit);

    expect(result).toBe("#8bddbe");
  });
});
