import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import MainContainer from "../../components/MainContainer/index";
import Board from "../../components/board/board";
import Range from "../Range/index";
import { Button, Select } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import prange from "prange";
import { Row, Col } from "react-bootstrap";
import BoardLegend from "../../components/BoardLegend/BoardLegend";
import Hand from "../../components/hand/hand.js";
import { makeSelectToken, makeSelectUser } from "./../Auth/selectors";
import { makeSelectRanges, makeSelectMode } from "./selectors.js";
import { getHandRange, setHandRangeSelect, setHandRange } from "./actions.js";
import reducer from "./reducer.js";
import { useInjectReducer } from "../../HOC/useInjectReducer.js";
import { initialState } from "./reducer.js";
import styled from "styled-components";

const StyledButton = styled(Button)`
  &&& {
    background-color: ${props => (props.active ? "white !important" : "none")};
    color: ${props => (props.active ? "black !important" : "black")};
    width: 150px;
  }
`;

const key = "global";

const MainPage = ({
  ranges = initialState.ranges,
  mode = initialState.mode
}) => {
  useInjectReducer({ key, reducer });
  const [range, setRange] = useState();

  const dispatch = useDispatch();

  const handleStreet = (e, data) => {
    console.log(data); //?
    dispatch(setHandRangeSelect({ name: data.name, value: data.value }));
  };

  const handClickHandler = data => {
    dispatch(setHandRange(data));
  };
  useEffect(() => {
    console.log(ranges);
    let toSetRange = {};
    Object.keys(ranges).map(streets =>
      Object.keys(streets).map(streetActions => {
        if (streets === mode.street && streetActions === mode.streetAction) {
          toSetRange.push(streetActions.prHandString);
        }
      })
    );
    setRange(toSetRange);
  }, [ranges]);
  const orderedCard = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2"
  ];
  return (
    <>
      <MainContainer>
        <Row>
          <Col>
            {ranges.Preflop.Raise4BetCall.prHandRanges}
            <Board onHandClick={handClickHandler} ranges={range}></Board>
          </Col>
          {/* <Col><BoardLegend range0Combos={raise4BetCallCombos} range1Combos={raise4BetFoldCombos} range2Combos={raiseCallCombos} 
                                  range3Combos={raiseFoldCombos} range0Percent={raise4BetCallPercent}
                                  range1Percent={raise4BetFoldPercent} range2Percent={raiseCallPercent}
                                  range3Percent={raiseFoldPercent} range0PercentAll={raise4BetCallPercentAll}
                                  range1PercentAll={raise4BetFoldPercentAll} range2PercentAll={raiseCallPercentAll}
                                  range3PercentAll={raiseFoldPercentAll}></BoardLegend></Col> */}
        </Row>
      </MainContainer>
      <Row span={7}>
        <Button.Group size="large">
          <Col>Preflop</Col>
          <Col>
            <StyledButton.Or />
          </Col>
          <Col>
            <StyledButton>Flop</StyledButton>
          </Col>
          <Col>
            <StyledButton.Or />
          </Col>
          <Col>
            <StyledButton> Turn</StyledButton>
          </Col>
          <Col>
            <StyledButton.Or />
          </Col>
          <Col>
            <StyledButton>River</StyledButton>
          </Col>
        </Button.Group>
      </Row>

      <Row>
        <Col>
          <StyledButton
            onClick={handleStreet}
            name="Preflop"
            value="Raise4BetCall"
          >
            Raise/4bet/Call
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Valuebet</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Valuebet</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Valuebet</StyledButton>
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledButton
            onClick={handleStreet}
            name="Preflop"
            value="Raise4BetFold"
          >
            Raise/4bet/fold
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>bluff</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>bluff</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>bluff</StyledButton>
        </Col>
      </Row>

      <Row>
        <Col>
          <StyledButton onClick={handleStreet} name="Preflop" value="RaiseCall">
            Raise/Call
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Check/Call</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Check/Call</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Check Turn Call</StyledButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <StyledButton onClick={handleStreet} name="Preflop" value="RaiseFold">
            Raise/Fold
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Check/Fold</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Check/Fold</StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton>Check Turn Fold</StyledButton>
        </Col>
      </Row>
    </>
  );
};

const makeMapStateToProps = createStructuredSelector({
  ranges: makeSelectRanges(),
  mode: makeSelectMode()
}); //?

const withConnect = connect(makeMapStateToProps, null);

export default compose(withConnect, memo)(MainPage);
