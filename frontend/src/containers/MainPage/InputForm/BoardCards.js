import React, { Fragment, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";

import styled from "styled-components";

const cardBack = (
  <img alt="first card" style={{ height: 70 }} src={"/assets/cards/back.png"} />
);

const StyledRow = styled(Row)`
  width: 80%;
`;

const BoardCards = ({ cardsFlipped }) => {
  const [flippinCards, updateFlippinCards] = useState([]);

  useEffect(() => {
    if (cardsFlipped && cardsFlipped.indexOf(",") >= 0) {
      let flippinCardsClone = cardsFlipped.split(",");
      flippinCardsClone = flippinCardsClone.map(cards =>
        cards.toUpperCase().trim()
      );
      updateFlippinCards(flippinCardsClone);
    }
  }, [cardsFlipped]);

  return (
    <StyledRow>
      <Col md={6} lg={6}>
        <h4>Flop</h4>
        {Array.isArray(flippinCards) && flippinCards.length > 0 ? (
          <img
            alt="first card"
            src={"/assets/cards/" + flippinCards[0] + ".png"}
          />
        ) : (
          cardBack
        )}
        {Array.isArray(flippinCards) && flippinCards.length > 1 ? (
          <img
            alt="second card"
            src={"/assets/cards/" + flippinCards[1] + ".png"}
          />
        ) : (
          cardBack
        )}
        {Array.isArray(flippinCards) && flippinCards.length > 2 ? (
          <img
            alt="third card"
            src={"/assets/cards/" + flippinCards[2] + ".png"}
          />
        ) : (
          cardBack
        )}
      </Col>
      <Col md={3} lg={3}>
        <h4>Turn</h4>
        {Array.isArray(flippinCards) && flippinCards.length > 3 ? (
          <img
            alt="fourth card"
            src={"/assets/cards/" + flippinCards[3] + ".png"}
          />
        ) : (
          cardBack
        )}
      </Col>
      <Col md={3} lg={3}>
        <h4>River</h4>
        {Array.isArray(flippinCards) && flippinCards.length > 4 ? (
          <img
            alt="fifth card"
            src={"/assets/cards/" + flippinCards[4] + ".png"}
          />
        ) : (
          cardBack
        )}
      </Col>
    </StyledRow>
  );
};

export default BoardCards;
