import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import BoardCards from "./BoardCards";
import StreetSelector from "./StreetSelector";

const DeadCards = styled(Form.Input)`
  width: 80%;
`;

const InputForm = ({
  onHandleStreetHandler,
  onStreetChangeHandler,
  deadCards,
  mode
}) => {
  return (
    <Fragment>
      <DeadCards
        label="Dead Cards"
        placeholder="Enter dead cards, for example Ah, As, 2c"
        name="deadcards"
        onChange={onStreetChangeHandler}
      ></DeadCards>
      <BoardCards cardsFlipped={deadCards}></BoardCards>
      <StreetSelector
        onHandleStreetHandler={onHandleStreetHandler}
        mode={mode}
      ></StreetSelector>
      <Button label="assign"></Button>
      <Button label="Ranges"></Button>
      <Button label="Clear Selection"></Button>
      <Button label="Clear Suits"></Button>
      <Button label="Split Suits"></Button>
    </Fragment>
  );
};

export { InputForm };
