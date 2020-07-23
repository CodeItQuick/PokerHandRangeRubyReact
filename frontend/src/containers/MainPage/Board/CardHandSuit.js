import { orderedCard } from "./StateUpdate";

export default class CardHandSuit {
  constructor(cardOne, cardTwo, suit = "") {
    this.cardOne = this.getCards(cardOne, cardTwo)[0];
    this.cardTwo = this.getCards(cardOne, cardTwo)[1];
    this.suit = "";
    if (suit.length > 0)
      this.suit = suit || this.displayCardSuit(cardOne, cardTwo);
    else this.suit = this.displayCardSuit(cardOne, cardTwo);
    this.equity = "n/a";
  }

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
    if (typeof rangeObj !== "object") return false;

    const filteredRangeObj = rangeObj.filter(
      cardHandSuitObj =>
        (cardHandSuitObj.cardOne +
          cardHandSuitObj.cardTwo +
          cardHandSuitObj.suit || cardHandSuitObj.getHand()) ==
        this.cardOne + this.cardTwo + this.suit
    );

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

  doesShareCard(otherCardHandSuit) {
    return true;
  }
}
