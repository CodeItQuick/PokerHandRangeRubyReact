import React, { Fragment, useState, useEffect, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Header, Table, Tab, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectDeadcards,
  makeSelectMode,
  makeSelectSelectedStreet,
} from "../selectors";

import LegendTable from "./LegendTable";
import { CardHandSuitBuilder } from "../EngineClasses/CardHandSuitBuilder";
import { countHandCombo } from "../EngineClasses/countHandCombo";

const StyledContainer = styled(Container)`
  font-size: 1rem;
`;

//TODO: Make a board legend for Preflop/Flop/Turn/River

const BoardLegend = ({
  wholeRange,
  mode: { street, useTwoFlopSizes },
  deadcards,
}) => {
  const streetActions = {
    Preflop: [
      "Raise 4 Bet Call",
      "Raise 4 Bet Fold",
      "Raise Call",
      "Raise Fold",
    ],
    Flop: [
      "Valuebet",
      "Bluff",
      "CheckCall",
      "CheckFold",
      "SmallValuebet",
      "SmallBluff",
    ],
    Turn: ["Valuebet", "Bluff", "CheckCall", "CheckFold"],
    River: ["Valuebet", "Bluff", "CheckCall", "CheckFold"],
  };
  const [indexOfActions, updateIndexOfActions] = useState([0, 1, 2, 3]);
  const [numberOfCombos, updateNumberOfCombos] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (useTwoFlopSizes && street === "Flop")
      updateIndexOfActions([0, 1, 2, 3, 4, 5]);
    else updateIndexOfActions([0, 1, 2, 3]);
  }, [useTwoFlopSizes, street]);

  useEffect(() => {
    updateNumberOfCombos(countHandCombo(wholeRange, street, deadcards));
  }, [wholeRange, street, deadcards]);

  return (
    <StyledContainer>
      <LegendTable
        numberOfCombos={numberOfCombos}
        indexOfActions={indexOfActions}
        streetActions={streetActions[street]}
      />
    </StyledContainer>
  );
};

const mapStateToProps = () => {
  const getDeadcards = makeSelectDeadcards();
  const getMode = makeSelectMode();
  const getSelectedRange = makeSelectSelectedStreet();

  const mapState = (state) => {
    return {
      deadcards: getDeadcards(state),
      mode: getMode(state),
      wholeRange: getSelectedRange(state),
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(BoardLegend);
