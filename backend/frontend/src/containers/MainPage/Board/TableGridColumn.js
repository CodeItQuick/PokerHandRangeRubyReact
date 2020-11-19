import React, { useState, useEffect } from "react";
import { StyledCol, ColorCard } from "./Styles.js";
import { findInArray } from "../EngineClasses/findInArray";
import { colorCell } from "../EngineClasses/colorCellFn";

const TableGridColumn = ({ cardHand, bind, allPreflopHands, cards }) => {
  const [suitString, updateSuitString] = useState();
  useEffect(() => {
    const newColors = colorCell(cards, cardHand);
    if (findInArray(cards, cardHand).length > 0) {
      let newCSSGradient = newColors.reduce(
        (acc, color) => acc + color + " , ",
        ""
      );
      newCSSGradient = newCSSGradient.substr(0, newCSSGradient.length - 3);
      updateSuitString(newCSSGradient);
    } else {
      updateSuitString("#DDD");
    }
  }, [cardHand, cards]);
  return (
    <StyledCol
      key={cardHand}
      id={"colorColumnButton" + cardHand.getHand()}
      border_attrib={"" + cardHand.isInRange(allPreflopHands)}
      suitString={suitString || ""}
    >
      <ColorCard
        key={"colorcard" + cardHand.getHand()}
        id={"colorButton" + cardHand.getHand()}
        {...bind(cardHand.getHand())}
        hand={cardHand.getHand()}
      >
        {cardHand.getHand()}
      </ColorCard>
    </StyledCol>
  );
};

export default TableGridColumn;
