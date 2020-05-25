import initialState from "./reducer";

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
    if (hasStreetAndCurrentBetType) {
      let hasHandInRange = rangeObj.hands.indexOf(actionDataCards) >= 0;
      if (hasHandInRange) {
        let handsWithRemovedCards = rangeObj.hands;
        let indexHandInRange = handsWithRemovedCards.indexOf(actionDataCards);
        let numberHandsToRemove = 1;
        handsWithRemovedCards.splice(indexHandInRange, numberHandsToRemove);
        return {
          Street: rangeObj.Street,
          BetType: rangeObj.BetType,
          hands: handsWithRemovedCards
        };
      } else
        return {
          Street: rangeObj.Street,
          BetType: rangeObj.BetType,
          hands: [...rangeObj.hands, actionDataCards]
        };
    } else {
      return { ...rangeObj, hands: rangeObj.hands };
    }
  });

export const saveOldRangeRepo = (rangeRepo, rangeSelectionArray, draftRanges) =>
  rangeRepo.map(({ FolderName, FolderGroupName, Position, ranges }) => {
    let defaultRanges = undefined;
    console.log(ranges.length);
    if (ranges.length < 16)
      defaultRanges = JSON.parse(JSON.stringify(initialState.ranges));

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

export const loadNewRange = (rangeRepo, actionData) => {
  let filteredForPosition = rangeRepo.filter(
    ({ FolderName, FolderGroupName, Position, ranges }) =>
      FolderName == actionData.folderID &&
      FolderGroupName == actionData.folderSubgroupName &&
      Position == actionData.folderSubgroupRangeName
  );

  console.log(filteredForPosition);

  let returnRanges = initialState.ranges.map(({ Street, BetType, hands }) => {
    let filteredForPositionRange = filteredForPosition[0].ranges.filter(
      pos => pos.Street == Street && pos.BetType == BetType
    );

    console.log(filteredForPositionRange);
    return {
      Street,
      BetType,
      hands: filteredForPositionRange[0].hands || hands
    };
  });

  return returnRanges;
};
