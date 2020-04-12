import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Button, Menu, Segment } from "semantic-ui-react";

const StyledButton = styled(Button)`
  &&& {
    background-color: ${props => (props.active ? "white !important" : "none")};
    color: ${props => (props.active ? "black !important" : "black")};
    width: 150px;
  }
`;

const StreetSelector = ({ handleStreet, street }) => {
  const Preflop = (
    <Fragment>
      <div>
        <StyledButton
          onClick={handleStreet}
          name="Preflop"
          value="Raise4BetCall"
          color="green"
          disabled={street !== "Preflop"}
        >
          Raise/4bet/Call
        </StyledButton>
      </div>
      <div>
        <StyledButton
          onClick={handleStreet}
          name="Preflop"
          value="Raise4BetFold"
          color="blue"
          disabled={street !== "Preflop"}
        >
          Raise/4bet/fold
        </StyledButton>
      </div>
      <div>
        <StyledButton
          onClick={handleStreet}
          name="Preflop"
          value="RaiseCall"
          color="purple"
          disabled={street !== "Preflop"}
        >
          Raise/Call
        </StyledButton>
      </div>
      <div>
        <StyledButton
          onClick={handleStreet}
          name="Preflop"
          value="RaiseFold"
          color="red"
          disabled={street !== "Preflop"}
        >
          Raise/Fold
        </StyledButton>
      </div>
    </Fragment>
  );

  const Flop = (
    <Fragment>
      <StyledButton
        onClick={handleStreet}
        name="Flop"
        value="Valuebet"
        color="green"
        disabled={street !== "Flop"}
      >
        Valuebet
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="Flop"
        value="Bluff"
        color="blue"
        disabled={street !== "Flop"}
      >
        bluff
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="Flop"
        value="CheckCall"
        color="purple"
        disabled={street !== "Flop"}
      >
        Check/Call
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="Flop"
        value="CheckFold"
        color="red"
        disabled={street !== "Flop"}
      >
        Check/Fold
      </StyledButton>
    </Fragment>
  );
  const Turn = (
    <Fragment>
      <StyledButton
        onClick={handleStreet}
        name="Turn"
        value="Valuebet"
        color="green"
        disabled={street !== "Turn"}
      >
        Valuebet
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="Turn"
        value="Bluff"
        color="blue"
        disabled={street !== "Turn"}
      >
        bluff
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="Turn"
        value="CheckCall"
        color="purple"
        disabled={street !== "Turn"}
      >
        Check/Call
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="Turn"
        value="CheckFold"
        color="red"
        disabled={street !== "Turn"}
      >
        Check/Fold
      </StyledButton>
    </Fragment>
  );

  const River = (
    <Fragment>
      <StyledButton
        onClick={handleStreet}
        name="River"
        value="Valuebet"
        color="green"
        disabled={street !== "River"}
      >
        Valuebet
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="River"
        value="Bluff"
        color="blue"
        disabled={street !== "River"}
      >
        bluff
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="River"
        value="CheckCall"
        color="purple"
        disabled={street !== "River"}
      >
        Check Turn Call
      </StyledButton>
      <StyledButton
        onClick={handleStreet}
        name="River"
        value="CheckFold"
        color="red"
        disabled={street !== "River"}
      >
        Check Turn Fold
      </StyledButton>
    </Fragment>
  );
  return (
    <Fragment>
      <Menu attached="top" tabular>
        <Menu.Item
          onClick={handleStreet}
          name="Preflop"
          value="Raise4BetCall"
          color="black"
        >
          Preflop
        </Menu.Item>
        <Menu.Item
          onClick={handleStreet}
          name="Flop"
          value="Valuebet"
          color="black"
        >
          Flop
        </Menu.Item>
        <Menu.Item
          onClick={handleStreet}
          name="Turn"
          value="Valuebet"
          color="black"
        >
          Turn
        </Menu.Item>
        <Menu.Item
          onClick={handleStreet}
          name="River"
          value="Valuebet"
          color="black"
        >
          River
        </Menu.Item>
      </Menu>
      <Segment attached="bottom">
        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
          {street === "Preflop" ? Preflop : null}
          {street === "Flop" ? Flop : null}
          {street === "Turn" ? Turn : null}
          {street === "River" ? River : null}
        </div>
      </Segment>
    </Fragment>
  );
};

export default StreetSelector;
