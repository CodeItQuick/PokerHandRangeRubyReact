import { initialState } from "../reducer";
import { CardHandSuitBuilder } from "./CardHandSuitBuilder";
import RangeObject from "./RangeObject";

export class RangeObjectCollection {
  constructor(rangeArray) {
    const newRange = rangeArray || initialState.ranges;
    this.rangeObjectCollection = this._copyRangeObject(newRange);
  }
  _copyRangeObject(range) {
    return range.map(
      ({ Street, BetType, hands }) =>
        new RangeObject(Street, BetType, this._copyHands(hands))
    );
  }
  _copyHands(hands) {
    return hands.map((hand) =>
      new CardHandSuitBuilder().build(
        hand.length <= 3 ? hand.substr(0, 1) : hand.substr(0, 2),
        hand.length <= 3 ? hand.substr(1, 1) : hand.substr(2, 2),
        hand.length <= 3 ? hand.substr(2, hand.length - 1) : ""
      )
    );
  }

  displayPreviousRange({ Street = "Flop", isIP = true }) {
    return this.rangeObjectCollection.filter(({ street, streetAction }) =>
      this.filterRange({ isIP, street, streetAction, Street })
    );
  }
  filterRange({ isIP, street, streetAction, Street }) {
    const possiblePreviousStreet = ["Preflop", "Flop", "Turn", "River"];
    const previousStreetIdx = possiblePreviousStreet.reduce(
      (acc, currStreet, idx) => (currStreet === Street ? acc + idx - 1 : acc),
      0
    );
    const allowedActionsWhitelist = isIP
      ? ["Valuebet", "Bluff", "SmallValuebet", "SmallBluff"]
      : ["CheckCall"];
    allowedActionsWhitelist.push(
      "Raise4BetCall",
      "Raise4BetFold",
      "RaiseCall",
      "RaiseFold"
    );
    return (
      street === possiblePreviousStreet[previousStreetIdx] &&
      allowedActionsWhitelist.includes(streetAction)
    );
  }
  displayRangeByStreet({ Street = "Preflop", useTwoFlopSizes = false }) {
    const blackList = useTwoFlopSizes ? [] : ["SmallValuebet", "SmallBluff"];
    return this.rangeObjectCollection.filter(
      ({ street, streetAction }) =>
        Street == street && !blackList.includes(streetAction)
    );
  }
  displayRange() {
    return this.rangeObjectCollection;
  }

  countHandCombo() {
    //stuff
  }
}
