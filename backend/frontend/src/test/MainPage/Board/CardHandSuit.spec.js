import { CardHandSuitBuilder } from "./../../../containers/MainPage/EngineClasses/CardHandSuitBuilder";
import { expect } from "chai";

describe("CardHandSuitBuilder Class", () => {
  test("can be constructed when two cards, and no sutest entered", () => {
    //Given
    const cardOne = "A";
    const cardTwo = "K";

    //When
    const cardHandSuit = new CardHandSuitBuilder().build(cardOne, cardTwo);

    const result = cardHandSuit.getHand();

    //Then
    expect(result).to.equal("AKs");
  });

  test("can be constructed when two cards, and a sutest entered", () => {
    const cardOne = "A";
    const cardTwo = "K";
    const sutest = "s";

    const cardHandSuit = new CardHandSuitBuilder().build(
      cardOne,
      cardTwo,
      sutest
    );

    const result = cardHandSuit.getHand();

    expect(result).to.equal("AKs");
  });

  test("can be constructed when two cards (reverse order), and a sutest entered returns a CardHandSuitBuilder Object in normalized order", () => {
    const cardOne = "K";
    const cardTwo = "A";
    const sutest = "o";

    const cardSutestHand = new CardHandSuitBuilder().build(
      cardOne,
      cardTwo,
      sutest
    );

    const result = cardSutestHand.getHand();

    expect(result).to.equal("AKo");
  });
  test("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and sutested", () => {
    //Given
    const cardOne = "Q";
    const cardTwo = "J";
    const sutest = "s";

    //When
    const resultBuilder = new CardHandSuitBuilder();
    const resultCardHandSuitBuilder = resultBuilder.build(
      cardOne,
      cardTwo,
      sutest
    );
    const result = resultCardHandSuitBuilder.getHand();

    //Then
    expect(result).to.equal("QJs");
  });

  test("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and sutested", () => {
    //Given
    const cardOne = "A";
    const cardTwo = "T";

    //When
    const resultBuilder = new CardHandSuitBuilder();
    const resultCardHandSuitBuilder = resultBuilder.build(cardOne, cardTwo);
    const result = resultCardHandSuitBuilder.getHand();

    //Then
    expect(result).to.equal("ATs");
  });
  test("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and sutest of cs", () => {
    //Given
    const cardOne = "A";
    const cardTwo = "T";
    const sutest = "cs";

    //When
    const resultBuilder = new CardHandSuitBuilder();
    const resultCardHandSuitBuilder = resultBuilder.build(
      cardOne,
      cardTwo,
      sutest
    );
    const result = resultCardHandSuitBuilder.getHand();

    //Then
    expect(result).to.equal("AcTs");
  });
  test("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Th, cardTwo of 8s, and sutest of cs", () => {
    //Given
    const cardOne = "Th";
    const cardTwo = "8s";
    const sutest = "";

    //When
    const resultBuilder = new CardHandSuitBuilder();
    const resultCardHandSuitBuilder = resultBuilder.build(
      cardOne,
      cardTwo,
      sutest
    );
    const result = resultCardHandSuitBuilder.getHand();

    //Then
    expect(result).to.equal("Th8s");
  });
});
