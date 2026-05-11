import {
  isSuitedHandMatch,
  isOffsuitHandMatch,
  isPairComboMatch,
  findMatchingHandKeys,
} from "./findMatchingHandKeys";

export const colorCell = (cards, startingHand) => {
  if (!Object.keys(cards).length) return ["#DDD"];

  const matchingHandKeys = findMatchingHandKeys(cards, startingHand);

  if (matchingHandKeys[0]?.length <= 3)
    return colorAggregateHands({ matchingHandKeys, cards });

  const suitedSuitCodes = ["ss", "dd", "hh", "cc"];
  const offsuitSuitCodes = [
    "sd",
    "sh",
    "sc",
    "cs",
    "cd",
    "ch",
    "hs",
    "hd",
    "hc",
    "ds",
    "dh",
    "dc",
  ];
  const pairSuitCodes = ["sd", "sh", "sc", "cs", "cd", "dh"];

  const filterMatchingHands = (handKeys, handMatchPredicate) =>
    handKeys.filter((handKey) => handMatchPredicate(handKey, startingHand));
  const suitedHandKeys = filterMatchingHands(
    matchingHandKeys,
    isSuitedHandMatch
  );
  const offsuitHandKeys = filterMatchingHands(
    matchingHandKeys,
    isOffsuitHandMatch
  );
  const pairedHandKeys = filterMatchingHands(
    matchingHandKeys,
    isPairComboMatch
  );

  return (
    colorMatchingHands(suitedSuitCodes, suitedHandKeys, cards) ||
    colorMatchingHands(offsuitSuitCodes, offsuitHandKeys, cards) ||
    colorMatchingHands(pairSuitCodes, pairedHandKeys, cards) || ["#DDD"]
  );
};

const colorAggregateHands = ({ matchingHandKeys, cards }) => {
  return (
    matchingHandKeys.map((handKey) => cards[handKey].colorCards) || ["#DDD"]
  );
};

const colorMatchingHands = (suitCodes, matchingHandKeys, cards) => {
  if (matchingHandKeys.length) {
    const filledHandKeys = fillHandKeySlots(suitCodes, matchingHandKeys); //?
    return buildColorArray(filledHandKeys, cards);
  }
  return false;
};

const buildColorArray = (handKeySlots, cards) =>
  handKeySlots.map((handKey) => cards[handKey]?.colorCards || "#DDD");

const fillHandKeySlots = (suitCodes, matchingKeys) =>
  suitCodes.map((_, index) => matchingKeys[index] || "");
