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
      console.log(handsWithRemovedCards);
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

export const saveOldRangeRepo = (
  rangeRepo,
  rangeSelectionArray,
  draftRanges
) => {
  let defaultRanges = JSON.parse(JSON.stringify(ranges));
  rangeRepo.map(({ FolderName, FolderGroupName, Position, ranges }) => {
    if (
      FolderName == rangeSelectionArray.folderID &&
      FolderGroupName == rangeSelectionArray.folderSubgroupName &&
      Position == rangeSelectionArray.folderSubgroupRangeName
    )
      return {
        FolderName: rangeSelectionArray.folderID,
        FolderGroupName: rangeSelectionArray.folderSubgroupName,
        Position: rangeSelectionArray.folderSubgroupRangeName,
        ranges: defaultRanges || draftRanges
      };
    else
      return {
        FolderName,
        FolderGroupName,
        Position,
        ranges: defaultRanges || ranges
      };
  });
};
export const loadNewRange = (rangeRepo, actionData) => {
  let filteredForPosition = rangeRepo.find(
    ({ FolderName, FolderGroupName, Position }) =>
      FolderName == actionData.folderID &&
      FolderGroupName == actionData.folderSubgroupName &&
      Position == actionData.folderSubgroupRangeName
  );

  let returnRanges = ranges.map(({ Street, BetType, hands }) => {
    let filteredForPositionRange = filteredForPosition?.ranges.filter(
      pos => pos.Street == Street && pos.BetType == BetType
    );

    return {
      Street,
      BetType,
      hands: filteredForPositionRange?.hands || hands
    };
  });

  return returnRanges;
};
