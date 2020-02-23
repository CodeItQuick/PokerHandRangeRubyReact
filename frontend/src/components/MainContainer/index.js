import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container'

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 50px;
`;

const MainContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default MainContainer;