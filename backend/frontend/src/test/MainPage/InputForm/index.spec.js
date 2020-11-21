import { initialState } from "./../../../containers/MainPage/reducer";
import { assignPositions } from "./../../../containers/MainPage/InputForm";
import RangeObject from "./../../../containers/MainPage/EngineClasses/RangeObject";
import { expect } from "chai";

// describe('InputStreet Container', () => {
test("The assignPositions function returns the correct values for the flop", () => {
  const rangeRepoIP = JSON.parse(JSON.stringify(initialState.rangeRepoIP))
    .filter(({ Street }) => Street == "Flop")
    .map(
      ({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
    );
  const rangeRepoIPDataObject = rangeRepoIP.map((rangeObject) =>
    rangeObject.getRangesObject()
  );

  const rangeRepoOOP = JSON.parse(JSON.stringify(initialState.rangeRepoOOP))
    .filter(({ Street }) => Street == "Flop")
    .map(
      ({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
    );

  let selectedRanges = JSON.parse(JSON.stringify(initialState.ranges))
    .filter(({ Street }) => Street == "Flop")
    .map(
      ({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
    );
  const selectedRangesDataObject = selectedRanges.map((rangeObject) =>
    rangeObject.getRangesObject()
  );

  const values = true;

  let [newRangeIP, newRangeOOP, newRanges] = assignPositions(
    rangeRepoIP,
    rangeRepoOOP,
    selectedRanges,
    values
  );

  expect(newRangeIP).to.deep.equal(rangeRepoIPDataObject);
  expect(newRangeOOP).to.deep.equal(selectedRangesDataObject);
  expect(newRanges).to.deep.equal(rangeRepoIPDataObject);
});
// });
