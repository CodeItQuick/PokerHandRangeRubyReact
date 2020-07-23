import React from "react";
import { StyledCol, ColorCard } from "./Styles.js";

const TableGridColumn = ({ cardHand, bind, allPreflopHands, cards }) => {
  return (
    <StyledCol key={cardHand}>
      <ColorCard
        key={"colorcard" + cardHand.getHand()}
        id={"colorButton" + cardHand.getHand()}
        {...bind(cardHand.getHand())}
        hand={cardHand.getHand()}
        coloring={
          cards && cards.hasOwnProperty(cardHand.getHand())
            ? cards[cardHand.getHand()].colorCards
            : "555"
        }
        border_attrib={cardHand.isInRange(allPreflopHands)}
      >
        {cardHand.getHand()}
        <br />
        {"n/a"}
      </ColorCard>
    </StyledCol>
  );
};

export default TableGridColumn;
