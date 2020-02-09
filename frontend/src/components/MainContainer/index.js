import React from 'react';
import DefaultContainer from 'react-bootstrap/Container';
import styled from 'styled-components';

const Container = styled(DefaultContainer)`
  margin-top: 30px;
  margin-bottom: 50px;
`;

const MainContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default MainContainer;