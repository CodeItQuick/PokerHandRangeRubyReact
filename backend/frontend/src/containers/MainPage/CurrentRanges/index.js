import React, { memo } from "react";
import { Table, Button } from "semantic-ui-react";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { makeSelectMode, makeSelectSelectedStreet } from "../selectors";
import { setHandRangeSelect } from "../actions";

const buttonColors = {
  Valuebet: "green",
  Bluff: "red",
  CheckCall: "blue",
  CheckFold: "purple",
  Raise4BetCall: "green",
  Raise4BetFold: "red",
  RaiseCall: "blue",
  RaiseFold: "purple"
};

const CurrentRanges = ({ mode: { streetAction, street }, selectedStreet }) => {
  const dispatch = useDispatch();
  const onHandleStreetHandler = (e, { name, value }) => {
    dispatch(
      setHandRangeSelect({
        name,
        value
      })
    );
  };
  return (
    <Table celled structured>
      <Table.Body>
        {selectedStreet.map((RangeObject, idx) => (
          <Table.Row>
            <Table.Cell collapsing>
              <Button
                onClick={onHandleStreetHandler}
                id="streetFourthChoice"
                name={street}
                value={RangeObject.getRangesObject().BetType}
                active={RangeObject.getRangesObject().BetType == streetAction}
                inverted
                color={buttonColors[RangeObject.getRangesObject().BetType]}
              >
                {RangeObject.getRangesObject().BetType}
              </Button>
            </Table.Cell>
            <Table.Cell>
              {RangeObject.getFriendlyRangeOutput() || ""}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = () => {
  const getMode = makeSelectMode();
  const getSelectedStreet = makeSelectSelectedStreet();

  const mapState = state => {
    return {
      mode: getMode(state),
      selectedStreet: getSelectedStreet(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CurrentRanges);
