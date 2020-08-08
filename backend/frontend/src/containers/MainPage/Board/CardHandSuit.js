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
  constructor(cardOne, cardTwo, suit = undefined) {
    this.cardOne = this.getCards(cardOne, cardTwo)[0];
    this.cardTwo = this.getCards(cardOne, cardTwo)[1];
    this.suit = suit || this.displayCardSuit(cardOne, cardTwo);
    this.equity = "n/a";
  }

  //TODO: getCards and displayCardSuit should be an orderedCard object/class
  getCards(cardOne, cardTwo) {
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

  displayCardSuit(cardOne, cardTwo) {
    let displaySuit = "";
    if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
      displaySuit = "s";
    } else if (cardOne === cardTwo) {
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
    return this.suit == suit;
  }

  indexsOf(arrayOfCardHandSuit) {
    let Index = -1;
    arrayOfCardHandSuit.forEach((cardHandSuits, idx) => {
      if (this.isInRange([cardHandSuits])) Index = idx;
    });

    return Index;
  }
}

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
