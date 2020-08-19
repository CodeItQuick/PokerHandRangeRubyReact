import React from "react";
import { Button, Segment } from "semantic-ui-react";

const InputStreet = ({ onHandleStreetHandler, street }) => {
  return (
    <Segment.Group
      size="tiny"
      horizontal
      style={{ height: "40px", fontSize: "12px !important" }}
    >
      <Segment
        id="streetFirstChoice"
        name="Preflop"
        value="Raise4BetCall"
        inverted={street == "Preflop"}
        color="blue"
      >
        Preflop
      </Segment>
      <Segment
        id="streetSecondChoice"
        name="Flop"
        value="Valuebet"
        inverted={street == "Flop"}
        color="blue"
      >
        Flop
      </Segment>
      <Segment
        id="streetThirdChoice"
        name="Turn"
        value="Valuebet"
        inverted={street == "Turn"}
        color="blue"
      >
        Turn
      </Segment>
      <Segment
        id="streetFourthChoice"
        name="River"
        value="Valuebet"
        inverted={street == "River"}
        color="blue"
      >
        River
      </Segment>
    </Segment.Group>
  );
};

export default InputStreet;
