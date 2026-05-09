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
  "2",
];

export default class StartingHand {
  constructor(cardOne, cardTwo, suit = "") {
    this.cardOne = cardOne;
    this.cardTwo = cardTwo;
    this.suit = suit;
    this.equity = "n/a"; //FIXME: REMOVE
  }

  getHand() {
    if (this.suit.length > 1)
      return (
        this.cardOne +
        this.suit.substr(0, 1) +
        this.cardTwo +
        this.suit.substr(1, 1)
      );
    else return this.cardOne + this.cardTwo + this.suit;
  }

  getHandArray() {
    return [this.cardOne, this.cardTwo, this.suit];
  }

  isInRange(rangeGroups) {
    let matchingGroups = [];

    if (rangeGroups === [] || rangeGroups === [[], [], [], []]) return false;

    matchingGroups = rangeGroups.filter((rangeGroup) => {
      let findMatchingHands = (group) =>
        group.filter(
          (hand) => hand.getHand() == this.cardOne + this.cardTwo + this.suit
        );
      return findMatchingHands(rangeGroup).length > 0;
    });

    return matchingGroups.length > 0;
  }

  isSuit(suit) {
    return this.suit === suit;
  }

  indexIn(rangeGroups) {
    let foundIndex = -1;
    rangeGroups.forEach((rangeGroup, idx) => {
      if (this.isInRange([rangeGroup])) foundIndex = idx;
    });

    return foundIndex;
  }
}
