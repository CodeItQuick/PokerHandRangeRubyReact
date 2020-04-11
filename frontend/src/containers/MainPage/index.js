import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import MainContainer from "../../components/MainContainer/index";
import Board from "./Board/index.js";
import { Button, Select } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import prange from "prange";
import { Row, Col } from "react-bootstrap";
import BoardLegend from "../../components/BoardLegend/BoardLegend";
import Hand from "../../components/hand/hand.js";
import {
  selectGlobal,
  makeSelectRanges,
  makeSelectMode,
  makeSelectRangeColors
} from "./selectors.js";
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

const MainPage = ({ ranges, mode, rangeColors }) => {
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();
  console.log(rangeColors);

  const handleStreet = (e, data) => {
    console.log(data); //?
    dispatch(setHandRangeSelect({ name: data.name, value: data.value }));
  };

  const handleClickHandler = (e, data) => {
    console.log(data);
    dispatch(setHandRange({ cards: data.hand }));
  };
  return (
    <>
      <MainContainer>
        <Row>
          <Col>
            {ranges.prHandRanges}
            <Board
              handClickHandler={handleClickHandler}
              rangeColors={rangeColors}
            ></Board>
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
          <StyledButton onClick={handleStreet} name="Flop" value="Valuebet">
            Valuebet
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="Turn" value="Valuebet">
            Valuebet
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="River" value="Valuebet">
            Valuebet
          </StyledButton>
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
          <StyledButton onClick={handleStreet} name="Flop" value="Bluff">
            bluff
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="Turn" value="Bluff">
            bluff
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="River" value="Bluff">
            bluff
          </StyledButton>
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
          <StyledButton onClick={handleStreet} name="Flop" value="CheckCall">
            Check/Call
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="Turn" value="CheckCall">
            Check/Call
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="River" value="CheckCall">
            Check Turn Call
          </StyledButton>
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
          <StyledButton onClick={handleStreet} name="Flop" value="CheckFold">
            Check/Fold
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="Turn" value="CheckFold">
            Check/Fold
          </StyledButton>
        </Col>
        <Col></Col>
        <Col>
          <StyledButton onClick={handleStreet} name="River" value="CheckFold">
            Check Turn Fold
          </StyledButton>
        </Col>
      </Row>
    </>
  );
};
MainPage.propTypes = {
  ranges: PropTypes.object,
  mode: PropTypes.object,
  rangeColors: PropTypes.object
};

const mapStateToProps = () => {
  const getMapRange = makeSelectRanges();
  const getRangeColors = makeSelectRangeColors();
  const mapState = state => {
    return {
      ranges: getMapRange(state),
      rangeColors: getRangeColors(state)
    };
  };
  return mapState;
}; //?

// const mapDispatchToProps = dispatch => {
//   return {
//     dispatchToHandRange: (data) => dispatch(setHandRange(data))
//   };
// };
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(MainPage);
