import React, { useState, useEffect } from "react";
import { StyledCol, ColorCard } from "./Styles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "semantic-ui-react";

export const colorCell = (cards, cardHand) => {
  if (Object.keys(cards).length > 0) {
    let findInArray = Object.keys(cards).filter(
      card =>
        cardHand.getHand().substr(0, 2) == card.substr(0, 2) &&
        (cardHand.getHand().substr(0, 1) === card.substr(1, 1) ||
          cardHand.getHand().substr(2, 1) === card.substr(2, 1))
    );
    return findInArray.length > 0 ? cards[findInArray[0]].colorCards : "DDD";
  }
  return "DDD";
};

const suits = { Spade: "♠︎", Heart: "♥︎", Club: "♣︎", Diamond: "♦︎" };
const getCSSGradient = (cards, cardHandString) => {
  let currentHand = false;
  Object.keys(cards).forEach(card => {
    if (card.search(cardHandString) >= 0) currentHand = cards[card];
  });
  if (!currentHand) return "";

  return currentHand.colorCards;
};

const TableGridColumn = ({ cardHand, bind, allPreflopHands, cards }) => {
  const [colors, updateColor] = useState();
  const [suitString, updateSuitString] = useState();
  useEffect(() => {
    updateColor(colorCell(cards, cardHand));
    if (
      Object.keys(cards).filter(card => card.search(cardHand.getHand()) >= 0)
        .length > 0
    ) {
      let newCSSGradient = Object.keys(cards)
        .filter(card => card.search(cardHand.getHand()) >= 0)
        .reduce(
          (acc, card, idx) =>
            acc +
            getCSSGradient({ [card]: { ...cards[card] } }, cardHand) +
            " , ",
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
