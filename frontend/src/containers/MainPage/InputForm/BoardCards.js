import React, { Fragment, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";

import styled from "styled-components";

const styledCardBack = styled.img``;

const BoardCard = (displayCard, idx) => (
  <img id={"Board" + idx + "Card"} alt="first card" src={displayCard} />
);

const StyledRow = styled(Row)`
  width: 80%;
`;

const BoardCards = ({ deadCards }) => {
  const [flippinCards, updateFlippinCards] = useState([]);

  useEffect(() => {
    if (deadCards && deadCards.indexOf(",") >= 0) {
      let flippinCardsClone = deadCards.split(",");
      flippinCardsClone = flippinCardsClone.map(cards =>
        cards.toUpperCase().trim()
      );
      updateFlippinCards(flippinCardsClone);
    }
  }, [deadCards]);

  return (
    <StyledRow>
      <Col md={6} lg={6}>
        <h4>Flop</h4>
        {Array.isArray(flippinCards) && flippinCards.length > 0
          ? BoardCard(flippinCards[0] + ".png", 0)
          : BoardCard("/assets/cards/back.png", 0)}

        {Array.isArray(flippinCards) && flippinCards.length > 1
          ? BoardCard(flippinCards[1] + ".png", 1)
          : BoardCard("/assets/cards/back.png", 1)}

        {Array.isArray(flippinCards) && flippinCards.length > 2
          ? BoardCard(flippinCards[2] + ".png", 2)
          : BoardCard("/assets/cards/back.png", 2)}
      </Col>
      <Col md={3} lg={3}>
        {Array.isArray(flippinCards) && flippinCards.length > 3
          ? BoardCard(flippinCards[3] + ".png", 3)
          : BoardCard("/assets/cards/back.png", 3)}
      </Col>
      <Col md={3} lg={3}>
        {Array.isArray(flippinCards) && flippinCards.length > 4
          ? BoardCard(flippinCards[4] + ".png", 4)
          : BoardCard("/assets/cards/back.png", 4)}
      </Col>
    </StyledRow>
  );
};

export default BoardCards;
