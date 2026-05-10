import React, { useState, useEffect } from "react";
import { StyledCol, ColorCard } from "./Styles.js";
import { findMatchingHandKeys } from "../EngineClasses/findMatchingHandKeys";
import { colorCell } from "../EngineClasses/colorCellFn";

const TableGridColumn = ({
  startingHand,
  bind,
  allPreflopHands,
  handColorMap,
}) => {
  const [cellGradient, updateCellGradient] = useState();
  useEffect(() => {
    const cellColors = colorCell(handColorMap, startingHand);
    if (findMatchingHandKeys(handColorMap, startingHand).length > 0) {
      let cssGradient = cellColors.reduce(
        (acc, color) => acc + color + " , ",
        ""
      );
      cssGradient = cssGradient.substr(0, cssGradient.length - 3);
      updateCellGradient(cssGradient);
    } else {
      updateCellGradient("#DDD");
    }
  }, [startingHand, handColorMap]);
  return (
    <StyledCol
      key={startingHand}
      id={"colorColumnButton" + startingHand.getHand()}
      border_attrib={"" + startingHand.isInRange(allPreflopHands)}
      cellGradient={cellGradient || ""}
    >
      <ColorCard
        key={"colorcard" + startingHand.getHand()}
        id={"colorButton" + startingHand.getHand()}
        {...bind(startingHand.getHand())}
        hand={startingHand.getHand()}
      >
        {startingHand.getHand()}
      </ColorCard>
    </StyledCol>
  );
};

export default TableGridColumn;
