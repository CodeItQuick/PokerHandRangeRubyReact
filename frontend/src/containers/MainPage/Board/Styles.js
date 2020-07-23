import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Grid, Button, Table } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";

export const ColorCard = styled(animated.button)`
  cursor: pointer;
  height: 100% !important;
  width: 100% !important;
  padding: 0px;
  margin: 0px;
  font-size: 7px;
  text-align: center;
  color: black;
  background-color: ${props => props.coloring};
  ${props =>
    props.border_attrib
      ? "border: 2px dashed black;"
      : "border: 2px solid #FFF;"}
  @media (min-width: 576px) {
    font-size: 12px;
  }
`;

export const StyledRow = styled(Table.Row)`
  margin: 0px;
  flex-wrap: nowrap !important;
`;

export const StyledCol = styled(Table.Cell)`
  padding: 0px !important;
  margin: 0px;
`;
export const orderedCard = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2"
];
