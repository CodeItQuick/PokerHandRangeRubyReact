import { CardHandSuitBuilder } from "./../../../containers/MainPage/EngineClasses/CardHandSuitBuilder";
import { expect } from "chai";

describe("CardHandSuitBuilder Class", () => {
  it("can be constructed when two cards, and no suit entered", () => {
    //Given
    const cardOne = "A";
    const cardTwo = "K";

    //When
    const cardHandSuit = new CardHandSuitBuilder().build(cardOne, cardTwo);

    const result = cardHandSuit.getHand();

    //Then
    expect(result).to.equal("AKs");
  });

  it("can be constructed when two cards, and a suit entered", () => {
    const cardOne = "A";
    const cardTwo = "K";
    const suit = "s";

    const cardHandSuit = new CardHandSuitBuilder().build(
      cardOne,
      cardTwo,
      suit
    );

    const result = cardHandSuit.getHand();

    expect(result).to.equal("AKs");
  });

  it("can be constructed when two cards (reverse order), and a suit entered returns a CardHandSuitBuilder Object in normalized order", () => {
    const cardOne = "K";
    const cardTwo = "A";
    const suit = "o";

    const cardsuitHand = new CardHandSuitBuilder().build(
      cardOne,
      cardTwo,
      suit
    );

    const result = cardsuitHand.getHand();

    expect(result).to.equal("AKo");
  });
  it("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and suited", () => {
    //Given
    const cardOne = "Q";
    const cardTwo = "J";
    const suit = "s";

    //When
    const resultBuilder = new CardHandSuitBuilder();
    const resultCardHandSuitBuilder = resultBuilder.build(
      cardOne,
      cardTwo,
      suit
    );
    const result = resultCardHandSuitBuilder.getHand();

    //Then
    expect(result).to.equal("QJs");
  });

  it("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and suited", () => {
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
  it("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Q, cardTwo of J, and suit of cs", () => {
    //Given
    const cardOne = "A";
    const cardTwo = "T";
    const suit = "cs";

    //When
    const resultBuilder = new CardHandSuitBuilder();
    const resultCardHandSuitBuilder = resultBuilder.build(
      cardOne,
      cardTwo,
      suit
    );
    const result = resultCardHandSuitBuilder.getHand();

    //Then
    expect(result).to.equal("AcTs");
  });
  it("CardHandSuitBuilder can build a CardHandSuitBuilder given a cardOne of Th, cardTwo of 8s, and suit of cs", () => {
    //Given
    const cardOne = "Th";
    const cardTwo = "8s";
    const suit = "";

    //When
    const resultBuilder = new CardHandSuitBuilder();
    const resultCardHandSuitBuilder = resultBuilder.build(
      cardOne,
      cardTwo,
      suit
    );
    const result = resultCardHandSuitBuilder.getHand();

    //Then
    expect(result).to.equal("Th8s");
  });
});
