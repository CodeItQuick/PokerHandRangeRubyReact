import React, { memo, useCallback, useState, useEffect } from "react";
import { Table, Button } from "semantic-ui-react";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { makeSelectMode, makeSelectSelectedStreet } from "./selector";
import { initSetHandRangeSelect } from "./actions";
import useInjectReducer from "../../../HOC/useInjectReducer";
import reducer from './reducer'

const buttonColors = {
  Valuebet: "green",
  Bluff: "red",
  CheckCall: "blue",
  CheckFold: "purple",
  SmallValuebet: "teal",
  SmallBluff: "orange",
  Raise4BetCall: "green",
  Raise4BetFold: "red",
  RaiseCall: "blue",
  RaiseFold: "violet",
  CheckDown: "blue"
};

const displayProperRange = (isIP, street, RangeObject) => {
  if (
    street === "Flop" &&
    isIP == false &&
    RangeObject.getRangesObject().BetType === "Valuebet"
  )
    return "Value Check-Raise";
  if (
    street === "Flop" &&
    isIP == false &&
    RangeObject.getRangesObject().BetType === "Bluff"
  )
    return "Bluff Check-Raise";

  return RangeObject.getRangesObject().BetType;
};

const rangeText = (rangeObject, betType, streetAction) => {
  if (
    rangeObject.getFriendlyRangeOutput().length < 3 &&
    betType === streetAction
  )
    return "Please select a hand";
  else if (
    rangeObject.getFriendlyRangeOutput().length < 3 &&
    betType !== streetAction
  )
    return "You must select this Bet Type to add to this range.";
  else return rangeObject.getFriendlyRangeOutput();
};
const key = 'global'
const CurrentRanges = ({
  mode: { streetAction, street, isIP },
  selectedStreet
}) => {
	useInjectReducer({ key, reducer });
  const dispatch = useDispatch();
 const [changingStreet, updateChangingStreet] = useState(selectedStreet);

  useEffect(() => {
    updateChangingStreet(selectedStreet);
  }, [selectedStreet]);

  const onHandleStreetHandler = (e, { name, value }) => {
    dispatch(
      initSetHandRangeSelect({
        name,
        value
      })
    );
  };

  return (
    <>
      <Table celled structured selectable>
        <Table.Body stackable>
          {changingStreet.map((RangeObject, idx) => (
            <Table.Row>
              <Table.Cell>
                <Button
                  onClick={onHandleStreetHandler}
                  id={
                    "street" +
                    ["First", "Second", "Third", "Fourth"][idx] +
                    "Choice"
                  }
                  name={street}
                  value={RangeObject.getRangesObject().BetType}
                  active={
                    RangeObject.getRangesObject().BetType === streetAction
                  }
                  inverted
                  color={buttonColors[RangeObject.getRangesObject().BetType]}
                >
                  {displayProperRange(isIP, street, RangeObject)}
                </Button>
              </Table.Cell>
              <Table.Cell>
                {rangeText(
                  RangeObject,
                  RangeObject.getRangesObject().BetType,
                  streetAction
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
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
