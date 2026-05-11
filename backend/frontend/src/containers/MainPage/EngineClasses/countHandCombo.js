import _ from "lodash";
import { StartingHandBuilder } from "./StartingHandBuilder";

export const countRangeCombos = (rangeObjects, chosenStreet, board) => {
  let comboCounts = rangeObjects.map((rangeObject) =>
    rangeObject.allHandsOneArray().reduce((acc, hand) => {
      return acc + countCombosForHand(hand.getHand(), chosenStreet, board);
    }, 0)
  );

  return comboCounts;
};

const countCombosForHand = (handNotation, chosenStreet, board) => {
  if (!handNotation) return 0;

  if (handNotation.length > 3) {
    let holeCards = [handNotation.substr(0, 2), handNotation.substr(2, 2)];
    if (board.includes(holeCards[0]) || board.includes(holeCards[1])) return 0;
    return 1;
  }
  let hand;

  hand = new StartingHandBuilder().build(
    handNotation.substr(0, 1),
    handNotation.substr(1, 1),
    handNotation.substr(2, 1)
  );

  //Suited Combos

  if (handNotation.includes("s")) return suitedComboCounter(hand, board, "s");
  else if (handNotation.includes("o"))
    //Offsuit Combos
    return offsuitComboCounter(hand, board, "o");
  //Pair Combos
  else return pairComboCounter(hand, board);
};
const offsuitComboCounter = (hand, board) => {
  const boardCharFrequency = _.countBy(_.split(board, ""));
  const firstRankOccurrences =
    boardCharFrequency[hand.getHand().charAt(0)] || 0;
  const secondRankOccurrences =
    boardCharFrequency[hand.getHand().charAt(0)] || 0;
  const comboCount =
    (4 - firstRankOccurrences) * (4 - secondRankOccurrences) - 4;
  return comboCount;
};

const suitedComboCounter = (hand, board) => {
  const boardCardsMatchingHand = board.filter(
    (boardCard) =>
      boardCard.includes(hand.getHandArray()[0]) ||
      boardCard.includes(hand.getHandArray()[1])
  );
  if (boardCardsMatchingHand.length === 2) {
    const matchedCardSuits = boardCardsMatchingHand.map((boardCard) =>
      boardCard.substr(1, 1)
    );
    const suitsDoMatch = matchedCardSuits[0] === matchedCardSuits[1];
    return suitsDoMatch ? 3 : 2;
  }
  return 4 - boardCardsMatchingHand.length;
};

const pairComboCounter = (hand, board) => {
  //Pair Combos
  let boardCharFrequency = _.countBy(_.split(board, "", 12));
  let firstRankOccurrences = boardCharFrequency[hand.getHand().charAt(0)] || 0;
  let secondRankOccurrences = boardCharFrequency[hand.getHand().charAt(1)] || 0;

  let comboCount =
    ((4 - firstRankOccurrences) * (3 - secondRankOccurrences)) / 2;
  return comboCount;
};
