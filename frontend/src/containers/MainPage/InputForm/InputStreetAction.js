import React from "react";
import { Button } from "semantic-ui-react";

const InputStreetAction = ({
  street,
  streetAction,
  onHandleStreetHandlerButtons
}) => {
  return street == "Preflop" ? (
    <Button.Group inverted>
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
      <Button
        inverted
        color="grey"
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
        color="white"
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
  ) : (
    <Button.Group>
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
        Valuebet
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
        Bluff
      </Button>
      <Button.Or />
      <Button
        inverted
        color="black"
        id="thirdChoice"
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
        color="white"
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
  );
};

export default InputStreetAction;
