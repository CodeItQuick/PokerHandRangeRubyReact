import React, { useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import styled from "styled-components";
import { reducer } from "../../containers/MainPage/reducer.js";
import useInjectReducer from "../../HOC/useInjectReducer.js";

const Hand = ({ onHandClick, cards, colorCard }) => {
  console.log(cards); //?
  return <Button>Hello</Button>;
};

export default Hand;
