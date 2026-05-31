const cardRankOrder = [
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
  constructor(firstRank, secondRank, suit = "") {
    this.firstRank = firstRank;
    this.secondRank = secondRank;
    this.suit = suit;
    this.equity = "n/a"; //FIXME: REMOVE
  }

  getHand() {
    if (this.suit.length > 1)
      return (
        this.firstRank +
        this.suit.substr(0, 1) +
        this.secondRank +
        this.suit.substr(1, 1)
      );
    else return this.firstRank + this.secondRank + this.suit;
  }

  getHandArray() {
    return [this.firstRank, this.secondRank, this.suit];
  }

  isInRange(rangeGroups) {
    let matchingGroups = [];

    if (rangeGroups === [] || rangeGroups === [[], [], [], []]) return false;

    matchingGroups = rangeGroups.filter((rangeGroup) => {
      let findMatchingHands = (group) =>
        group.filter(
          (hand) =>
            hand.getHand() == this.firstRank + this.secondRank + this.suit
        );
      return findMatchingHands(rangeGroup).length > 0;
    });

    return matchingGroups.length > 0;
  }

  isSuit(suit) {
    return this.suit === suit;
  }

  rangeGroupIndex(rangeGroups) {
    let foundIndex = -1;
    rangeGroups.forEach((rangeGroup, index) => {
      if (this.isInRange([rangeGroup])) foundIndex = index;
    });

    return foundIndex;
  }
}
