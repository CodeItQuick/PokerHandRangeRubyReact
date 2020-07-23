import initialState from "./reducer";
import { ranges } from "./sampleData";
import CardHandSuit from "./Board/CardHandSuit";

export const mapNewHandRange = (
  oldHandRange,
  draftModeStreet,
  draftModeStreetAction,
  actionDataCards
) => {
  const insertedHand = new CardHandSuit(
    actionDataCards.substr(0, 1),
    actionDataCards.substr(1, 1),
    actionDataCards.substr(2, 1) || ""
  );

  return oldHandRange.map((rangeObj, idx) => {
    let hasStreetAndCurrentBetType =
      rangeObj.Street == draftModeStreet &&
      rangeObj.BetType == draftModeStreetAction;
    let hasHandInRange = insertedHand.isInRange(rangeObj.hands);
    if (hasStreetAndCurrentBetType && hasHandInRange) {
      let handsWithRemovedCards = rangeObj.hands;
      let indexHandInRange = insertedHand.indexsOf(handsWithRemovedCards);
      handsWithRemovedCards = rangeObj.hands.filter(
        (cardHandSuit, idx) => idx != indexHandInRange
      );
      return {
        Street: rangeObj.Street,
        BetType: rangeObj.BetType,
        hands: handsWithRemovedCards
      };
    }
    if (hasStreetAndCurrentBetType && !hasHandInRange)
      return {
        Street: rangeObj.Street,
        BetType: rangeObj.BetType,
        hands: [...rangeObj.hands, insertedHand]
      };

    return rangeObj;
  });
};
