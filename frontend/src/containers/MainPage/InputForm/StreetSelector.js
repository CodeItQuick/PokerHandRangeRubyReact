import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Button, Menu, Segment } from "semantic-ui-react";

// TODO: FIX The colors so they use a palette

const StyledButton = styled(Button)`
  &&& {
    background-color: ${({ color }) => (color ? color : "none")}
    width: 100%;
  }
`;

const StreetSelector = ({ onHandleStreetHandler, mode }) => {
  const [fourButtons, updateFourButtons] = useState();
  const streetActions = {
    Preflop: ["Raise4BetCall", "Raise4BetFold", "RaiseCall", "RaiseFold"],
    Postflop: ["Valuebet", "Bluff", "CheckCall", "CheckFold"]
  };
  const colors = ["#8BDDBE", "#ED87A7", "#6B6C7C", "#D3D3D3"];

  useEffect(() => {
    let toStreetButtons = [];
    streetActions[mode.street === "Preflop" ? "Preflop" : "Postflop"].forEach(
      (streetAction, idx) =>
        (toStreetButtons = [
          ...toStreetButtons,
          <StyledButton
            id={mode.street + streetAction}
            onClick={onHandleStreetHandler}
            name={mode.street}
            color={colors[[idx]]}
            value={streetAction}
          >
            {streetAction}
          </StyledButton>
        ])
    );
    updateFourButtons(toStreetButtons);
  }, [mode.street]);

  return (
    <Fragment>
      <Menu attached="top" tabular>
        <Menu.Item
          id="streetSelectPreflop"
          onClick={onHandleStreetHandler}
          name="Preflop"
          value="Raise4BetCall"
          color="black"
        >
          Preflop
        </Menu.Item>
        <Menu.Item
          id="streetSelectFlop"
          onClick={onHandleStreetHandler}
          name="Flop"
          value="Valuebet"
          color="black"
        >
          Flop
        </Menu.Item>
        <Menu.Item
          id="streetSelectTurn"
          onClick={onHandleStreetHandler}
          name="Turn"
          value="Valuebet"
          color="black"
        >
          Turn
        </Menu.Item>
        <Menu.Item
          id="streetSelectRiver"
          onClick={onHandleStreetHandler}
          name="River"
          value="Valuebet"
          color="black"
        >
          River
        </Menu.Item>
      </Menu>
      <Segment attached="bottom">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            height: "225px"
          }}
        >
          {fourButtons || null}
        </div>
      </Segment>
    </Fragment>
  );
};

export default StreetSelector;
