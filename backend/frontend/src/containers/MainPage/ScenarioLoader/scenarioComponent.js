import React, { useState, useEffect } from "react";

import { Button } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { initGetScenario } from "../actions";
import { useAuth0 } from "@auth0/auth0-react";

const ScenarioComponent = ({ scenario, token }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => dispatch(initGetScenario({ scenario, token }));

  return (
    <Button onClick={onClickHandler}>
      {scenario ? scenario.displayScenario() : ""}
    </Button>
  );
};

export default ScenarioComponent;
