import React, { Fragment, useState, memo } from "react";
import { Container, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import {
  Grid,
  Segment,
  Form,
  Button,
  Progress,
  Label,
  Step,
  Icon
} from "semantic-ui-react";
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
  makeSelectMode,
  makeSelectDeadcards
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
  selectedRanges,
  rangeRepoOOP,
  rangeRepoIP,
  deadcards,
  ranges
}) => {
  const dispatch = useDispatch();
  const onChangeStreetHandler = e => {
    dispatch(setDeadCards(_.split(e.target.value, ",", 12)));
  };

  const onChangePosition = (e, { value }) => {
    let newRangeIP, newRangeOOP, newRanges;
    if (value) {
      newRanges = rangeRepoIP;
      newRangeIP = rangeRepoIP;
      newRangeOOP = selectedRanges;
    } else {
      newRanges = rangeRepoOOP;
      newRangeIP = selectedRanges;
      newRangeOOP = rangeRepoOOP;
    }

    dispatch(setIsIP({ position: value, newRangeIP, newRangeOOP, newRanges }));
  };

  const onCalculateEquities = () => dispatch(loadEquities());

  return (
    <div>
      <Segment.Group inverted stacked size="massive">
        <Segment.Group inverted color="green">
          <Label
            ribbon
            color={
              deadcards.length >= 3 && deadcards.length <= 5 ? "green" : "red"
            }
          >
            {deadcards.length >= 3 && deadcards.length <= 5 ? (
              <Icon name="thumbs up" />
            ) : (
              <Icon name="thumbs down" />
            )}
            Board
          </Label>
          <Segment>
            <DeadCards
              placeholder="eg. Ah, As, 2c, 4d"
              name="deadcards"
              onChange={onChangeStreetHandler}
            />
            <BoardCards />
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Label ribbon color="black">
            Position
          </Label>
          <Segment>
            <Button.Group>
              <Button
                name="Position"
                value={true}
                active={isIP}
                inverted
                color="blue"
                onClick={onChangePosition}
              >
                In Position
              </Button>
              <Button.Or />
              <Button
                name="Position"
                value={false}
                active={!isIP}
                inverted
                color="blue"
                onClick={onChangePosition}
              >
                Out Of Position
              </Button>
            </Button.Group>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Label color="black" ribbon>
            Street
          </Label>
          <Segment>
            <InputStreet
              onHandleStreetHandler={onHandleStreetHandler}
              street={street}
            />
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Label color="black" ribbon>
            Action
          </Label>
          <Segment>
            <InputStreetAction
              street={street}
              streetAction={streetAction}
              onHandleStreetHandlerButtons={onHandleStreetHandlerButtons}
            />
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment textAlign="center">
            <Button color="purple" onClick={() => onCalculateEquities()}>
              Calculate Equities
            </Button>
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </div>
  );
};
const mapStateToProps = () => {
  const getRange = makeSelectRange();
  const getRangeRepoIP = makeSelectRangeRepoIP();
  const getRangeRepoOOP = makeSelectRangeRepoOOP();
  const getPosition = makeSelectPosition();
  const getMode = makeSelectMode();
  const getDeadcards = makeSelectDeadcards();
  const getRanges = makeSelectRange();

  const mapState = state => {
    return {
      selectedRanges: getRange(state),
      rangeRepoIP: getRangeRepoIP(state),
      rangeRepoOOP: getRangeRepoOOP(state),
      Position: getPosition(state),
      mode: getMode(state),
      deadcards: getDeadcards(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(InputForm);
