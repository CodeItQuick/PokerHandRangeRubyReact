import React, { Fragment, useState, memo } from "react";
import { Form, Radio, Tab, Input } from "semantic-ui-react";
import FolderGroup from "./FolderGroup";

import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import { makeSelectFolder } from "../selectors.js";
import {
  setDynamicFolderInfo,
  saveAndLoad,
  loadNewFolder,
  setHandRangeSelect
} from "../actions";

//FIXME: This bugs out on no login
const panes = Folder =>
  Folder.map((curr, idx) => {
    return {
      menuItem: curr,
      render: () => <FolderGroup folderIdx={idx} folderName={curr} />
    };
  });

const UserFunctionality = ({ Folder }) => {
  const dispatch = useDispatch();
  console.log(Folder);
  const onChangeHandler = (e, { activeIndex, panes }) => {
    console.log(panes[activeIndex].menuItem);
    dispatch(
      setDynamicFolderInfo({
        folderID: panes[activeIndex].menuItem,
        folderSubgroupName: "Opening Ranges",
        folderSubgroupRangeName: "UTG"
      })
    ); //TODO: Hardcoded for now
    dispatch(
      setHandRangeSelect({
        name: "Preflop",
        value: "Raise4BetCall",
        newFolder: true
      })
    );
  };

  return (
    <Form>
      <Tab panes={panes(Folder)} onTabChange={onChangeHandler} />
    </Form>
  );
};

const mapStateToProps = () => {
  const getFolder = makeSelectFolder();
  const mapState = state => {
    return {
      Folder: getFolder(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(UserFunctionality);
