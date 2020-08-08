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

import { initSaveScenario, initGetAllScenario } from "../actions";
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
import ScenarioLoader from "../ScenarioLoader";
import { useAuth0 } from "@auth0/auth0-react";

const options = [
  { key: "positionOOP", text: "OOP", value: false },
  { key: "positionIP", text: "IP", value: true }
];

const DeadCards = styled(Form.Input)`
  width: 100%;
`;

export const assignPositions = (
  rangeRepoIP,
  rangeRepoOOP,
  selectedRanges,
  value
) => {
  let newRanges, newRangeIP, newRangeOOP;
  if (value) {
    newRanges = rangeRepoIP.map(RangeObj => RangeObj.getRangesObject());
    newRangeIP = rangeRepoIP.map(RangeObj => RangeObj.getRangesObject());
    newRangeOOP = selectedRanges.map(RangeObj => RangeObj.getRangesObject());
  } else {
    newRanges = rangeRepoOOP.map(RangeObj => RangeObj.getRangesObject());
    newRangeIP = selectedRanges.map(RangeObj => RangeObj.getRangesObject());
    newRangeOOP = rangeRepoOOP.map(RangeObj => RangeObj.getRangesObject());
  }
  return [newRangeIP, newRangeOOP, newRanges];
};

// TODO: Add functionality to assign, ranges, clear selection, clear suits, split suits
const InputForm = ({
  onHandleStreetHandler,
  onHandleStreetHandlerButtons,
  mode: { street, streetAction, isIP },
  selectedRanges,
  rangeRepoOOP,
  rangeRepoIP,
  deadcards,
  token,
  onManuallyChooseSuitsHandler
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ active: false });

  const onCloseModal = () => {
    setState({
      active: false
    });
  };

  const onChangeStreetHandler = e => {
    dispatch(setDeadCards(_.split(e.target.value, ",", 12)));
  };

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
          <Segment textAlign="center">
            <Button onClick={onManuallyChooseSuitsHandler}>
              Manually Choose Suits
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
