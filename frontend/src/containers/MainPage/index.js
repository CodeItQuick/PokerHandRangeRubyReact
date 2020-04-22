import React, { useState, useEffect, memo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import Board from "./Board/index.js";
import { useSelector, useDispatch } from "react-redux";
import prange from "prange";
import { Row, Col, Container } from "react-bootstrap";
import BoardLegend from "./BoardLegend/BoardLegend";
import {
  makeSelectRanges,
  makeSelectRange,
  makeSelectMode,
  makeSelectRangeColors,
  makeSelectUser
} from "./selectors.js";
import {
  initCreateNewFolder,
  setHandRangeSelect,
  setHandRange,
  getAllUserHandRanges
} from "./actions.js";

import reducer from "./reducer.js";
import { useInjectReducer } from "../../HOC/useInjectReducer.js";
import { useInjectSaga } from "../../HOC/injectSaga.js";
import saga from "./saga.js";

import ProductDescription from "./ProductDescription/index.js";
import UserFunctionality from "./UserFunctionality/index.js";

import { Button } from "semantic-ui-react";
import { InputForm } from "./InputForm";

const key = "global";
//TO-DO: Rounded corners on navigation bar, spaces on buttons, more whitespace, needs instructions

const MainPage = ({ wholeRange, ranges, mode, rangeColors, user }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  const onHandleStreetHandler = (e, { activeIndex, panes }) => {
    console.log(panes);
    dispatch(
      setHandRangeSelect({
        name: panes[activeIndex].name,
        value: panes[activeIndex].value
      })
    );
  };

  const onHandleStreetHandlerButtons = (e, { street, streetAction }) => {
    dispatch(setHandRangeSelect({ name: street, value: streetAction }));
  };

  const onMouseOverHandler = data => {
    if (data.onMouseDownEvent) dispatch(setHandRange({ cards: data.cards }));
    return data.cards;
  };

  const onTabChangeHandler = (e, { activeIndex }) => {
    dispatch(getAllUserHandRanges(activeIndex));
  };

  const onClickNewFolderHandler = () => {
    dispatch(initCreateNewFolder(user));
  };

  //TO-DO: need to align these left-to-right on big screens, top-to-bottom mobile
  return (
    <Container>
      <Row>
        <Col>
          <InputForm
            onHandleStreetHandler={onHandleStreetHandler}
            onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
            mode={mode}
          />
          <Board
            onMouseOverHandler={onMouseOverHandler}
            rangeColors={rangeColors}
          ></Board>
        </Col>
        <Col>
          <ProductDescription />
          <BoardLegend wholeRange={wholeRange} mode={mode} />
          <UserFunctionality onTabChangeHandler={onTabChangeHandler} />
          <Button onClick={onClickNewFolderHandler}>Create New Folder </Button>
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
  const getSelectRange = makeSelectRange();
  const getMode = makeSelectMode();
  const getUser = makeSelectUser();
  const mapState = state => {
    return {
      ranges: getMapRange(state),
      rangeColors: getRangeColors(state),
      wholeRange: getSelectRange(state),
      mode: getMode(state),
      user: getUser(state)
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
