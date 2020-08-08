import React, { Fragment, memo } from "react";
import { Button } from "semantic-ui-react";
import { makeSelectMode } from "../selectors";
import { compose } from "redux";
import { connect } from "react-redux";

const InputStreetAction = ({
  streetAction,
  onHandleStreetHandlerButtons,
  mode: { street, isIP }
}) => {
  return street == "Preflop" ? (
    <Fragment>
      <Button.Group inverted fluid widths="2">
        <Button
          inverted
          color="green"
          id="firstChoice"
          active={streetAction == "Raise4BetCall"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "Raise4BetCall"
            })
          }
        >
          Raise/4bet/Call
        </Button>
        <Button.Or />
        <Button
          inverted
          color="red"
          id="secondChoice"
          active={streetAction == "Raise4BetFold"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "Raise4BetFold"
            })
          }
        >
          Raise/4bet/Fold
        </Button>
        <Button.Or />
      </Button.Group>
      <Button.Group inverted fluid widths="2">
        <Button
          inverted
          color="blue"
          id="thirdChoice"
          active={streetAction == "RaiseCall"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "RaiseCall"
            })
          }
        >
          Raise/Call
        </Button>
        <Button.Or />
        <Button
          inverted
          color="purple"
          id="fourthChoice"
          active={streetAction == "RaiseFold"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "RaiseFold"
            })
          }
        >
          Raise/Fold
        </Button>
      </Button.Group>
    </Fragment>
  ) : (
    <Fragment>
      <Button.Group widths="2">
        <Button
          inverted
          color="green"
          id="firstChoice"
          active={streetAction == "Valuebet"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "Valuebet"
            })
          }
        >
          {!isIP && street === "Flop" ? "Value Check/Raise" : "Valuebet"}
        </Button>
        <Button.Or />
        <Button
          inverted
          color="red"
          id="secondChoice"
          active={streetAction == "Bluff"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "Bluff"
            })
          }
        >
          {!isIP && street === "Flop" ? "Bluff Check/Raise" : "Bluff"}
        </Button>
        <Button.Or />
      </Button.Group>
      <Button.Group widths="2">
        <Button
          inverted
          id="thirdChoice"
          color="blue"
          active={streetAction == "CheckCall"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "CheckCall"
            })
          }
        >
          Check/Call
        </Button>
        <Button.Or />
        <Button
          inverted
          color="purple"
          id="fourthChoice"
          active={streetAction == "CheckFold"}
          onClick={e =>
            onHandleStreetHandlerButtons(e, {
              street,
              streetAction: "CheckFold"
            })
          }
        >
          Check/Fold
        </Button>
      </Button.Group>
    </Fragment>
  );
};

const mapStateToProps = () => {
  const getMode = makeSelectMode();

  const mapState = state => {
    return {
      mode: getMode(state)
    };
  };
  return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(InputStreetAction);
