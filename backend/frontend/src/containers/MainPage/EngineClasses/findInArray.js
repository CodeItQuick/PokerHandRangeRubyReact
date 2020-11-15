export const findInArray = (cards, cardHand) =>
  Object.keys(cards).filter(
    (card) =>
      equalPairs(card, cardHand) ||
      cardHand.getHand().substr(0, 3) === card.substr(0, 3) ||
      equalSuitedHands(card, cardHand) ||
      equalOffsuitedHands(card, cardHand) ||
      equalPairsSpecificCombos(card, cardHand)
  );

const equalPairs = (card, cardHand) =>
  cardHand.getHand().substr(0, 2) === card.substr(0, 2) &&
  card.length === 2 &&
  cardHand.getHand().length === 2;

export const equalSuitedHands = (card, cardHand) =>
  card.length > 3 &&
  cardHand.getHand().substr(0, 1) === card.substr(0, 1) &&
  cardHand.getHand().substr(1, 1) === card.substr(2, 1) &&
  cardHand.getHand().substr(2, 1) === "s" &&
  card.substr(1, 1) === card.substr(3, 1);

export const equalOffsuitedHands = (card, cardHand) =>
  card.length > 3 &&
  cardHand.getHand().substr(0, 1) === card.substr(0, 1) &&
  cardHand.getHand().substr(1, 1) === card.substr(2, 1) &&
  cardHand.getHand().substr(2, 1) === "o" &&
  card.substr(1, 1) !== card.substr(3, 1);

export const equalPairsSpecificCombos = (card, cardHand) =>
  cardHand.getHand().length === 2 &&
  cardHand.getHand().substring(0, 1) === card.substring(0, 1) &&
  card.substring(0, 1) === card.substring(2, 3) &&
  card.substring(1, 2) !== card.substring(3, 4);
