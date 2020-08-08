import prange from "prange";
class RangeObject {
  constructor(street, streetAction, cardSuitHandArray) {
    this.street = street;
    this.streetAction = streetAction;
    this.cardSuitHandArray = cardSuitHandArray;
  }

  getFriendlyRangeOutput() {
    let shortHandNotation = prange.reverse(
      this.cardSuitHandArray.reduce((acc, curr) => {
        if (curr.length > 4) {
          return acc;
        } else return [...acc, curr.getHand()];
      }, [])
    );

    let extraCardsNotation = [],
      newSuit;

    this.cardSuitHandArray.forEach(SuitHand => {
      console.log(SuitHand.getHand());
      if (SuitHand.getHand().length > 4) {
        newSuit = SuitHand.getHand();
        newSuit = newSuit.replace(/s/, "");
        newSuit = newSuit.replace(/o/, "");
        newSuit = newSuit.replace(/ /g, "");
        newSuit = newSuit.replace(/Spade/g, "s");
        newSuit = newSuit.replace(/Club/g, "c");
        newSuit = newSuit.replace(/Diamond/g, "d");
        newSuit = newSuit.replace(/Heart/g, "h");
        extraCardsNotation.push(newSuit);
      }
    });

    shortHandNotation =
      shortHandNotation + ", " + extraCardsNotation.join(", ");

    return shortHandNotation;
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
      default:
        break;
    }
    this.cardSuitHandArray.forEach(CardSuitHand => {
      if (CardSuitHand)
        cardClone = {
          ...cardClone,
          [CardSuitHand.getHand()]: {
            colorCards: ["#8bddbe", "#ed87a7", "#3ac0ff", "#dc73ff"][idx],
            equity: "n/a"
          }
        };
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
