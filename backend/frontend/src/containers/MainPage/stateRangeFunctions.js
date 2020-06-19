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

export const saveOldRangeRepo = (
  rangeRepo,
  rangeSelectionArray,
  draftRanges
) => {
  let defaultRanges = JSON.parse(JSON.stringify(draftRanges));
  let rangeRepos = rangeRepo.map(repositoryRange => {
    if (
      repositoryRange.FolderName == rangeSelectionArray.folderID &&
      repositoryRange.FolderGroupName ==
        rangeSelectionArray.folderSubgroupName &&
      repositoryRange.Position == rangeSelectionArray.folderSubgroupRangeName
    )
      return {
        FolderName: rangeSelectionArray.folderID,
        FolderGroupName: rangeSelectionArray.folderSubgroupName,
        Position: rangeSelectionArray.folderSubgroupRangeName,
        ranges: defaultRanges || ranges
      };
    else
      return {
        FolderName: repositoryRange.FolderName,
        FolderGroupName: repositoryRange.FolderGroupName,
        Position: repositoryRange.Position,
        ranges: repositoryRange.ranges || ranges
      };
  });
  return rangeRepos;
};
export const loadNewRange = (rangeRepo, actionData) => {
  let filteredForPosition = rangeRepo?.filter(
    ({ FolderName, FolderGroupName, Position }) =>
      actionData.folderID == FolderName &&
      actionData.folderSubgroupName == FolderGroupName &&
      actionData.folderSubgroupRangeName == Position
  )[0]?.ranges;

  return filteredForPosition;
};
