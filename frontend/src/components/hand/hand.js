import React from "react";
import { Grid, Button } from "semantic-ui-react";
import styled from "styled-components";

function Hand(props) {
  const { handOnClick, cardOne, cardTwo, suit, classColor } = props;

  return (
    <Grid.Column>
      <Button
        onClick={handOnClick}
        name={cardOne + cardTwo + suit}
        className={classColor()}
      >
        {cardOne}
        {cardTwo}
        {suit}
      </Button>
    </Grid.Column>
  );
}

export default Hand;
