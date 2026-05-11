import StartingHand from "./StartingHand";

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

export class StartingHandBuilder {
  build(firstCardInput, secondCardInput, suitInput = "") {
    let suit, startingHand;
    suit = this.determineSuit(suitInput, firstCardInput, secondCardInput);

    // cardOne = Ac cardTwo = Td
    if (firstCardInput.length === 2) {
      startingHand = this.buildFromRankSuitPairs(
        firstCardInput,
        secondCardInput
      );
    }
    // cardOne = K, cardTwo = 9, suit= cd
    if (suitInput.length === 2 && firstCardInput.length === 1) {
      startingHand = this.buildWithSpecificSuits(
        firstCardInput,
        secondCardInput,
        suitInput
      );
    }
    // cardOne = T, cradTwo = J
    if (suitInput.length === 0 && firstCardInput.length === 1) {
      startingHand = this.buildWithInferredSuit(
        firstCardInput,
        secondCardInput
      );
    }

    // cardOne = T, cardTwo = J, suit = s
    if ((suitInput.length === 1) & (firstCardInput.length === 1)) {
      const normalizedRanks = this._normalizeRankOrder(
        firstCardInput,
        secondCardInput
      );
      startingHand = new StartingHand(
        normalizedRanks[0],
        normalizedRanks[1],
        suitInput
      );
    }

    return startingHand;
  }

  determineSuit(suitInput, firstCardInput, secondCardInput) {
    let suit;
    if (suitInput.length === 1) suit = suitInput;
    if (suitInput.length < 1)
      suit = this._inferSuitedness(firstCardInput, secondCardInput);
    if (suitInput === 0) suit = "";
    return suit;
  }

  buildWithInferredSuit(firstCardInput, secondCardInput) {
    const firstRank = this._normalizeRankOrder(
      firstCardInput,
      secondCardInput
    )[0];
    const secondRank = this._normalizeRankOrder(
      firstCardInput,
      secondCardInput
    )[1];
    const suit = this._inferSuitedness(firstCardInput, secondCardInput);
    return new StartingHand(firstRank, secondRank, suit);
  }

  buildWithSpecificSuits(firstCardInput, secondCardInput, suitInput) {
    const firstCardSuit = suitInput.length > 1 ? suitInput.substring(0, 1) : "";
    const secondCardSuit =
      suitInput.length > 1 ? suitInput.substring(1, 2) : "";
    const suit = firstCardSuit + secondCardSuit;
    const firstRank = firstCardInput;
    const secondRank = secondCardInput;
    return new StartingHand(firstRank, secondRank, suit);
  }
  buildFromRankSuitPairs(firstRankSuitPair, secondRankSuitPair) {
    const combinedSuits =
      firstRankSuitPair.substr(1, 1) + secondRankSuitPair.substr(1, 1);
    const firstRank = firstRankSuitPair.substr(0, 1);
    const secondRank = secondRankSuitPair.substr(0, 1);
    return new StartingHand(firstRank, secondRank, combinedSuits);
  }
  //TODO: Make public method of StartingHand
  _normalizeRankOrder(firstRank, secondRank) {
    let higherRank = "",
      lowerRank = "";
    if (cardRankOrder.indexOf(firstRank) < cardRankOrder.indexOf(secondRank)) {
      higherRank = firstRank;
      lowerRank = secondRank;
    } else if (firstRank === secondRank) {
      higherRank = firstRank;
      lowerRank = secondRank;
    } else {
      higherRank = secondRank;
      lowerRank = firstRank;
    }
    return [higherRank, lowerRank];
  }
  //TODO: Make public method of StartingHand
  _inferSuitedness(firstRank, secondRank) {
    let suitedness = "";
    if (cardRankOrder.indexOf(firstRank) < cardRankOrder.indexOf(secondRank)) {
      suitedness = "s";
    } else if (
      cardRankOrder.indexOf(firstRank) === cardRankOrder.indexOf(secondRank)
    ) {
      suitedness = "";
    } else {
      suitedness = "o";
    }
    return suitedness;
  }
}
