import React, { useState, useEffect, memo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import MainContainer from "../../components/MainContainer/index";
import Board from "./Board/index.js";
import { Button, Select, Form } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import prange from "prange";
import { Row, Col, Container } from "react-bootstrap";
import BoardLegend from "../../components/BoardLegend/BoardLegend";
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
import StreetSelector from "./StreetSelector";
import BoardCards from "./BoardCards";

const key = "global";

const MainPage = ({ ranges, mode, rangeColors }) => {
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();
  const [mouseDownState, updateMouseDownState] = useState(false);

  const handleStreet = (e, data) => {
    dispatch(setHandRangeSelect({ name: data.name, value: data.value }));
  };

  const onMouseOverHandler = data => {
    if (data.onMouseDownEvent) dispatch(setHandRange({ cards: data.cards }));
    return data.cards;
  };

  const [deadCards, updateDeadCards] = useState();

  return (
    <Container stackable={true}>
      <Row>
        <Col>
          <Form>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Form.Input
                label="Dead Cards"
                placeholder="Enter dead cards, for example Ah, As, 2c"
                style={{ width: 300 }}
                name="deadcards"
                onChange={e => updateDeadCards(e.target.value)}
              ></Form.Input>
              <Form.Button type="submit">Submit</Form.Button>
            </Col>
            <Col>
              <BoardCards cardsFlipped={deadCards}></BoardCards>
            </Col>
            <Col>
              <StreetSelector
                handleStreet={handleStreet}
                street={mode.street}
              ></StreetSelector>
            </Col>
            <Col>
              <Button label="assign"></Button>
              <Button label="Ranges"></Button>
            </Col>
            <Col>
              <Button label="Clear Selection"></Button>
              <Button label="Clear Suits"></Button>
              <Button label="Split Suits"></Button>
            </Col>
          </Form>
        </Col>
        <Col>
          <Board
            onMouseOverHandler={onMouseOverHandler}
            rangeColors={rangeColors}
          ></Board>
          {/* <Col><BoardLegend range0Combos={raise4BetCallCombos} range1Combos={raise4BetFoldCombos} range2Combos={raiseCallCombos} 
                                  range3Combos={raiseFoldCombos} range0Percent={raise4BetCallPercent}
                                  range1Percent={raise4BetFoldPercent} range2Percent={raiseCallPercent}
                                  range3Percent={raiseFoldPercent} range0PercentAll={raise4BetCallPercentAll}
                                  range1PercentAll={raise4BetFoldPercentAll} range2PercentAll={raiseCallPercentAll}
                                  range3PercentAll={raiseFoldPercentAll}></BoardLegend></Col> */}
        </Col>
      </Row>
    </Container>
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
