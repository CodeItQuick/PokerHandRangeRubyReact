import React, { useState, useEffect } from "react";
import { StyledCol, ColorCard } from "./Styles.js";
import {
  equalSuitedHands,
  equalOffsuitedHands,
  equalPairsSpecificCombos,
  findInArray,
} from "../EngineClasses/findInArray";

export const colorCell = (cards, cardHand) => {
  if (Object.keys(cards).length > 0) {
    const arrayOfCardsToColor = findInArray(cards, cardHand);
    const isCardInArrayOfCardsToColor = arrayOfCardsToColor.filter((find) =>
      Object.keys(cards).includes(find)
    );
    const isSpecificHandSuited = isCardInArrayOfCardsToColor.filter((card) =>
      equalSuitedHands(card, cardHand)
    );
    console.log(isSpecificHandSuited); //?
    const isSpecificHandOffsuit = isCardInArrayOfCardsToColor.filter((card) =>
      equalOffsuitedHands(card, cardHand)
    );
    const isSpecificHandPair = isCardInArrayOfCardsToColor.filter((card) =>
      equalPairsSpecificCombos(card, cardHand)
    );

    console.log(
      isCardInArrayOfCardsToColor.filter((card) =>
        equalSuitedHands(card, cardHand)
      )
    ); //?
    if (isCardInArrayOfCardsToColor[0]?.length <= 3)
      return (
        isCardInArrayOfCardsToColor.map((copy) => cards[copy].colorCards) || [
          "#DDD",
        ]
      );
    else if (isSpecificHandSuited.length) {
      const fourElementArray = ["ss", "dd", "hh", "cc"].map(
        (_, idx) => isSpecificHandSuited[idx] || ""
      );
      return fourElementArray.map((copy) => cards[copy]?.colorCards || "#DDD");
    } else if (isSpecificHandOffsuit.length) {
      const sixteenElementArray = [
        "sd",
        "sh",
        "sc",
        "cs",
        "cd",
        "ch",
        "hs",
        "hd",
        "hc",
        "ds",
        "dh",
        "dc",
      ].map((_, idx) => isSpecificHandOffsuit[idx] || "");
      return sixteenElementArray.map(
        (copy) => cards[copy]?.colorCards || "#DDD"
      );
    } else if (isSpecificHandPair.length) {
      const sixElementArray = ["sd", "sh", "sc", "cs", "cd", "dh"].map(
        (_, idx) => isSpecificHandPair[idx] || ""
      );
      return sixElementArray.map((copy) => cards[copy]?.colorCards || "#DDD");
    }
  }
  return ["#DDD"];
};

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
