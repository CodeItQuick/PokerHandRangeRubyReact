import React, { useState, memo, useEffect } from "react";
import { Form, Input, Tab, Button } from "semantic-ui-react";

import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import { makeSelectFolder, makeSelectFolderGroup } from "../../selectors.js";

import {
  setDynamicFolderInfo,
  saveAndLoad,
  loadNewFolder,
  setHandRangeSelect
} from "../../actions.js";

import HandRangeContainer from "./HandRangeContainer.js";

const panes = (FolderGroup, folderIdx, folderName) =>
  FolderGroup.map((curr, idx) => {
    return {
      menuItem: curr,
      render: () => (
        <HandRangeContainer
          id={idx === 0 ? "OpeningRanges" : "DefendingRanges"}
          folderName={folderName}
          folderGroupName={curr}
        />
      ) //FIXME: hardcoded, for now
    };
  });

const FolderGroup = ({ FolderGroup, folderIdx = 0, folderName }) => {
  const dispatch = useDispatch();
  const [activeIndex, updateActiveIndex] = useState();

  const [rangeRFI, updateRangeRFI] = useState({
    "Opening Ranges": {
      UTG: 0,
      MP: 0,
      CO: 0,
      BU: 0,
      SB: 0
    },
    "Defending Ranges": {
      MP: 0,
      CO: 0,
      BU: 0,
      SB: 0,
      BB: 0
    }
  });

  const onChangeHandler = (e, { activeIndex, panes }) => {
    dispatch(saveAndLoad());
    dispatch(
      setDynamicFolderInfo({
        folderID: folderName,
        folderSubgroupName: panes[activeIndex].menuItem,
        folderSubgroupRangeName: "UTG"
      })
    ); //FIXME: Hardcoded for now
    dispatch(loadNewFolder());
    dispatch(
      setHandRangeSelect({
        name: "Preflop",
        value: "Raise4BetCall",
        newFolder: true
      })
    );
  };

  return (
    <Tab
      panes={panes(FolderGroup, folderIdx, folderName)}
      menu={{ fluid: true, vertical: true, tabular: true }}
      onTabChange={onChangeHandler}
    />
  );
};

const mapStateToProps = () => {
  const getFolderGroup = makeSelectFolderGroup();

  const mapState = state => {
    return {
      FolderGroup: getFolderGroup(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(FolderGroup);
