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
import styled from "styled-components";
const panes = (Scenarios, activePage, numScenarioArray, windowWidth) => [
  {
    menuItem: `UTG${windowWidth > 500 ? "(" + numScenarioArray[0] + ")" : ""}`,
    render: () => Scenarios.renderScenario({ position: "UTG", activePage }),
  },
  {
    menuItem: `MP${windowWidth > 500 ? "(" + numScenarioArray[1] + ")" : ""}`,
    render: () => Scenarios.renderScenario({ position: "MP", activePage }),
  },
  {
    menuItem: `CO${windowWidth > 500 ? "(" + numScenarioArray[2] + ")" : ""}`,
    render: () => Scenarios.renderScenario({ position: "CO", activePage }),
  },
  {
    menuItem: `BU${windowWidth > 500 ? "(" + numScenarioArray[3] + ")" : ""}`,
    render: () => Scenarios.renderScenario({ position: "BU", activePage }),
  },
  {
    menuItem: `SB${windowWidth > 500 ? "(" + numScenarioArray[4] + ")" : ""}`,
    render: () => Scenarios.renderScenario({ position: "SB", activePage }),
  },
];

const StyledTab = styled(Tab)`
  font-size: 10px !important;
  padding: 0px;
  @media (min-width: 500px) {
    font-size: 14px;
  }
`;

const ScenarioLoader = ({ active, token, onCloseModal, scenarios }) => {
  const [activePage, updateActivePage] = useState(1);
  const [totalPages, updateTotalPages] = useState(
    1 + Math.floor(scenarios.filteredScenariosPosition() / 10)
  );
  const [injectedScenarios, setInjectedScenarios] = useState(scenarios);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setInjectedScenarios(scenarios.injectToken(token));
  }, [scenarios, token]);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  return (
    <Modal onHide={onCloseModal} show={active} size="large">
      <Modal.Header>
        <Modal.Title>Select a Scenario</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "0px" }}>
        <StyledTab
          panes={panes(
            scenarios,
            activePage,
            scenarios.filteredScenariosArray(),
            windowWidth
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
