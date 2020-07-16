import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Grid, Button } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";

export const ColorCard = styled(animated.button)`
  cursor: pointer;
  padding-left: 0px;
  padding-right: 2px;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 100% !important;
  line-height: 10px !important;
  margin: 0px;
  font-size: 7px;
  text-align: center;
  color: black;
  background-color: ${props => props.coloring};
  ${props =>
    props.border_attrib ? "border: 3px dashed black;" : "border: none;"}
  @media (min-width: 576px) and (max-width: 767.98px) {
    width: 20px;
    padding: 5px;
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 30px;
    padding: 5px;
    font-size: 12px;
  }
  @media (min-width: 992px) {
    width: 30px;
    padding: 10px;
    font-size: 12px;
  }
`;

export const StyledRow = styled(Row)`
  margin: 0px;
  width: 100%;
  flex-wrap: nowrap !important;
`;

export const StyledCol = styled(Col)`
  margin: 0px;
  width: 100% !important;
  height: 40px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  justify-content: flex-start;
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
