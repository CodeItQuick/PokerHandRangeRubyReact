import React, { Fragment, useState, memo } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button, Dropdown } from "semantic-ui-react";
import BoardCards from "./BoardCards";
import { setDeadCards, setIsIP } from "../actions";
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
      <div>
        Street:
        <Button.Group>
          <Button
            onClick={onHandleStreetHandler}
            name="Preflop"
            value="Raise4BetCall"
          >
            Preflop
          </Button>
          <Button.Or />
          <Button onClick={onHandleStreetHandler} name="Flop" value="Valuebet">
            Flop
          </Button>
          <Button.Or />
          <Button onClick={onHandleStreetHandler} name="Turn" value="Valuebet">
            Turn
          </Button>
          <Button.Or />
          <Button onClick={onHandleStreetHandler} name="River" value="Valuebet">
            River
          </Button>
        </Button.Group>
      </div>
      <div>
        Street Action:
        {street == "Preflop" ? (
          <Button.Group inverted>
            <Button
              inverted
              color="green"
              id="firstChoice"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "Raise4BetCall"
                })
              }
            >
              Raise/4bet/Call
            </Button>
            <Button.Or />
            <Button
              inverted
              color="red"
              id="firstChoice"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "Raise4BetFold"
                })
              }
            >
              Raise/4bet/Fold
            </Button>
            <Button.Or />
            <Button
              inverted
              color="grey"
              id="firstChoice"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "RaiseCall"
                })
              }
            >
              Raise/Call
            </Button>
            <Button.Or />
            <Button
              inverted
              color="white"
              id="firstChoice"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "RaiseFold"
                })
              }
            >
              Raise/Fold
            </Button>
          </Button.Group>
        ) : (
          <Button.Group>
            <Button
              inverted
              color="green"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "Valuebet"
                })
              }
            >
              Valuebet
            </Button>
            <Button.Or />
            <Button
              inverted
              color="red"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "Bluff"
                })
              }
            >
              Bluff
            </Button>
            <Button.Or />
            <Button
              inverted
              color="black"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "CheckCall"
                })
              }
            >
              Check/Call
            </Button>
            <Button.Or />
            <Button
              inverted
              color="white"
              onClick={e =>
                onHandleStreetHandlerButtons(e, {
                  street,
                  streetAction: "CheckFold"
                })
              }
            >
              Check/Fold
            </Button>
          </Button.Group>
        )}
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
