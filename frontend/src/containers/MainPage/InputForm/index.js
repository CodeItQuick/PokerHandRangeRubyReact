import React, { Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { Form, Button } from "semantic-ui-react";
import BoardCards from "./BoardCards";
const DeadCards = styled(Form.Input)`
  width: 80%;
`;
// TODO: Add functionality to assign, ranges, clear selection, clear suits, split suits
const InputForm = ({
  onHandleStreetHandler,
  onHandleStreetHandlerButtons,
  mode
}) => {
  const [deadCards, updateDeadCards] = useState();

  const onChangeStreetHandler = e => updateDeadCards(e.target.value);

  return (
    <Fragment>
      <DeadCards
        label="Dead Cards"
        placeholder="Enter dead cards, for example Ah, As, 2c"
        name="deadcards"
        onChange={onChangeStreetHandler}
      ></DeadCards>
      <BoardCards deadCards={deadCards} />
    </Fragment>
  );
};

export { InputForm };
