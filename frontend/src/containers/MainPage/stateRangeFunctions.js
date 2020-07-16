import initialState from "./reducer";
import { ranges } from "./sampleData";

export const mapNewHandRange = (
  oldHandRange,
  draftModeStreet,
  draftModeStreetAction,
  actionDataCards
) =>
  oldHandRange.map((rangeObj, idx) => {
    let hasStreetAndCurrentBetType =
      rangeObj.Street == draftModeStreet &&
      rangeObj.BetType == draftModeStreetAction;
    let hasHandInRange = rangeObj.hands.indexOf(actionDataCards) >= 0;
    if (hasStreetAndCurrentBetType && hasHandInRange) {
      let handsWithRemovedCards = JSON.parse(JSON.stringify(rangeObj.hands));
      let indexHandInRange = handsWithRemovedCards.indexOf(actionDataCards);
      let numberHandsToRemove = 1;
      handsWithRemovedCards.splice(indexHandInRange, numberHandsToRemove);
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
        hands: [...rangeObj.hands, actionDataCards]
      };

    return { ...rangeObj, hands: rangeObj.hands };
  });
