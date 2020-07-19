import React, { Fragment, useEffect, useState, memo } from "react";
import { Button, Container, Table, Image } from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";

import styled from "styled-components";
import { makeSelectDeadcards } from "../selectors";

const styledCardBack = styled.img``;

const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  padding: 0px !important;
`;

const BoardCard = (displayCard, idx) => (
  <Image size="mini" id={"Board" + idx + "Card"} alt="card" src={displayCard} />
);

const StyledRow = styled(Row)``;
//TODO: buttons that add two tone/rainbow/monotone/paired/HLL/etc.
const BoardCards = ({ deadcards = [] }) => {
  return (
    <Table>
      <StyledRow>
        <Col className="text-center">Flop</Col>
        <Col className="text-center">Turn</Col>
        <Col className="text-center">River</Col>
      </StyledRow>
      <StyledRow>
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

  const mapState = state => {
    return {
      deadcards: getDeadcards(state)
    };
  };
  return mapState;
}; //?
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(BoardCards);
