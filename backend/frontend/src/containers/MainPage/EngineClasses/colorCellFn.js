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
    return colorStandardHands({ matchingHandKeys, cards });

  const suitedCombinations = ["ss", "dd", "hh", "cc"];
  const offsuitCombinations = [
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
  const pairCombinations = ["sd", "sh", "sc", "cs", "cd", "dh"];

  const filterMatchingHands = (handKeys, equalHandFn) =>
    handKeys.filter((handKey) => equalHandFn(handKey, startingHand));
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
    colorMatchingHands(suitedCombinations, suitedHandKeys, cards) ||
    colorMatchingHands(offsuitCombinations, offsuitHandKeys, cards) ||
    colorMatchingHands(pairCombinations, pairedHandKeys, cards) || ["#DDD"]
  );
};

const colorStandardHands = ({ matchingHandKeys, cards }) => {
  return (
    matchingHandKeys.map((handKey) => cards[handKey].colorCards) || ["#DDD"]
  );
};

const colorMatchingHands = (suitCombinations, matchingHandKeys, cards) => {
  if (matchingHandKeys.length) {
    const filledHandKeys = fillHandKeySlots(suitCombinations, matchingHandKeys); //?
    return buildColorArray(filledHandKeys, cards);
  }
  return false;
};

const buildColorArray = (handKeySlots, cards) =>
  handKeySlots.map((handKey) => cards[handKey]?.colorCards || "#DDD");

const fillHandKeySlots = (suitCombinations, matchingKeys) =>
  suitCombinations.map((_, idx) => matchingKeys[idx] || "");
