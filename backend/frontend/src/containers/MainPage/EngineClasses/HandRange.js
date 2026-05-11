import prange from "prange";
class HandRange {
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

  toHandColorMap() {
    let handColorMap = {};

    let actionColorIndex;
    switch (this.streetAction) {
      case "Raise4BetCall":
      case "Valuebet":
        actionColorIndex = 0;
        break;
      case "Raise4BetFold":
      case "Bluff":
        actionColorIndex = 1;
        break;
      case "RaiseCall":
      case "CheckCall":
        actionColorIndex = 2;
        break;
      case "RaiseFold":
      case "CheckFold":
        actionColorIndex = 3;
        break;
      case "SmallValuebet":
        actionColorIndex = 4;
        break;
      case "SmallBluff":
        actionColorIndex = 5;
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
            ][actionColorIndex],
            equity: "n/a",
          },
        });
    });

    return handColorMap;
  }

  allStartingHands() {
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

export default HandRange;
