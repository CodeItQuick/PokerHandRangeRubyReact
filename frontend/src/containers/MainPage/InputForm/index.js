import React, { Fragment, useState, memo } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import BoardCards from "./BoardCards";
import { setDeadCards } from "../actions";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import _ from "lodash";

const DeadCards = styled(Form.Input)`
  width: 100%;
`;
// TODO: Add functionality to assign, ranges, clear selection, clear suits, split suits
const InputForm = ({
  onHandleStreetHandler,
  onHandleStreetHandlerButtons,
  mode
}) => {
  const dispatch = useDispatch();
  const onChangeStreetHandler = e =>
    dispatch(setDeadCards(_.split(e.target.value, ",", 12)));

  return (
    <Fragment>
      <DeadCards
        label="Dead Cards"
        placeholder="Enter dead cards, for example Ah, As, 2c"
        name="deadcards"
        onChange={onChangeStreetHandler}
      ></DeadCards>
      <BoardCards />
    </Fragment>
  );
};
const withConnect = connect(null, null);
export default compose(withConnect, memo)(InputForm);
