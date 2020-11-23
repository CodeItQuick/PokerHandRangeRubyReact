import {
  transformHandRange,
  assignDeadcards,
} from "./../../containers/MainPage/actions.js";
import { expect } from "chai";

suite("the transformHandRange function ", () => {
  test("should be able to transform the sample data", () => {
    const data = [
      {
        BetType: "Raise4BetCall",
        Board: "2d,2h,Jh,9h",
        HandName: "rangeRepoIP",
        PokerHands: "",
        PokerUser: "Evan",
        Street: "Preflop",
        created_at: "2020-10-06T02:25:40.721Z",
        id: 229,
        range_object_collection_id: 19,
        range_object_id: 229,
        updated_at: "2020-10-06T02:25:40.721Z",
      },
    ];

    expect(transformHandRange(data, "rangeRepoIP")).to.deep.equal([
      { BetType: "Raise4BetCall", Street: "Preflop", hands: [] },
    ]);
  });
  test("should be able to transform the sample data", () => {
    const data = [
      {
        BetType: "Raise4BetCall",
        Board: "2d,2h,Jh,9h",
        HandName: "rangeRepoIP",
        PokerHands: "AA",
        PokerUser: "Evan",
        Street: "Preflop",
        created_at: "2020-10-06T02:25:40.721Z",
        id: 229,
        range_object_collection_id: 19,
        range_object_id: 229,
        updated_at: "2020-10-06T02:25:40.721Z",
      },
    ];

    expect(transformHandRange(data, "rangeRepoIP")).to.deep.equal([
      { BetType: "Raise4BetCall", Street: "Preflop", hands: ["AA"] },
    ]);
  });

  test("should be able to assignDeadcards to an array of one deadcards when given a single deadcards", () => {
    const deadcards = "Ac";
    const result = assignDeadcards(deadcards);

    expect(result).to.deep.equal(["Ac"]);
  });

  test("should be able to assignDeadcards to an array of two deadcards when given two deadcards", () => {
    const deadcards = "TcAc";
    const result = assignDeadcards(deadcards);

    expect(result).to.deep.equal(["Tc", "Ac"]);
  });
  test("should be able to assignDeadcards to an array of three deadcards when given three deadcards", () => {
    const deadcards = "7cQs5d";
    const result = assignDeadcards(deadcards);

    expect(result).to.deep.equal(["7c", "Qs", "5d"]);
  });
  test("should be able to assignDeadcards to an array of four deadcards when given four deadcards", () => {
    const deadcards = "6c9c2d4c";
    const result = assignDeadcards(deadcards);

    expect(result).to.deep.equal(["6c", "9c", "2d", "4c"]);
  });
  test("should be able to assignDeadcards to an array of five deadcards when given five deadcards", () => {
    const deadcards = "AcAdAhAs5d";
    const result = assignDeadcards(deadcards);

    expect(result).to.deep.equal(["Ac", "Ad", "Ah", "As", "5d"]);
  });
});
