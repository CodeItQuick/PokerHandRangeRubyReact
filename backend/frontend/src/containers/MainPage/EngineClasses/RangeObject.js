import prange from "prange";
class RangeObject {
  constructor(street, streetAction, cardSuitHandArray) {
    this.street = street;
    this.streetAction = streetAction;
    this.cardSuitHandArray = cardSuitHandArray;
  }

  getFriendlyRangeOutput() {
    const validRange = this.cardSuitHandArray.reduce((acc, curr) => {
      if (curr.getHand().length > 3) return acc;
      else return [...acc, curr.getHand()];
    }, []);

    let shortHandNotation = prange.reverse(validRange);

    let extraCardsNotation = [],
      newSuit;

    this.cardSuitHandArray.forEach(SuitHand => {
      if (SuitHand.getHand().length > 3) {
        newSuit = SuitHand.getHand();
        extraCardsNotation = [...extraCardsNotation, newSuit];
      }
    });

    shortHandNotation =
      shortHandNotation + ", " + extraCardsNotation.join(", ");

    if (
      shortHandNotation.trim().substr(shortHandNotation.length - 2, 1) === ","
    )
      return shortHandNotation.trim().substr(0, shortHandNotation.length - 2);
    else return shortHandNotation.trim().substr(0, shortHandNotation.length);
  }

  getRangesObject() {
    return {
      Street: this.street,
      BetType: this.streetAction,
      hands: this.cardSuitHandArray.map(SuitHand => SuitHand.getHand())
    };
  }

  displayInfo() {
    let cardClone = {};

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
    this.cardSuitHandArray.forEach(CardSuitHand => {
      if (CardSuitHand.getHand().length > 0)
        Object.assign(cardClone, {
          [CardSuitHand.getHand()]: {
            colorCards: [
              "#0F6125",
              "#ed87a7",
              "#3ac0ff",
              "#dc73ff",
              "#003d3e",
              "#8A4000"
            ][idx],
            equity: "n/a"
          }
        });
    });

    return cardClone;
  }

  allHandsOneArray() {
    return this.cardSuitHandArray.reduce((acc, curr) => {
      return [...acc, curr];
    }, []);
  }

  toCardHandRange() {
    return this.cardSuitHandArray;
  }
  filterForHandsInRange(Street) {
    if (this.street == Street) return this.cardSuitHandArray;
    else return [];
  }
}

export default RangeObject;
