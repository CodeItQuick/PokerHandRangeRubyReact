import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Grid, Button, Table } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";

export const ColorCard = styled(animated.button)`
  border: none;
  width: 100% !important;
  border-color: rgba(0, 0, 0, 1);
  background-color: rgba(0, 0, 0, 0);
  font-size: 8px;
  padding: 0px;

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
  color: ${(props) => (props.cellGradient.length > 2 ? "white" : "black")};
  background-image: ${(props) =>
    props.cellGradient.length > 9
      ? " linear-gradient(to right, " + props.cellGradient + ")"
      : "none"};
  background-color: ${(props) =>
    props.cellGradient.length <= 9
      ? props.cellGradient + " !important"
      : "none !important"};

  border: ${(props) =>
    props.border_attrib == "true"
      ? "2px dashed black !important"
      : "2px solid #FFF !important"};
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
  "2",
];
