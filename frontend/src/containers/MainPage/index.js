import React, { useState, useEffect, memo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import Board from "./Board";
import { useSelector, useDispatch } from "react-redux";
import prange from "prange";
import { Row, Col, Container } from "react-bootstrap";
import BoardLegend from "./BoardLegend/BoardLegend";
import {
  makeSelectRanges,
  makeSelectRange,
  makeSelectMode,
  makeSelectUser,
  makeSelectFolder,
  makeSelectDeadcards
} from "./selectors";
import {
  initCreateNewFolder,
  setHandRangeSelect,
  setHandRange,
  initAllUserHandRanges
} from "./actions";

import reducer from "./reducer";
import { useInjectReducer } from "../../HOC/useInjectReducer";
import { useInjectSaga } from "../../HOC/injectSaga";
import saga from "./saga";

import ProductDescription from "./ProductDescription/index";
import UserFunctionality from "./UserFunctionality/index";

import { Button } from "semantic-ui-react";
import InputForm from "./InputForm";
import styled from "styled-components";

import { mapNewHandRange } from "./stateRangeFunctions";

const MainPageContainer = styled.div`
  display: flex;
`;

const LeftPane = styled.div`
  margin: 25px;
`;

const RightPane = styled.div`
  margin: 25px;
`;

const key = "global";
//TO-DO: Rounded corners on navigation bar, spaces on buttons, more whitespace, needs instructions

const MainPage = ({
  wholeRange,
  ranges,
  mode,
  rangeColors,
  user,
  toAllUserHandRange,
  mode: { street, streetAction },
  board
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  useEffect(() => {
    toAllUserHandRange();
  }, [toAllUserHandRange]);

  const onHandleStreetHandler = (e, { activeIndex, panes }) => {
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
    if (data.onMouseDownEvent) {
      let newHandRange = mapNewHandRange(
        wholeRange,
        street,
        streetAction,
        data.cards
      );
      dispatch(setHandRange(newHandRange));
    }
    return data.cards;
  };

  const onTabChangeHandler = (e, { activeIndex }) => {
    dispatch(initAllUserHandRanges(activeIndex));
  };

  const onClickNewFolderHandler = () => {
    dispatch(initCreateNewFolder(user));
  };

  //TO-DO: need to align these left-to-right on big screens, top-to-bottom mobile
  return (
    <MainPageContainer>
      <LeftPane>
        <InputForm
          onHandleStreetHandler={onHandleStreetHandler}
          onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
          mode={mode}
        />
        <Board
          onMouseOverHandler={onMouseOverHandler}
          rangeColors={rangeColors}
        ></Board>
      </LeftPane>
      <RightPane>
        <ProductDescription />
        <BoardLegend
          wholeRange={wholeRange}
          onHandleStreetHandler={onHandleStreetHandler}
          onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
          mode={mode}
        />
        {/* <UserFunctionality onTabChangeHandler={onTabChangeHandler} /> */}
        {/* <Button onClick={onClickNewFolderHandler}>Create New Folder </Button> */}
      </RightPane>
    </MainPageContainer>
  );
};
MainPage.propTypes = {
  ranges: PropTypes.object,
  mode: PropTypes.object,
  rangeColors: PropTypes.object
};

const mapStateToProps = () => {
  const getMapRange = makeSelectRanges();
  const getSelectRange = makeSelectRange();
  const getMode = makeSelectMode();
  const getUser = makeSelectUser();
  const getDeadcards = makeSelectDeadcards();

  const mapState = state => {
    return {
      ranges: getMapRange(state),
      wholeRange: getSelectRange(state), //TODO: change to streetname
      mode: getMode(state),
      user: getUser(state),
      board: getDeadcards(state)
    };
  };
  return mapState;
}; //?

const mapDispatchToProps = dispatch => {
  return {
    toAllUserHandRange: () => dispatch(initAllUserHandRanges())
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(MainPage);
