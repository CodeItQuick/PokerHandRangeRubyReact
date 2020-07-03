import React, { Fragment, useState, memo } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import BoardCards from "./BoardCards";
import { setDeadCards, setIsIP } from "../actions";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import _ from "lodash";

import { Dropdown } from "semantic-ui-react";
import {
  makeSelectRangeRepoIP,
  makeSelectRangeRepoOOP,
  makeSelectRange,
  makeSelectPosition
} from "../selectors";

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
  mode,
  ranges,
  rangeRepoOOP,
  rangeRepoIP,
  Position
}) => {
  const dispatch = useDispatch();
  const onChangeStreetHandler = e => {
    dispatch(setDeadCards(_.split(e.target.value, ",", 12)));
  };

  const onChangePosition = (e, data) => {
    let newRangeIP, newRangeOOP, newRanges;
    if (data.value) {
      newRanges = rangeRepoOOP;
      newRangeIP = ranges;
      newRangeOOP = rangeRepoOOP;
    } else {
      newRanges = rangeRepoIP;
      newRangeIP = rangeRepoIP;
      newRangeOOP = ranges;
    }

    dispatch(
      setIsIP({ position: data.value, newRangeIP, newRangeOOP, newRanges })
    );
  };

  return (
    <Fragment style={{ display: "float" }}>
      <DeadCards
        label="Dead Cards"
        placeholder="Enter dead cards, for example Ah, As, 2c"
        name="deadcards"
        onChange={onChangeStreetHandler}
      ></DeadCards>
      <div>
        Position:{" "}
        <Dropdown
          defaultValue={true}
          options={options}
          onChange={onChangePosition}
        />
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

  const mapState = state => {
    return {
      ranges: getRange(state),
      rangeRepoIP: getRangeRepoIP(state),
      rangeRepoOOP: getRangeRepoOOP(state),
      Position: getPosition(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(InputForm);
