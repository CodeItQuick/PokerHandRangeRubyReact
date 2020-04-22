import React, { useState } from "react";
import { Form, Input, Tab, Button } from "semantic-ui-react";

import HandRangeContainer from "./HandRangeContainer.js";

const panes = [
  {
    menuItem: "Opening Ranges",
    render: () => <HandRangeContainer id="OpeningRanges" />
  },
  {
    menuItem: "Defending Ranges",
    render: () => <HandRangeContainer id="DefendingRanges" />
  }
];

const FolderGroup = () => {
  return (
    <Tab panes={panes} menu={{ fluid: true, vertical: true, tabular: true }} />
  );
};

export default FolderGroup;
