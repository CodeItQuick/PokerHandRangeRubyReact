import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

const StyledContainer = styled(Container)`
  padding: 0px !important;
  @media (min-width: 1200px) {
    display: block;
    margin-top: 30px;
    margin-bottom: 50px;
  }
`;

const MainContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default MainContainer;
