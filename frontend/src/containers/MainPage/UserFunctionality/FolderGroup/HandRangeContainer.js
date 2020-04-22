import React, { Fragment } from "react";
import { Row, Container, Button } from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  display: block;
`;

const StyledRow = styled(Row)`
  &&& {
    display: flex;
  }
`;

const StyledButton = styled(Button)`
  &&& {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 200px;
  }
`;

const HandRangeContainer = ({ id }) => {
  return (
    <StyledContainer id={id}>
      {id === "OpeningRanges" ? (
        <StyledRow>
          <StyledButton>Under The Gun</StyledButton>
        </StyledRow>
      ) : null}
      <StyledRow>
        <StyledButton>Middle Position</StyledButton>
      </StyledRow>
      <StyledRow>
        <StyledButton>Cutoff</StyledButton>
      </StyledRow>
      <StyledRow>
        <StyledButton>Button</StyledButton>
      </StyledRow>
      <StyledRow>
        <StyledButton>Small Blind</StyledButton>
      </StyledRow>
      {id === "DefendingRanges" ? (
        <StyledRow>
          <StyledButton>Big Blind</StyledButton>
        </StyledRow>
      ) : null}
    </StyledContainer>
  );
};

export default HandRangeContainer;
