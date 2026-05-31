import React from "react";

import { Button, Table } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { initGetScenario } from "../actions";
import reducer from "../reducer";
import saga from "../saga";
import { useInjectReducer } from "../../../HOC/useInjectReducer";
import { useInjectSaga } from "../../../HOC/injectSaga";

const key = "global";
const ScenarioComponent = ({ scenario, token }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  const onClickHandler = () => dispatch(initGetScenario({ scenario, token }));

  return (
    <Table.Row id={scenario?.getScenarioName()}>
      <Table.Cell>{scenario ? scenario?.getScenarioName() : ""}</Table.Cell>
      <Table.Cell>{scenario ? scenario?.getOpenerPosition() : ""}</Table.Cell>
      <Table.Cell>{scenario ? scenario?.getDefenderPosition() : ""}</Table.Cell>
      <Table.Cell>{scenario ? scenario?.getDeadcards() : ""}</Table.Cell>
      <Table.Cell>
        {scenario.getScenarioName().length ? (
          <Button
            color="green"
            onClick={onClickHandler}
            className="load-button"
          >
            Load
          </Button>
        ) : (
          ""
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default ScenarioComponent;
