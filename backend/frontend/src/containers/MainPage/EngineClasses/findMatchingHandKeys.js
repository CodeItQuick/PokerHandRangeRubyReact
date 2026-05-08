export const findMatchingHandKeys = (cards, startingHand) =>
  Object.keys(cards).filter(
    (handKey) =>
      isPairMatch(handKey, startingHand) ||
      startingHand.getHand().substr(0, 3) === handKey.substr(0, 3) ||
      isSuitedHandMatch(handKey, startingHand) ||
      isOffsuitHandMatch(handKey, startingHand) ||
      isPairComboMatch(handKey, startingHand)
  );

const isPairMatch = (handKey, startingHand) =>
  startingHand.getHand().substr(0, 2) === handKey.substr(0, 2) &&
  handKey.length === 2 &&
  startingHand.getHand().length === 2;

export const isSuitedHandMatch = (handKey, startingHand) =>
  handKey.length > 3 &&
  startingHand.getHand().substr(0, 1) === handKey.substr(0, 1) &&
  startingHand.getHand().substr(1, 1) === handKey.substr(2, 1) &&
  startingHand.getHand().substr(2, 1) === "s" &&
  handKey.substr(1, 1) === handKey.substr(3, 1);

export const isOffsuitHandMatch = (handKey, startingHand) =>
  handKey.length > 3 &&
  startingHand.getHand().substr(0, 1) === handKey.substr(0, 1) &&
  startingHand.getHand().substr(1, 1) === handKey.substr(2, 1) &&
  startingHand.getHand().substr(2, 1) === "o" &&
  handKey.substr(1, 1) !== handKey.substr(3, 1);

export const isPairComboMatch = (handKey, startingHand) =>
  startingHand.getHand().length === 2 &&
  startingHand.getHand().substring(0, 1) === handKey.substring(0, 1) &&
  handKey.substring(0, 1) === handKey.substring(2, 3) &&
  handKey.substring(1, 2) !== handKey.substring(3, 4);
