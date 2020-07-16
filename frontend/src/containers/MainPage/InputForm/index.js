import React, { Fragment, useState, memo } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button, Dropdown } from "semantic-ui-react";
import BoardCards from "./BoardCards";
import { setDeadCards, setIsIP, loadEquities } from "../actions";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import _ from "lodash";

import {
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
  makeSelectRange,
  makeSelectPosition,
  makeSelectMode
} from "../selectors";
import InputStreet from "./InputStreet";
import InputStreetAction from "./InputStreetAction";

const options = [
  { key: "positionOOP", text: "OOP", value: false },
  { key: "positionIP", text: "IP", value: true }
];

const DeadCards = styled(Form.Input)`
  width: 100%;
`;
// TODO: Add functionality to assign, ranges, clear selection, clear suits, split suits
const InputForm = ({
  onHandleStreetHandler,
  onHandleStreetHandlerButtons,
  mode: { street, streetAction, isIP },
  ranges,
  rangeRepoOOP,
  rangeRepoIP
}) => {
  const dispatch = useDispatch();
  const onChangeStreetHandler = e => {
    dispatch(setDeadCards(_.split(e.target.value, ",", 12)));
  };

  const onChangePosition = (e, { value }) => {
    let newRangeIP, newRangeOOP, newRanges;
    if (value) {
      newRanges = rangeRepoOOP;
      newRangeIP = ranges;
      newRangeOOP = rangeRepoOOP;
    } else {
      newRanges = rangeRepoIP;
      newRangeIP = rangeRepoIP;
      newRangeOOP = ranges;
    }

    dispatch(setIsIP({ position: value, newRangeIP, newRangeOOP, newRanges }));
  };

  const onCalculateEquities = () => dispatch(loadEquities());

  return (
    <Fragment style={{ display: "float" }}>
      <DeadCards
        label="Dead Cards"
        placeholder="Enter dead cards, for example Ah, As, 2c"
        name="deadcards"
        onChange={onChangeStreetHandler}
      ></DeadCards>
      <div>
        <Button
          name="Position"
          value={true}
          active={isIP}
          inverted
          color="green"
          onClick={onChangePosition}
        >
          In Position
        </Button>
        <Button
          name="Position"
          value={false}
          active={!isIP}
          inverted
          color="green"
          onClick={onChangePosition}
        >
          Out Of Position
        </Button>
      </div>
      <InputStreet
        onHandleStreetHandler={onHandleStreetHandler}
        street={street}
      />
      <div>
        <InputStreetAction
          street={street}
          streetAction={streetAction}
          onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
        />
      </div>
      <div>
        <Button onClick={() => onCalculateEquities()}>
          Calculate Equities
        </Button>
      </div>
      <BoardCards />
    </Fragment>
  );
};
const mapStateToProps = () => {
  const getRange = makeSelectRange();
  const getRangeRepoIP = makeSelectRangeRepoIP();
  const getRangeRepoOOP = makeSelectRangeRepoOOP();
  const getPosition = makeSelectPosition();
  const getMode = makeSelectMode();

  const mapState = state => {
    return {
      ranges: getRange(state),
      rangeRepoIP: getRangeRepoIP(state),
      rangeRepoOOP: getRangeRepoOOP(state),
      Position: getPosition(state),
      mode: getMode(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(InputForm);
