import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import BoardCards from "./BoardCards";

const StyledForm = styled(Form)`
  background-color: #b2b8c0;
`;
const StyledBoardCol = styled(Col)`
  background-color: #f2d8c7;
  margin: 5%;
`;
const InputForm = ({
  onHandleStreetHandler,
  onStreetChangeHandler,
  deadCards,
  mode,
  StreetSelector
}) => {
  return (
    <StyledForm>
      <Form.Input
        label="Dead Cards"
        placeholder="Enter dead cards, for example Ah, As, 2c"
        name="deadcards"
        onChange={onStreetChangeHandler}
      ></Form.Input>
      <StyledBoardCol>
        <BoardCards cardsFlipped={deadCards}></BoardCards>
      </StyledBoardCol>
      <StreetSelector
        handleStreet={onHandleStreetHandler}
        street={mode.street}
      ></StreetSelector>
      <Button label="assign"></Button>
      <Button label="Ranges"></Button>
      <Button label="Clear Selection"></Button>
      <Button label="Clear Suits"></Button>
      <Button label="Split Suits"></Button>
    </StyledForm>
  );
};

export { InputForm };
