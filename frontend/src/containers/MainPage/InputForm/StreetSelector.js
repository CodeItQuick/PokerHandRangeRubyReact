import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Button, Menu, Segment, Tab } from "semantic-ui-react";

// TODO: FIX The colors so they use a palette

const StyledButton = styled(Button)`
  &&& {
    background-color: ${({ color }) => (color ? color : "none")}
    width: 100%;
  }
`;

//FIXME: This is broken, need to make it a functioning tab component
const panes = fourButtons => [
  {
    menuItem: "Preflop",
    id: "streetSelectPreflop",
    name: "Preflop",
    value: "Raise4BetCall",
    color: "black",
    render: () => <Fragment>{fourButtons} </Fragment>
  },
  {
    menuItem: "Flop",
    id: "streetSelectFlop",
    name: "Flop",
    value: "Valuebet",
    color: "black",
    render: () => <Fragment>{fourButtons}</Fragment>
  },
  {
    menuItem: "Turn",
    id: "streetSelectTurn",
    name: "Turn",
    value: "Valuebet",
    color: "black",
    render: () => <Fragment>{fourButtons}</Fragment>
  },
  {
    menuItem: "River",
    id: "streetSelectRiver",
    name: "River",
    value: "Valuebet",
    color: "black",
    render: () => <Fragment>{fourButtons}</Fragment>
  }
];

const StreetSelector = ({
  onHandleStreetHandler,
  onHandleStreetHandlerButtons,
  mode: { street, streetAction }
}) => {
  const [fourButtons, updateFourButtons] = useState();
  const streetActions = {
    Preflop: ["Raise4BetCall", "Raise4BetFold", "RaiseCall", "RaiseFold"],
    Postflop: ["Valuebet", "Bluff", "CheckCall", "CheckFold"]
  };
  const colors = ["#8BDDBE", "#ED87A7", "#6B6C7C", "#D3D3D3"];

  useEffect(() => {
    let toStreetButtons = [];
    streetActions[street === "Preflop" ? "Preflop" : "Postflop"].forEach(
      (streetAction, idx) =>
        (toStreetButtons = [
          ...toStreetButtons,
          <StyledButton
            id={street + streetAction}
            onClick={e =>
              onHandleStreetHandlerButtons(e, { street, streetAction })
            }
            name={street}
            color={colors[[idx]]}
            value={streetAction}
          >
            {streetAction}
          </StyledButton>
        ])
    );
    updateFourButtons(toStreetButtons);
  }, [street, onHandleStreetHandlerButtons]);

  return (
    <Tab
      tabular
      onTabChange={onHandleStreetHandler}
      panes={panes(fourButtons)}
    ></Tab>
  );
};

export default StreetSelector;
