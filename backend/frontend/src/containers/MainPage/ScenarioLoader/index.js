import React, { memo } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import { initialState } from "../reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeSelectScenariosClass } from "../selectors";
import Scenario from "./Scenario";
import Scenarios from "./Scenarios";

const ScenarioLoader = ({
  active,
  token,
  onCloseModal,
  scenarios = new Scenarios([
    new Scenario({
      board: "Ac, Th, 4s",
      rangeRepoIP: initialState.rangeRepoIP,
      rangeRepoOOP: initialState.rangeRepoOOP,
      OpenerPosition: "UTG",
      DefenderPosition: "MP",
      Scenarioname: "default",
      Filename: "default_scenario_name",
    }),
  ]),
}) => {
  return (
    <Modal onHide={onCloseModal} show={active} size="large">
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

  const mapState = (state) => {
    return {
      scenarios: getScenarios(state),
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ScenarioLoader);
