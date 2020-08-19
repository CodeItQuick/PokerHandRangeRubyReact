import React, { useState, useEffect } from "react";
import { StyledCol, ColorCard } from "./Styles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "semantic-ui-react";
import { findInArray } from "./findInArray";

export const colorCell = (cards, cardHand) => {
  if (Object.keys(cards).length > 0) {
    const findInArrays = findInArray(cards, cardHand);
    if (findInArrays.filter(find => Object.keys(cards).includes(find)))
      return findInArrays.length > 0
        ? findInArrays
            .filter(find => Object.keys(cards).includes(find))
            .map(copy => cards[copy].colorCards)
        : ["#DDD"];
  }
  return ["#DDD"];
};

const TableGridColumn = ({ cardHand, bind, allPreflopHands, cards }) => {
  const [colors, updateColor] = useState();
  const [suitString, updateSuitString] = useState();
  useEffect(() => {
    updateColor(colorCell(cards, cardHand));
    if (findInArray(cards, cardHand).length > 0) {
      let newCSSGradient = findInArray(cards, cardHand).reduce(
        (acc, card, idx) => acc + cards[card].colorCards + " , ",
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
      coloring={colors}
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
