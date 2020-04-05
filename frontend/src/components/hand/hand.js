import React from "react";
import { Grid, Button } from "semantic-ui-react";
import styled from "styled-components";

const Hand = ({ onHandClick, cardOne, cardTwo, suit, classColor = false }) => {
  const classColors = () => {
    if (classColor) return classColor;
    else return "white card-button";
  };

  return (
    <Grid.Column>
      <Button
        onClick={onHandClick}
        name={cardOne + cardTwo + suit}
        className={classColors()}
      >
        {cardOne}
        {cardTwo}
        {suit}
      </Button>
    </Grid.Column>
  );
};

export default Hand;
