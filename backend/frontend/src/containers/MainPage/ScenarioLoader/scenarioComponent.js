import React, { useState, useEffect } from "react";

import { Button } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { initGetScenario } from "../actions";
import { useAuth0 } from "@auth0/auth0-react";
import reducer from '../reducer';
import { useInjectReducer } from "../../../HOC/useInjectReducer";

const key = 'global';
const ScenarioComponent = ({ scenario, token }) => {
	useInjectReducer({ key, reducer });
  const dispatch = useDispatch();

  const onClickHandler = () => dispatch(initGetScenario({ scenario, token }));

  return (
    <Button onClick={onClickHandler}>
      {scenario ? scenario.displayScenario() : ""}
    </Button>
  );
};

export default ScenarioComponent;
