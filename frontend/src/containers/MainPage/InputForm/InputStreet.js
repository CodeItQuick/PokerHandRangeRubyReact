import React from "react";
import { Button } from "semantic-ui-react";

const InputStreet = ({ onHandleStreetHandler, street }) => {
  return (
    <Button.Group>
      <Button
        onClick={onHandleStreetHandler}
        id="streetFirstChoice"
        name="Preflop"
        value="Raise4BetCall"
        active={street == "Preflop"}
        inverted
        color="blue"
      >
        Preflop
      </Button>
      <Button.Or />
      <Button
        onClick={onHandleStreetHandler}
        id="streetSecondChoice"
        name="Flop"
        value="Valuebet"
        active={street == "Flop"}
        inverted
        color="blue"
      >
        Flop
      </Button>
      <Button.Or />
      <Button
        onClick={onHandleStreetHandler}
        id="streetThirdChoice"
        name="Turn"
        value="Valuebet"
        active={street == "Turn"}
        inverted
        color="blue"
      >
        Turn
      </Button>
      <Button.Or />
      <Button
        onClick={onHandleStreetHandler}
        id="streetFourthChoice"
        name="River"
        value="Valuebet"
        active={street == "River"}
        inverted
        color="blue"
      >
        River
      </Button>
    </Button.Group>
  );
};

export default InputStreet;
