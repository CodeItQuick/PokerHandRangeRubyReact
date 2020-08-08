import React, { useState, memo } from "react";
import { Modal } from "react-bootstrap";
import { Icon, Button } from "semantic-ui-react";
import ScenarioComponent from "./scenarioComponent";
import { initialState } from "../reducer";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { makeSelectScenariosClass } from "../selectors";
import Scenario from "./Scenario";
import Scenarios from "./Scenarios";

const ScenarioLoader = ({
  active,
  token,
  onCloseModal,
  scenarios = new Scenarios([
    new Scenario(
      "Ac, Th, 4s",
      initialState.rangeRepoIP,
      initialState.rangeRepoOOP
    )
  ])
}) => {
  return (
    <Modal onHide={onCloseModal} show={active} size="medium">
      <Modal.Header>
        <Modal.Title>Select a Scenario</Modal.Title>
      </Modal.Header>
      <Modal.Body>{scenarios.displayScenarios(token)}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onCloseModal}>Close</Button>
        <Button onClick={onCloseModal}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = () => {
  const getScenarios = makeSelectScenariosClass();

  const mapState = state => {
    return {
      scenarios: getScenarios(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ScenarioLoader);
