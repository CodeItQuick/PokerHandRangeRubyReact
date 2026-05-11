import { initialState } from "../reducer";
import { StartingHandBuilder } from "./StartingHandBuilder";
import HandRange from "./HandRange";

export class HandRangeCollection {
  constructor(rangeData) {
    const resolvedRangeData = rangeData || initialState.ranges;
    this.handRanges = this._toHandRanges(resolvedRangeData);
  }
  _toHandRanges(rangeData) {
    return rangeData.map(
      ({ Street, BetType, hands }) =>
        new HandRange(Street, BetType, this._toStartingHands(hands))
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
    return this.handRanges.filter(({ street, streetAction }) =>
      this.isFromPreviousStreet({ isIP, street, streetAction, Street })
    );
  }
  isFromPreviousStreet({ isIP, street, streetAction, Street }) {
    const streetProgression = ["Preflop", "Flop", "Turn", "River"];
    const previousStreetIndex = streetProgression.reduce(
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
      street === streetProgression[previousStreetIndex] &&
      allowedActions.includes(streetAction)
    );
  }
  getRangesForStreet({ Street = "Preflop", useTwoFlopSizes = false }) {
    const excludedActions = useTwoFlopSizes
      ? []
      : ["SmallValuebet", "SmallBluff"];
    return this.handRanges.filter(
      ({ street, streetAction }) =>
        Street == street && !excludedActions.includes(streetAction)
    );
  }
  getAllRanges() {
    return this.handRanges;
  }

  countHandCombo() {
    //stuff
  }
}
