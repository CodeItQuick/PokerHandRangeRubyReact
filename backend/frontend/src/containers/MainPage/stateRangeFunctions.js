import initialState from "./reducer";
import { ranges } from "./sampleData";
import CardHandSuit from "./Board/CardHandSuit";

export const mapNewHandRange = (
  oldHandRange,
  draftModeStreet,
  draftModeStreetAction,
  actionDataCards
) => {
  return oldHandRange.map(range => {
    let rangeObj = range.getRangesObject();
    if (
      rangeObj.hands.filter(hand => actionDataCards.indexOf(hand) >= 0).length >
        0 &&
      rangeObj.Street === draftModeStreet &&
      rangeObj.BetType === draftModeStreetAction
    )
      return {
        Street: rangeObj.Street,
        BetType: rangeObj.BetType,
        hands: rangeObj.hands.filter(
          hand => !(actionDataCards.indexOf(hand) >= 0)
        )
      };
    else if (
      rangeObj.Street === draftModeStreet &&
      rangeObj.BetType === draftModeStreetAction
    )
      return {
        Street: rangeObj.Street,
        BetType: rangeObj.BetType,
        hands: [...rangeObj.hands, ...actionDataCards]
      };
    else {
      return rangeObj;
    }
  });
};
