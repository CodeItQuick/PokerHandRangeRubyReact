import StartingHand from "./StartingHand";

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

export class StartingHandBuilder {
  build(cardOneInput, cardTwoInput, suitInput = "") {
    let suit, startingHand;
    suit = this.determineSuit(suitInput, cardOneInput, cardTwoInput);

    // cardOne = Ac cardTwo = Td
    if (cardOneInput.length === 2) {
      startingHand = this.buildFromRankSuitPairs(cardOneInput, cardTwoInput);
    }
    // cardOne = K, cardTwo = 9, suit= cd
    if (suitInput.length === 2 && cardOneInput.length === 1) {
      startingHand = this.buildWithSpecificSuits(
        cardOneInput,
        cardTwoInput,
        suitInput
      );
    }
    // cardOne = T, cradTwo = J
    if (suitInput.length === 0 && cardOneInput.length === 1) {
      startingHand = this.buildWithInferredSuit(cardOneInput, cardTwoInput);
    }

    // cardOne = T, cardTwo = J, suit = s
    if ((suitInput.length === 1) & (cardOneInput.length === 1)) {
      const cardOrder = this._normalizeRankOrder(cardOneInput, cardTwoInput);
      startingHand = new StartingHand(cardOrder[0], cardOrder[1], suitInput);
    }

    return startingHand;
  }

  determineSuit(suitInput, cardOneInput, cardTwoInput) {
    let suit;
    if (suitInput.length === 1) suit = suitInput;
    if (suitInput.length < 1)
      suit = this._inferSuitedness(cardOneInput, cardTwoInput);
    if (suitInput === 0) suit = "";
    return suit;
  }

  buildWithInferredSuit(cardOneInput, cardTwoInput) {
    const cardOne = this._normalizeRankOrder(cardOneInput, cardTwoInput)[0];
    const cardTwo = this._normalizeRankOrder(cardOneInput, cardTwoInput)[1];
    const suit = this._inferSuitedness(cardOneInput, cardTwoInput);
    return new StartingHand(cardOne, cardTwo, suit);
  }

  buildWithSpecificSuits(cardOneInput, cardTwoInput, suitInput) {
    const firstCardSuit = suitInput.length > 1 ? suitInput.substring(0, 1) : "";
    const secondCardSuit =
      suitInput.length > 1 ? suitInput.substring(1, 2) : "";
    const suit = firstCardSuit + secondCardSuit;
    const cardOne = cardOneInput;
    const cardTwo = cardTwoInput;
    return new StartingHand(cardOne, cardTwo, suit);
  }
  buildFromRankSuitPairs(cardOne, cardTwo) {
    const combinedSuits = cardOne.substr(1, 1) + cardTwo.substr(1, 1);
    const cardOneRank = cardOne.substr(0, 1);
    const cardTwoRank = cardTwo.substr(0, 1);
    return new StartingHand(cardOneRank, cardTwoRank, combinedSuits);
  }
  //TODO: Make public method of StartingHand
  _normalizeRankOrder(cardOne, cardTwo) {
    let higherRank = "",
      lowerRank = "";
    if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
      higherRank = cardOne;
      lowerRank = cardTwo;
    } else if (cardOne === cardTwo) {
      higherRank = cardOne;
      lowerRank = cardTwo;
    } else {
      higherRank = cardTwo;
      lowerRank = cardOne;
    }
    return [higherRank, lowerRank];
  }
  //TODO: Make public method of StartingHand
  _inferSuitedness(cardOne, cardTwo) {
    let suitedness = "";
    if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
      suitedness = "s";
    } else if (orderedCard.indexOf(cardOne) === orderedCard.indexOf(cardTwo)) {
      suitedness = "";
    } else {
      suitedness = "o";
    }
    return suitedness;
  }
}
