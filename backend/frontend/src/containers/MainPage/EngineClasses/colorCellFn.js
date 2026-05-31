import {
  isSuitedHandMatch,
  isOffsuitHandMatch,
  isPairComboMatch,
  findMatchingHandKeys,
} from "./findMatchingHandKeys";

export const colorCell = (handColorMap, startingHand) => {
  if (!Object.keys(handColorMap).length) return ["#DDD"];

  const matchingHandKeys = findMatchingHandKeys(handColorMap, startingHand);

  if (matchingHandKeys[0]?.length <= 3)
    return colorAggregateHands({ matchingHandKeys, handColorMap });

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
    colorMatchingHands(suitedSuitCodes, suitedHandKeys, handColorMap) ||
    colorMatchingHands(offsuitSuitCodes, offsuitHandKeys, handColorMap) ||
    colorMatchingHands(pairSuitCodes, pairedHandKeys, handColorMap) || ["#DDD"]
  );
};

const colorAggregateHands = ({ matchingHandKeys, handColorMap }) => {
  return (
    matchingHandKeys.map((handKey) => handColorMap[handKey].colorCards) || [
      "#DDD",
    ]
  );
};

const colorMatchingHands = (suitCodes, matchingHandKeys, handColorMap) => {
  if (matchingHandKeys.length) {
    const filledHandKeys = fillHandKeySlots(suitCodes, matchingHandKeys); //?
    return buildColorArray(filledHandKeys, handColorMap);
  }
  return false;
};

const buildColorArray = (handKeySlots, handColorMap) =>
  handKeySlots.map((handKey) => handColorMap[handKey]?.colorCards || "#DDD");

const fillHandKeySlots = (suitCodes, matchingKeys) =>
  suitCodes.map((_, index) => matchingKeys[index] || "");
