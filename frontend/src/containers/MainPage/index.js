import React, { useState, useEffect, memo, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import Board from "./Board";
import { useSelector, useDispatch } from "react-redux";
import prange from "prange";
import { Row, Col, Container, PopoverTitle } from "react-bootstrap";
import BoardLegend from "./BoardLegend/BoardLegend";
import {
  makeSelectRange,
  makeSelectSelectedRanges,
  makeSelectMode,
  makeSelectDeadcards,
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP
} from "./selectors";
import {
  setHandRangeSelect,
  setHandRange,
  initAllUserHandRanges
} from "./actions";

import reducer from "./reducer";
import { useInjectReducer } from "../../HOC/useInjectReducer";
import { useInjectSaga } from "../../HOC/injectSaga";
import saga from "./saga";

import ProductDescription from "./ProductDescription/index";
import { Grid, Segment, Step, Icon } from "semantic-ui-react";
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

const Title = styled.h1`
  text-align: center;
`;
const key = "global";
//TO-DO: Rounded corners on navigation bar, spaces on buttons, more whitespace, needs instructions

export const handsInRange = (inpRange, street) => {
  console.log(inpRange);
  if (inpRange.length == 0) return false;
  let handsInRange = inpRange.filter(
    ({ Street, hands }) => hands.length > 0 && Street == street
  );
  const isHandsSelected = handsInRange.length > 0;

  return isHandsSelected;
};

const MainPage = ({
  wholeRange,
  ranges,
  rangeColors,
  toAllUserHandRange,
  mode,
  mode: { street, streetAction, isIP },
  board,
  rangeRepoIP,
  rangeRepoOOP
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();
  const [handsIPUsed, setHandsIPUsed] = useState(
    handsInRange(rangeRepoIP, street)
  );
  const [handsOOPUsed, setHandsOOPUsed] = useState(
    handsInRange(rangeRepoIP, street)
  );

  useEffect(() => {
    setHandsIPUsed(handsInRange(isIP ? ranges : rangeRepoIP, street));
    setHandsOOPUsed(handsInRange(!isIP ? ranges : rangeRepoOOP, street));
  }, [ranges, rangeRepoIP, street]);

  useEffect(() => {
    toAllUserHandRange();
  }, [toAllUserHandRange]);

  const onHandleStreetHandler = (e, { name, value }) => {
    dispatch(
      setHandRangeSelect({
        name,
        value
      })
    );
  };

  const onHandleStreetHandlerButtons = (e, { street, streetAction }) => {
    dispatch(setHandRangeSelect({ name: street, value: streetAction }));
  };

  const onMouseOverHandler = data => {
    if (data.onMouseDownEvent) {
      let newHandRange = mapNewHandRange(
        ranges,
        street,
        streetAction,
        data.cards
      );
      dispatch(setHandRange(newHandRange));
    }
    return data.cards;
  };

  //TO-DO: need to align these left-to-right on big screens, top-to-bottom mobile
  return (
    <MainPageContainer>
      <LeftPane>
        <Segment inverted stacked size="tiny">
          <Step.Group fluid size="mini">
            <Step completed={handsIPUsed}>
              <Icon name="thumbs down" color="red" />
              <Step.Content>
                <Step.Title>Hands for IP Selected on Flop</Step.Title>
              </Step.Content>
            </Step>
            <Step completed={handsOOPUsed}>
              <Icon name="thumbs down" color="red" />
              <Step.Content>
                <Step.Title>Hands for OOP Selected on Flop</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Segment>
        <Board
          onMouseOverHandler={onMouseOverHandler}
          rangeColors={rangeColors}
        ></Board>
        <BoardLegend
          wholeRange={wholeRange}
          onHandleStreetHandler={onHandleStreetHandler}
          onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
          mode={mode}
        />
      </LeftPane>
      <RightPane>
        <InputForm
          onHandleStreetHandler={onHandleStreetHandler}
          onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
        />
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
  const getMapRange = makeSelectRange();
  const getSelectRange = makeSelectSelectedRanges();
  const getMode = makeSelectMode();
  const getDeadcards = makeSelectDeadcards();
  const getRangeRepoIP = makeSelectRangeRepoIP();
  const getRangeRepoOOP = makeSelectRangeRepoOOP();

  const mapState = state => {
    return {
      ranges: getMapRange(state),
      wholeRange: getSelectRange(state), //TODO: change to streetname
      mode: getMode(state),
      board: getDeadcards(state),
      rangeRepoIP: getRangeRepoIP(state),
      rangeRepoOOP: getRangeRepoOOP(state)
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
