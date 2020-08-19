import React, { Fragment, useEffect, useState, memo } from "react";
import { Button, Container, Table, Image } from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";

import styled from "styled-components";
import { makeSelectDeadcards, makeSelectMode } from "../selectors";
import { setHandRangeSelect } from "../actions";

const styledCardBack = styled.img``;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: flex-start;
  padding: 0px !important;
`;

const BoardCard = (displayCard, idx) => (
  <Image size="mini" id={"Board" + idx + "Card"} alt="card" src={displayCard} />
);

const StyledRow = styled(Row)``;
//TODO: buttons that add two tone/rainbow/monotone/paired/HLL/etc.
const BoardCards = ({ mode: { street }, deadcards = [] }) => {
  const dispatch = useDispatch();
  const onHandleStreetHandler = (e, { name, value }) => {
    dispatch(
      setHandRangeSelect({
        name,
        value
      })
    );
  };
  return (
    <Table>
      <StyledRow>
        <Col className="text-center">
          <Button
            onClick={onHandleStreetHandler}
            id="streetFirstChoice"
            name="Preflop"
            value="Raise4BetCall"
            active={street === "Preflop"}
            inverted
            color="blue"
          >
            Preflop
          </Button>
        </Col>
        <Col className="text-center">
          <Button
            onClick={onHandleStreetHandler}
            id="streetSecondChoice"
            name="Flop"
            value="Valuebet"
            active={street === "Flop"}
            inverted
            color="blue"
          >
            Flop
          </Button>
        </Col>
        <Col className="text-center">
          <Button
            onClick={onHandleStreetHandler}
            id="streetThirdChoice"
            name="Turn"
            value="Valuebet"
            active={street === "Turn"}
            inverted
            color="blue"
          >
            Turn
          </Button>
        </Col>
        <Col className="text-center">
          <Button
            onClick={onHandleStreetHandler}
            id="streetFourthChoice"
            name="River"
            value="Valuebet"
            active={street === "River"}
            inverted
            color="blue"
          >
            River
          </Button>
        </Col>
      </StyledRow>
      <StyledRow>
        <Col />
        <StyledCol>
          {Array.isArray(deadcards) &&
          deadcards.length > 0 &&
          deadcards[0].length > 1
            ? BoardCard(
                "/assets/cards/" + deadcards[0].toUpperCase().trim() + ".png",
                0
              )
            : BoardCard("/assets/cards/back.png", 0)}

          {Array.isArray(deadcards) &&
          deadcards.length > 1 &&
          deadcards[1].length > 1
            ? BoardCard(
                "/assets/cards/" + deadcards[1].toUpperCase().trim() + ".png",
                1
              )
            : BoardCard("/assets/cards/back.png", 1)}

          {Array.isArray(deadcards) &&
          deadcards.length > 2 &&
          deadcards[2].length > 1
            ? BoardCard(
                "/assets/cards/" + deadcards[2].toUpperCase().trim() + ".png",
                2
              )
            : BoardCard("/assets/cards/back.png", 2)}
        </StyledCol>
        <StyledCol xs={2}>
          {Array.isArray(deadcards) &&
          deadcards.length > 3 &&
          deadcards[3].length > 1
            ? BoardCard(
                "/assets/cards/" + deadcards[3].toUpperCase().trim() + ".png",
                3
              )
            : BoardCard("/assets/cards/back.png", 3)}
        </StyledCol>
        <StyledCol>
          {Array.isArray(deadcards) &&
          deadcards.length > 4 &&
          deadcards[4].length > 1
            ? BoardCard(
                "/assets/cards/" + deadcards[4].toUpperCase().trim() + ".png",
                4
              )
            : BoardCard("/assets/cards/back.png", 4)}
        </StyledCol>
      </StyledRow>
    </Table>
  );
};

const mapStateToProps = () => {
  const getDeadcards = makeSelectDeadcards();
  const getMode = makeSelectMode();

  const mapState = state => {
    return {
      deadcards: getDeadcards(state),
      mode: getMode(state)
    };
  };
  return mapState;
}; //?
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(BoardCards);
