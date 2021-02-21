import _ from "lodash";
import { CardHandSuitBuilder } from "./CardHandSuitBuilder";

export const countHandCombo = (wholeRange, chosenStreet, board) => {
  let wholeRangeNum = wholeRange.map((rangeObject) =>
    rangeObject.allHandsOneArray().reduce((acc, hand) => {
      return acc + comboCounter(hand.getHand(), chosenStreet, board);
    }, 0)
  );

  return wholeRangeNum;
};

const comboCounter = (hands, chosenStreet, board) => {
  if (!hands) return 0;

  if (hands.length > 3) {
    let transformedCardHand = [hands.substr(0, 2), hands.substr(2, 2)];
    if (
      board.includes(transformedCardHand[0]) ||
      board.includes(transformedCardHand[1])
    )
      return 0;
    return 1;
  }
  let hand;

  hand = new CardHandSuitBuilder().build(
    hands.substr(0, 1),
    hands.substr(1, 1),
    hands.substr(2, 1)
  );

  //Suited Combos

  if (hands.includes("s")) return suitedComboCounter(hand, board, "s");
  else if (hands.includes("o"))
    //Offsuit Combos
    return offsuitComboCounter(hand, board, "o");
  //Pair Combos
  else return pairComboCounter(hand, board);
};
const offsuitComboCounter = (hand, board) => {
  const numOccurances = _.countBy(_.split(board, ""));
  const subtractFirstCard = numOccurances[hand.getHand().charAt(0)] || 0;
  const subtractSecondCard = numOccurances[hand.getHand().charAt(1)] || 0;
  const numCards = (4 - subtractFirstCard) * (4 - subtractSecondCard);
  return numCards;
};

const suitedComboCounter = (hand, board) => {
  const numHandCardsInBoard = board.filter(
    (boardCard) =>
      boardCard.includes(hand.getHandArray()[0]) ||
      boardCard.includes(hand.getHandArray()[1])
  );
  if (numHandCardsInBoard.length === 2) {
    const suitOfMatchedCards = numHandCardsInBoard.map((boardCard) =>
      boardCard.substr(1, 1)
    );
    const suitsDoMatch = suitOfMatchedCards[0] === suitOfMatchedCards[1];
    return suitsDoMatch ? 3 : 2;
  }
  return 4 - numHandCardsInBoard.length;
};

const pairComboCounter = (hand, board) => {
  //Pair Combos
  let numOccurances = _.countBy(_.split(board, "", 12));
  let subtractFirstCard = numOccurances[hand.getHand().charAt(0)] || 0;
  let subtractSecondCard = numOccurances[hand.getHand().charAt(1)] || 0;

  let numCards = ((4 - subtractFirstCard) * (3 - subtractSecondCard)) / 2;
  return numCards;
};
