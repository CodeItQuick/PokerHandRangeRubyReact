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
  makeSelectSelectedStreetBetType,
  makeSelectMode,
  makeSelectDeadcards,
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP
} from "./selectors";
import { setHandRangeSelect, setHandRange } from "./actions";

import reducer from "./reducer";
import { useInjectReducer } from "../../HOC/useInjectReducer";
import { useInjectSaga } from "../../HOC/injectSaga";
import saga from "./saga";

import ProductDescription from "./ProductDescription/index";
import { Grid, Segment, Step, Icon, Button } from "semantic-ui-react";
import InputForm from "./InputForm";
import styled from "styled-components";

import { mapNewHandRange } from "./stateRangeFunctions";
import ProgressIndicator from "./ProgressIndicator";
import SuitSelector from "./SuitSelector";
import CurrentRanges from "./CurrentRanges";

const MainPageContainer = styled.div`
  display: block;
  padding: 0px !important;

  @media (min-width: 1200px) {
    display: flex;
  }
`;

const LeftPane = styled.div`
  padding: 0px !important;
  @media (min-width: 1200px) {
    margin: 25px;
  }
`;

const RightPane = styled.div`
  padding: 0px;
  @media (min-width: 1200px) {
    margin: 25px;
  }
`;

const key = "global";
//TO-DO: Rounded corners on navigation bar, spaces on buttons, more whitespace, needs instructions

export const handsInRange = (inpRange, street) => {
  if (inpRange.length == 0) return false;
  const handsInRange = inpRange.filter(
    rangeObject => rangeObject.filterForHandsInRange(street).length > 0
  );
  const isHandsSelected = handsInRange.length > 0;

  return isHandsSelected;
};

const MainPage = ({
  ranges,
  rangeColors,
  mode,
  mode: { street, streetAction, isIP, suitSelection },
  board,
  rangeRepoIP,
  rangeRepoOOP,
  token
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const [handsIPUsed, setHandsIPUsed] = useState(
    handsInRange(rangeRepoIP, street)
  );
  const [handsOOPUsed, setHandsOOPUsed] = useState(
    handsInRange(rangeRepoOOP, street)
  );
  const [openChooseSuitModal, updateOpenChooseSuitModal] = useState(false);

  useEffect(() => {
    updateOpenChooseSuitModal(false);
  }, []);

  useEffect(() => {
    setHandsIPUsed(handsInRange(isIP ? ranges : rangeRepoIP, street));
    setHandsOOPUsed(handsInRange(!isIP ? ranges : rangeRepoOOP, street));
  }, [ranges, rangeRepoIP, street]);

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
      let newHandRange = [];
      if (suitSelection.length > 0) {
        suitSelection.forEach(suit => {
          newHandRange = [...newHandRange, data.cards + suit];
        });
        dispatch(
          setHandRange(
            mapNewHandRange(ranges, street, streetAction, newHandRange)
          )
        );
      } else {
        newHandRange = mapNewHandRange(ranges, street, streetAction, [
          data.cards
        ]);
        dispatch(setHandRange(newHandRange, newHandRange));
      }
    }
    return data.cards;
  };

  const onManuallyChooseSuitsHandler = () => {
    updateOpenChooseSuitModal(true);
  };

  //TO-DO: need to align these left-to-right on big screens, top-to-bottom mobile
  return (
    <div>
      <SuitSelector
        open={openChooseSuitModal}
        onCloseHandler={() => updateOpenChooseSuitModal(false)}
      />
      <MainPageContainer>
        <LeftPane>
          <ProgressIndicator
            street={street}
            handsIPUsed={handsIPUsed}
            handsOOPUsed={handsOOPUsed}
            isIP={isIP}
            rangeRepoIP={rangeRepoIP}
            rangeRepoOOP={rangeRepoOOP}
            selectedRanges={ranges}
          />
          <Board
            onMouseOverHandler={onMouseOverHandler}
            rangeColors={rangeColors}
          ></Board>
          <CurrentRanges />
        </LeftPane>
        <RightPane>
          <InputForm
            onHandleStreetHandler={onHandleStreetHandler}
            onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
            token={token}
            onManuallyChooseSuitsHandler={onManuallyChooseSuitsHandler}
          />
          <BoardLegend
            onHandleStreetHandler={onHandleStreetHandler}
            onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
            mode={mode}
          />
        </RightPane>
      </MainPageContainer>
    </div>
  );
};
MainPage.propTypes = {
  ranges: PropTypes.object,
  mode: PropTypes.object,
  rangeColors: PropTypes.object
};

const mapStateToProps = () => {
  const getMapRange = makeSelectRange();
  const getSelectRange = makeSelectSelectedStreetBetType();
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

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(MainPage);
