import React, { Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import BoardCards from "./BoardCards";
import StreetSelector from "./StreetSelector";

const DeadCards = styled(Form.Input)`
  width: 80%;
`;
// TODO: Add functionality to assign, ranges, clear selection, clear suits, split suits
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
      <BoardCards deadCards={deadCards} />
      <StreetSelector
        onHandleStreetHandler={onHandleStreetHandler}
        mode={mode}
      ></StreetSelector>
    </Fragment>
  );
};

export { InputForm };
