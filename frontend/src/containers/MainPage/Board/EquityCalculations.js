import { CardGroup, OddsCalculator } from "poker-odds-calculator";
import prange from "prange";

export const doesShareTwoCardsBetweenTwoHands = (handOne, handTwo) => {
  return false;
};

//TODO: Inject OddsCalculator into this function so I can test it easier
export const calculateEquity = (
  handRange,
  inputBoard,
  rangeTwo,
  Calculator = OddsCalculator
) => {
  if (handRange.length == 0 || rangeTwo.length == 0 || inputBoard.length < 3)
    return 0;

  let handRangeExpanded = handRange.map(handR => expandSuitsPair(handR))[0];
  let rangeTwoExpanded = rangeTwo.map(range => expandSuitsPair(range))[0];
  let equities = handRangeExpanded.reduce(
    (acc, handR) => [
      ...acc,
      ...rangeTwoExpanded
        .filter(
          rangeTwo =>
            rangeTwo.substr(0, 2) != handR.substr(0, 2) &&
            rangeTwo.substr(0, 2) != handR.substr(2, 2) &&
            rangeTwo.substr(2, 2) != handR.substr(0, 2) &&
            rangeTwo.substr(2, 2) != handR.substr(2, 2)
        )
        .filter(
          rangeTwo =>
            !(inputBoard.indexOf(rangeTwo.substr(0, 2)) >= 0) &&
            !(inputBoard.indexOf(handR.substr(0, 2)) >= 0) &&
            !(inputBoard.indexOf(rangeTwo.substr(2, 2)) >= 0) &&
            !(inputBoard.indexOf(handR.substr(2, 2)) >= 0)
        )
        .map(range =>
          calculateOverallEquity(handR, inputBoard, range, Calculator)
        )
    ],
    []
  );
  let equity = equities.reduce((acc, curr) => {
    if (curr != -1) return acc + curr;
    else return acc;
  }, 0); //?
  equity = equity / equities.length;
  return equity;
};

const calculateOverallEquity = (
  handRange,
  inputBoard,
  rangeTwo,
  Calculator = OddsCalculator
) => {
  let handOne = handRange;
  let board = CardGroup.fromString(inputBoard);

  let player1Cards = CardGroup.fromString(handOne);
  let player2Cards = CardGroup.fromString(rangeTwo);

  let result = Calculator.calculate([player1Cards, player2Cards], board);

  let hand0Wins = result.equities[0].bestHandCount; //?
  let totalIterations = result.equities[0].possibleHandsCount; //?
  let tieCount = result.equities[0].tieHandCount; //?

  return (hand0Wins + tieCount) / (totalIterations + tieCount * 2);
};

const expandSuitsPair = handRange => {
  let expandedHand = [];
  if (handRange[0] == handRange[1]) {
    const suits = ["c", "s", "d", "h"];
    expandedHand = suits.reduce((acc, cardOneSuit, cardOneIndex) => {
      return acc.concat(
        suits.slice(cardOneIndex + 1, 4).map((cardTwoSuit, cardTwoIndex) => {
          return handRange[0] + cardOneSuit + handRange[1] + cardTwoSuit;
        })
      );
    }, []);
    return expandedHand.slice(0, 6);
  }

  if (handRange[2] == "o") {
    const suits = ["c", "s", "d", "h"];
    expandedHand = suits.reduce((acc, cardOneSuit, cardOneIndex) => {
      return acc.concat(
        suits.slice(cardOneIndex + 1, 4).map(cardTwoSuit => {
          return handRange[0] + cardOneSuit + handRange[1] + cardTwoSuit;
        }),
        suits.slice(cardOneIndex + 1, 4).map(cardTwoSuit => {
          return handRange[0] + cardTwoSuit + handRange[1] + cardOneSuit;
        })
      );
    }, []);
    return expandedHand;
  }

  if (handRange[2] == "s") {
    const suits = ["c", "s", "d", "h"];
    expandedHand = suits.reduce((acc, cardOneSuit) => {
      return acc.concat(
        handRange[0] + cardOneSuit + handRange[1] + cardOneSuit
      );
    }, []);
    return expandedHand;
  }
};
