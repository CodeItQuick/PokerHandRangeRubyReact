import prange from "prange";
class RangeObject {
  constructor(street, streetAction, startingHands) {
    this.street = street;
    this.streetAction = streetAction;
    this.startingHands = startingHands;
  }

  getFriendlyRangeOutput() {
    const standardHandNotations = this.startingHands.reduce(
      (acc, startingHand) => {
        if (startingHand.getHand().length > 3) return acc;
        else return [...acc, startingHand.getHand()];
      },
      []
    );

    let rangeNotation = prange.reverse(standardHandNotations);

    let specificComboNotations = [],
      specificCombo;

    this.startingHands.forEach((startingHand) => {
      if (startingHand.getHand().length > 3) {
        specificCombo = startingHand.getHand();
        specificComboNotations = [...specificComboNotations, specificCombo];
      }
    });

    rangeNotation = rangeNotation + ", " + specificComboNotations.join(", ");

    if (rangeNotation.trim().substr(rangeNotation.length - 2, 1) === ",")
      return rangeNotation.trim().substr(0, rangeNotation.length - 2);
    else return rangeNotation.trim().substr(0, rangeNotation.length);
  }

  toRangeData() {
    return {
      Street: this.street,
      BetType: this.streetAction,
      hands: this.startingHands.map((startingHand) => startingHand.getHand()),
    };
  }

  displayInfo() {
    let handColorMap = {};

    let idx;
    switch (this.streetAction) {
      case "Raise4BetCall":
      case "Valuebet":
        idx = 0;
        break;
      case "Raise4BetFold":
      case "Bluff":
        idx = 1;
        break;
      case "RaiseCall":
      case "CheckCall":
        idx = 2;
        break;
      case "RaiseFold":
      case "CheckFold":
        idx = 3;
        break;
      case "SmallValuebet":
        idx = 4;
        break;
      case "SmallBluff":
        idx = 5;
        break;
      default:
        break;
    }
    this.startingHands.forEach((startingHand) => {
      if (startingHand.getHand().length > 0)
        Object.assign(handColorMap, {
          [startingHand.getHand()]: {
            colorCards: [
              "#0F6125",
              "#ed87a7",
              "#3ac0ff",
              "#dc73ff",
              "#003d3e",
              "#8A4000",
            ][idx],
            equity: "n/a",
          },
        });
    });

    return handColorMap;
  }

  allHandsOneArray() {
    return this.startingHands.reduce((acc, startingHand) => {
      return [...acc, startingHand];
    }, []);
  }

  toStartingHandsArray() {
    return this.startingHands;
  }
  filterForHandsInRange(street) {
    if (this.street == street) return this.startingHands;
    else return [];
  }
}

export default RangeObject;
