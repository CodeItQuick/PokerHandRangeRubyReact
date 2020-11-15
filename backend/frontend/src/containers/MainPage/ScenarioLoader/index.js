import React, { memo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Pagination, Tab } from "semantic-ui-react";
import { initialState } from "../reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeSelectScenariosClass } from "../selectors";
import Scenario from "./Scenario";
import Scenarios from "./Scenarios";
import { useEffect } from "react";
const panes = (Scenarios, activePage, numScenarioArray) => [
  {
    menuItem: `UTG (${numScenarioArray[0]})`,
    render: () => Scenarios.renderScenario({ position: "UTG", activePage }),
  },
  {
    menuItem: `MP (${numScenarioArray[1]})`,
    render: () => Scenarios.renderScenario({ position: "MP", activePage }),
  },
  {
    menuItem: `CO (${numScenarioArray[2]})`,
    render: () => Scenarios.renderScenario({ position: "CO", activePage }),
  },
  {
    menuItem: `BU (${numScenarioArray[3]})`,
    render: () => Scenarios.renderScenario({ position: "BU", activePage }),
  },
  {
    menuItem: `SB (${numScenarioArray[4]})`,
    render: () => Scenarios.renderScenario({ position: "SB", activePage }),
  },
];
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
  const [activePage, updateActivePage] = useState(1);
  const [totalPages, updateTotalPages] = useState(
    1 + Math.floor(scenarios.filteredScenariosPosition() / 10)
  );

  return (
    <Modal onHide={onCloseModal} show={active} size="large">
      <Modal.Header>
        <Modal.Title>Select a Scenario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab
          menu={{ attached: "top" }}
          panes={panes(
            scenarios,
            activePage,
            scenarios.filteredScenariosArray()
          )}
          onTabChange={(e, { activeIndex, panes }) =>
            updateTotalPages(
              1 +
                Math.floor(scenarios.filteredScenariosArray()[activeIndex] / 10)
            )
          }
        />
        <Pagination
          defaultActivePage={1}
          onPageChange={(e, { activePage }) => updateActivePage(activePage)}
          pointing
          secondary
          totalPages={totalPages}
        />
      </Modal.Body>
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
