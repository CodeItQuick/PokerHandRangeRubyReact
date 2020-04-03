import React from "react";
import { Grid, Button } from "semantic-ui-react";
import styled from "styled-components";

const Hand = ({ onHandClick, cardOne, cardTwo, suit, classColor }) => {
  return (
    <Grid.Column>
      <Button
        onClick={onHandClick}
        name={cardOne + cardTwo + suit}
        className={classColor(cardOne, cardTwo, suit)}
      >
        {cardOne}
        {cardTwo}
        {suit}
      </Button>
    </Grid.Column>
  );
};

export default Hand;
