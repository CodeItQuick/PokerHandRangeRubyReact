import React, { useState, useEffect, memo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import Board from "./Board/index.js";
import { useSelector, useDispatch } from "react-redux";
import prange from "prange";
import { Row, Col, Container } from "react-bootstrap";
import BoardLegend from "../../components/BoardLegend/BoardLegend";
import {
  selectGlobal,
  makeSelectRanges,
  makeSelectRange,
  makeSelectMode,
  makeSelectRangeColors
} from "./selectors.js";
import { getHandRange, setHandRangeSelect, setHandRange } from "./actions.js";
import reducer from "./reducer.js";
import { useInjectReducer } from "../../HOC/useInjectReducer.js";

import { InputForm } from "./InputForm";

const key = "global";

const MainPage = ({ wholeRange, ranges, mode, rangeColors }) => {
  useInjectReducer({ key, reducer });
  const dispatch = useDispatch();
  const [mouseDownState, updateMouseDownState] = useState(false);

  const onHandleStreetHandler = (e, data) => {
    dispatch(setHandRangeSelect({ name: data.name, value: data.value }));
  };

  const onChangeStreetHandler = e => updateDeadCards(e.target.value);

  const onMouseOverHandler = data => {
    if (data.onMouseDownEvent) dispatch(setHandRange({ cards: data.cards }));
    return data.cards;
  };

  const [deadCards, updateDeadCards] = useState();

  return (
    <Container stackable={true}>
      <InputForm
        onHandleStreetHandler={onHandleStreetHandler}
        onChangeStreetHandler={onChangeStreetHandler}
        deadCards={deadCards}
        mode={mode}
      />
      <Board
        onMouseOverHandler={onMouseOverHandler}
        rangeColors={rangeColors}
      ></Board>
      <BoardLegend wholeRange={wholeRange} mode={mode}></BoardLegend>
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
  const getSelectRange = makeSelectRange();
  const mapState = state => {
    return {
      ranges: getMapRange(state),
      rangeColors: getRangeColors(state),
      wholeRange: getSelectRange(state)
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
