import {
  equalSuitedHands,
  equalOffsuitedHands,
  equalPairsSpecificCombos,
  findInArray,
} from "./findInArray";

export const colorCell = (cards, cardHand) => {
  if (!Object.keys(cards).length) return ["#DDD"];

  const selectedHandsArr = findInArray(cards, cardHand);

  if (selectedHandsArr[0]?.length <= 3)
    return colorLengthThreeHand({ selectedHandsArr, cards });

  const fourElementArray = ["ss", "dd", "hh", "cc"];
  const sixteenElementArray = [
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
  const sixElementArray = ["sd", "sh", "sc", "cs", "cd", "dh"];

  const isCheckHandArr = (selectedHandsArr, equalHandFn) =>
    selectedHandsArr.filter((card) => equalHandFn(card, cardHand));
  const checkHandSuited = isCheckHandArr(selectedHandsArr, equalSuitedHands);
  const checkHandOffsuited = isCheckHandArr(
    selectedHandsArr,
    equalOffsuitedHands
  );
  const checkHandPaired = isCheckHandArr(
    selectedHandsArr,
    equalPairsSpecificCombos
  );

  return (
    checkAndReturnColorHandArray(fourElementArray, checkHandSuited, cards) ||
    checkAndReturnColorHandArray(
      sixteenElementArray,
      checkHandOffsuited,
      cards
    ) ||
    checkAndReturnColorHandArray(sixElementArray, checkHandPaired, cards) || [
      "#DDD",
    ]
  );
};

const colorLengthThreeHand = ({ selectedHandsArr, cards }) => {
  return selectedHandsArr.map((copy) => cards[copy].colorCards) || ["#DDD"];
};

const checkAndReturnColorHandArray = (elementArray, isCheckHandArr, cards) => {
  if (isCheckHandArr.length) {
    const elementArraySpecific = specificHandArray(
      elementArray,
      isCheckHandArr
    ); //?
    return colorHandArray(elementArraySpecific, cards);
  }
  return false;
};

const colorHandArray = (elementArray, cards) =>
  elementArray.map((copy) => cards[copy]?.colorCards || "#DDD");

const specificHandArray = (elementArray, isCheck) =>
  elementArray.map((_, idx) => isCheck[idx] || "");
