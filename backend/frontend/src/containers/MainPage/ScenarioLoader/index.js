import React, { memo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, Pagination, Tab } from "semantic-ui-react";
import { initialState } from "../reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeSelectScenariosClass } from "../selectors";
import { useEffect } from "react";
import styled from "styled-components";
import ScenariosComponent from "./ScenariosComponent";
const panes = (Scenarios, activePage, numScenarioArray, windowWidth) => [
  {
    menuItem: `UTG${windowWidth > 500 ? "(" + numScenarioArray[0] + ")" : ""}`,
    render: () => (
      <ScenariosComponent
        position={"UTG"}
        activePage={activePage}
        scenarios={Scenarios}
      />
    ),
  },
  {
    menuItem: `MP${windowWidth > 500 ? "(" + numScenarioArray[1] + ")" : ""}`,
    render: () => (
      <ScenariosComponent
        position={"MP"}
        activePage={activePage}
        scenarios={Scenarios}
      />
    ),
  },
  {
    menuItem: `CO${windowWidth > 500 ? "(" + numScenarioArray[2] + ")" : ""}`,
    render: () => (
      <ScenariosComponent
        position={"CO"}
        activePage={activePage}
        scenarios={Scenarios}
      />
    ),
  },
  {
    menuItem: `BU${windowWidth > 500 ? "(" + numScenarioArray[3] + ")" : ""}`,
    render: () => (
      <ScenariosComponent
        position={"BU"}
        activePage={activePage}
        scenarios={Scenarios}
      />
    ),
  },
  {
    menuItem: `SB${windowWidth > 500 ? "(" + numScenarioArray[4] + ")" : ""}`,
    render: () => (
      <ScenariosComponent
        position={"SB"}
        activePage={activePage}
        scenarios={Scenarios}
      />
    ),
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
            scenarios.injectToken(token),
            activePage,
            scenarios.injectToken(token).filteredScenariosArray(),
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
