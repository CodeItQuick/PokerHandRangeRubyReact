import { initialState } from "../reducer";
import { StartingHandBuilder } from "./StartingHandBuilder";
import RangeObject from "./RangeObject";

export class RangeObjectCollection {
  constructor(rangeData) {
    const rangeData_ = rangeData || initialState.ranges;
    this.rangeObjects = this._toRangeObjects(rangeData_);
  }
  _toRangeObjects(rangeData) {
    return rangeData.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(Street, BetType, this._toStartingHands(hands))
    );
  }
  _toStartingHands(hands) {
    return hands.map((hand) =>
      new StartingHandBuilder().build(
        hand.length <= 3 ? hand.substr(0, 1) : hand.substr(0, 2),
        hand.length <= 3 ? hand.substr(1, 1) : hand.substr(2, 2),
        hand.length <= 3 ? hand.substr(2, hand.length - 1) : ""
      )
    );
  }

  getPreviousStreetRanges({ Street = "Flop", isIP = true }) {
    return this.rangeObjects.filter(({ street, streetAction }) =>
      this.isFromPreviousStreet({ isIP, street, streetAction, Street })
    );
  }
  isFromPreviousStreet({ isIP, street, streetAction, Street }) {
    const possiblePreviousStreet = ["Preflop", "Flop", "Turn", "River"];
    const previousStreetIdx = possiblePreviousStreet.reduce(
      (acc, currStreet, idx) => (currStreet === Street ? acc + idx - 1 : acc),
      0
    );
    const allowedActions = isIP
      ? ["Valuebet", "Bluff", "SmallValuebet", "SmallBluff"]
      : ["CheckCall"];
    allowedActions.push(
      "Raise4BetCall",
      "Raise4BetFold",
      "RaiseCall",
      "RaiseFold"
    );
    return (
      street === possiblePreviousStreet[previousStreetIdx] &&
      allowedActions.includes(streetAction)
    );
  }
  getRangesForStreet({ Street = "Preflop", useTwoFlopSizes = false }) {
    const excludedActions = useTwoFlopSizes
      ? []
      : ["SmallValuebet", "SmallBluff"];
    return this.rangeObjects.filter(
      ({ street, streetAction }) =>
        Street == street && !excludedActions.includes(streetAction)
    );
  }
  getAllRanges() {
    return this.rangeObjects;
  }

  countHandCombo() {
    //stuff
  }
}
