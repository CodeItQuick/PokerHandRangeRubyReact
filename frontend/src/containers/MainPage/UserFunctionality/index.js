import React, { Fragment, useState } from "react";
import { Form, Radio, Tab, Input } from "semantic-ui-react";
import FolderGroup from "./FolderGroup";

const panes = [
  {
    menuItem: "TAG Folder",
    render: ({ onChangeHandler, folder }) => <FolderGroup />
  },
  { menuItem: "LAG Folder", render: () => <FolderGroup /> },
  { menuItem: "Folder 3", render: () => <FolderGroup /> }
];

const UserFunctionality = ({ onTabChangeHandler }) => {
  return (
    <Form>
      <label>Current Range Folder</label>
      <Tab panes={panes} onTabChange={onTabChangeHandler} />
    </Form>
  );
};

export default UserFunctionality;
