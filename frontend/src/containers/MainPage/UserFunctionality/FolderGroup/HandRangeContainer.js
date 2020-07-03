import React, { Fragment, useState } from "react";
import { Row, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import {
  setDynamicFolderInfo,
  saveAndLoad,
  loadNewFolder,
  setHandRangeSelect
} from "../../actions";

const StyledContainer = styled(Container)`
  display: block;
`;

const StyledRow = styled(Row)`
  &&& {
    display: flex;
  }
`;

const StyledButton = styled(Button)`
  &&& {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 200px;
    background-color: ${props => (props.isactive ? "#777" : "#CCC")};
    color: ${props => (props.isactive ? "#CCC" : "#000")};
  }
`;

const HandRangeContainer = ({ id, folderName, folderGroupName }) => {
  const dispatch = useDispatch();
  const [activeIndex, updateActiveIndex] = useState("UTG");

  const onClickHandler = (e, data) => {
    updateActiveIndex(e.target.name);
    dispatch(
      setDynamicFolderInfo({
        folderID: folderName,
        folderSubgroupName: folderGroupName,
        folderSubgroupRangeName: e.target.name
      })
    );
    dispatch(
      setHandRangeSelect({
        name: "Preflop",
        value: "Raise4BetCall",
        newFolder: true
      })
    );
  };
  return (
    <StyledContainer id={id}>
      {id === "OpeningRanges" ? (
        <StyledRow>
          <StyledButton
            onClick={onClickHandler}
            isactive={activeIndex === "UTG"}
            name="UTG"
          >
            Under The Gun
          </StyledButton>
        </StyledRow>
      ) : null}
      <StyledRow>
        <StyledButton
          onClick={onClickHandler}
          isactive={activeIndex === "MP"}
          name="MP"
        >
          Middle Position
        </StyledButton>
      </StyledRow>
      <StyledRow>
        <StyledButton
          onClick={onClickHandler}
          isactive={activeIndex === "CO"}
          name="CO"
        >
          Cutoff
        </StyledButton>
      </StyledRow>
      <StyledRow>
        <StyledButton
          onClick={onClickHandler}
          isactive={activeIndex === "BU"}
          name="BU"
        >
          Button
        </StyledButton>
      </StyledRow>
      <StyledRow>
        <StyledButton
          onClick={onClickHandler}
          isactive={activeIndex === "SB"}
          name="SB"
        >
          Small Blind
        </StyledButton>
      </StyledRow>
      {id === "DefendingRanges" ? (
        <StyledRow>
          <StyledButton
            onClick={onClickHandler}
            isactive={activeIndex === "BB"}
            name="BB"
          >
            Big Blind
          </StyledButton>
        </StyledRow>
      ) : null}
    </StyledContainer>
  );
};

export default HandRangeContainer;
