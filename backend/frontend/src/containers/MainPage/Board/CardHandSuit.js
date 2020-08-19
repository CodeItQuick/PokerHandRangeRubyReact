const orderedCard = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2"
];
export default class CardHandSuit {
  constructor(cardOne, cardTwo, suit = "") {
    const optionalCardSuitOne = suit.length > 1 ? suit.substring(0, 1) : "";
    const optionalCardSuitTwo = suit.length > 1 ? suit.substring(1, 2) : "";
    if (suit.length <= 1 && cardOne.length === 1) {
      this.cardOne = this._getCards(cardOne, cardTwo)[0];
      this.cardTwo = this._getCards(cardOne, cardTwo)[1];
    } else if (suit.length === 2 && cardOne.length === 1) {
      this.cardOne = cardOne + optionalCardSuitOne;
      this.cardTwo = cardTwo + optionalCardSuitTwo;
    } else if (cardOne.length === 2) {
      this.cardOne = cardOne;
      this.cardTwo = cardTwo;
    }
    if (suit.length < 1) this.suit = this._displayCardSuit(cardOne, cardTwo);
    else if (suit.length === 1) this.suit = suit;
    else this.suit = "";
    this.equity = "n/a"; //FIXME: REMOVE
  }

  //TODO: getCards and displayCardSuit should be an orderedCard object/class
  _getCards(cardOne, cardTwo) {
    let card1 = "",
      card2 = "";
    if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
      card1 = cardOne;
      card2 = cardTwo;
    } else if (cardOne === cardTwo) {
      card1 = cardOne;
      card2 = cardTwo;
    } else {
      card1 = cardTwo;
      card2 = cardOne;
    }
    return [card1, card2];
  }

  _displayCardSuit(cardOne, cardTwo) {
    let displaySuit = "";
    if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
      displaySuit = "s";
    } else if (orderedCard.indexOf(cardOne) === orderedCard.indexOf(cardTwo)) {
      displaySuit = "";
    } else {
      displaySuit = "o";
    }
    return displaySuit;
  }

  getHand() {
    return this.cardOne + this.cardTwo + this.suit;
  }

  getHandArray() {
    return [this.cardOne, this.cardTwo, this.suit];
  }

  isInRange(rangeObj) {
    let filteredRangeObj = [];

    if (rangeObj === [] || rangeObj === [[], [], [], []]) return false;

    filteredRangeObj = rangeObj.filter(cardHandSuitObj => {
      let numObjects = cardHandSuit =>
        cardHandSuit.filter(
          hand => hand.getHand() == this.cardOne + this.cardTwo + this.suit
        );
      return numObjects(cardHandSuitObj).length > 0;
    });

    return filteredRangeObj.length > 0;
  }

  isSuit(suit) {
    return this.suit === suit;
  }

  indexsOf(arrayOfCardHandSuit) {
    let Index = -1;
    arrayOfCardHandSuit.forEach((cardHandSuits, idx) => {
      if (this.isInRange([cardHandSuits])) Index = idx;
    });

    return Index;
  }
}

//Change code to use a closure instead of a class

const CardHandSuitClosure = (cardOneParam, cardTwoParam, suitParam = "") => {
  let cardOne, cardTwo, suit;
  let equity = "n/a"; //FIXME: REMOVE

  const _getCards = (cardOne, cardTwo) => {
    let card1 = "",
      card2 = "";
    if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
      card1 = cardOne;
      card2 = cardTwo;
    } else if (cardOne === cardTwo) {
      card1 = cardOne;
      card2 = cardTwo;
    } else {
      card1 = cardTwo;
      card2 = cardOne;
    }
    return [card1, card2];
  };

  const _displayCardSuit = (cardOne, cardTwo) => {
    let displaySuit = "";
    if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
      displaySuit = "s";
    } else if (orderedCard.indexOf(cardOne) === orderedCard.indexOf(cardTwo)) {
      displaySuit = "";
    } else {
      displaySuit = "o";
    }
    return displaySuit;
  };

  //constructor code for building the closure
  const optionalCardSuitOne =
    suitParam.length > 1 ? suitParam.substring(0, 1) : "";
  const optionalCardSuitTwo =
    suitParam.length > 1 ? suitParam.substring(1, 2) : "";
  if (suitParam.length <= 1 && cardOneParam.length === 1) {
    cardOne = _getCards(cardOneParam, cardTwoParam)[0];
    cardTwo = _getCards(cardOneParam, cardTwoParam)[1];
  } else if (suitParam.length === 2 && cardOneParam.length === 1) {
    cardOne = cardOneParam + optionalCardSuitOne;
    cardTwo = cardTwoParam + optionalCardSuitTwo;
  } else if (cardOneParam.length === 2) {
    cardOne = cardOneParam;
    cardTwo = cardTwoParam;
  }
  if (suitParam.length < 1) suit = _displayCardSuit(cardOneParam, cardTwoParam);
  else if (suitParam.length === 1) suit = suitParam;
  else suit = "";

  return {
    //TODO: getCards and displayCardSuit should be an orderedCard object/class

    getHand: () => {
      return cardOne + cardTwo + suit;
    },

    getHandArray: () => {
      return [cardOne, cardTwo, suit];
    },

    isInRange: rangeObj => {
      let filteredRangeObj = [];

      if (rangeObj === [] || rangeObj === [[], [], [], []]) return false;

      filteredRangeObj = rangeObj.filter(cardHandSuitObj => {
        let numObjects = cardHandSuit =>
          cardHandSuit.filter(
            hand => hand.getHand() === cardOne + cardTwo + suit
          );
        return numObjects(cardHandSuitObj).length > 0;
      });

      return filteredRangeObj.length > 0;
    },

    isSuit: suitParam => {
      return suit === suitParam;
    },

    indexsOf: arrayOfCardHandSuit => {
      let Index = -1;
      arrayOfCardHandSuit.forEach((cardHandSuits, idx) => {
        if (this.isInRange([cardHandSuits])) Index = idx;
      });

      return Index;
    }
  };
};

export { CardHandSuitClosure };

// const orderedCard = [];

// export default class CardHandSuit {
//   constructor(
//     private _cardOne: string,
//     private _cardTwo: string,
//     private _suit?: string
//   ) {
//     this._setCardSuit();
//     this._sortCards();
//   }

//   public getHand(): string {
//     return `${this._cardOne}${this._cardTwo}${this._suit}`;
//   }
// {
//   public getHandArray(): string[]
//     return [this._cardOne, this._cardTwo, this._suit];
//   }

//   public isSuit(suit: string): boolean {
//     return this._suit === suit;
//   }

//   public isInRange(rangeObj: CardHandSuit[]): boolean {
//     const filteredRangeObj = rangeObj.filter(
//       cardHandSuitObj => (cardHandSuitObj.getHand() === this.getHand())
//     );

//     return filteredRangeObj.length > 0;
//   }

//   public indexsOf(arrayOfCardHandSuit: CardHandSuit[]): number {
//     arrayOfCardHandSuit.forEach((cardHandSuits, idx) => {
//       if (this.isInRange([cardHandSuits])) {
//         return idx;
//       }
//     });

//     return -1;
//   }

//   private _setCardSuit(): string {
//     if (this._suit) {
//       return;
//     }

//     if (this._cardOne === this._cardTwo) {
//       this._suit = '';
//       return;
//     }

//     this._suit = (orderedCard.indexOf(this._cardOne) < orderedCard.indexOf(this._cardTwo)) ? 's' : 'o';
//   }

//   private _sortCards(): void {
//     if (orderedCard.indexOf(this._cardOne) > orderedCard.indexOf(this._cardTwo)) {
//       this._cardOne, this._cardTwo = this._cardTwo, this._cardOne;
//     }
//   }
// }
