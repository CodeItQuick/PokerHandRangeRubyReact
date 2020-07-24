import React from "react";
import MainPage from "../../../src/containers/MainPage/index";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import Board, { calcEquities } from "../../../src/containers/MainPage/Board";
import { calculateEquity } from "../../../src/containers/MainPage/Board/EquityCalculations";
import { ranges } from "../../../src/containers/MainPage/sampleData.js";

import { CardGroup, OddsCalculator } from "poker-odds-calculator";
import prange from "prange";
import { generateCardGrid } from "../../../src/containers/MainPage/Board/StateUpdate.js";
import CardHandSuit from "../../../src/containers/MainPage/Board/CardHandSuit";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

const Calculator = {
  calculate: ([inputOne, inputTwo], inputThree) => {
    return {
      equities: [
        { bestHandCount: 100, possibleHandsCount: 200, tieHandCount: 0 },
        { bestHandCount: 100, possibleHandsCount: 200, tieHandCount: 0 },
      ],
    };
  },
};

function setup(onMouseOverHandler) {
  let enzymeWrapper = (
    <Provider store={store}>
      <Board {...onMouseOverHandler} />
    </Provider>
  );

  return enzymeWrapper;
}
describe("MainPage Container", () => {
  test("board renders with a white card-button object", () => {
    const enzymeWrapper = shallow(setup(jest.fn()));
    expect(enzymeWrapper.length).toBe(1);
  });

  test("board fires onClick handler as clicked", () => {
    const enzymeWrapper = mount(setup(jest.fn()));
    expect(enzymeWrapper.length).toBe(1);
  });

  test("board renders with a grey card-button object when rendered", () => {
    const enzymeWrapper = mount(setup(jest.fn()));
    const colorcardAA = enzymeWrapper.find("#colorButtonAA").get(0).props
      .coloring;
    expect(colorcardAA).toBe("555");
  });

  test("Board correctly calculates equity for hand against other hand that are both pairs", () => {
    const rangeOnePrange = prange("JJ");
    const rangeOne = [
      new CardHandSuit(
        rangeOnePrange[0].substring(0, 1),
        rangeOnePrange[0].substring(1, 2)
      ),
    ];
    const rangeTwoPrange = prange("AA");
    const rangeTwo = [
      new CardHandSuit(
        rangeTwoPrange[0].substring(0, 1),
        rangeTwoPrange[0].substring(1, 2)
      ),
    ];
    const board = "Td9d5c";

    expect(
      calculateEquity(rangeOne, board, rangeTwo, Calculator).toFixed(2)
    ).toBe("0.50");
  });

  test("Board correctly calculates equity for hand against other hand that contains offsuit hands", () => {
    const rangeOnePrange = prange("JJ");
    const rangeOne = [
      new CardHandSuit(
        rangeOnePrange[0].substring(0, 1),
        rangeOnePrange[0].substring(1, 2)
      ),
    ];
    const rangeTwoPrange = prange("AKo");
    const rangeTwo = [
      new CardHandSuit(
        rangeTwoPrange[0].substring(0, 1),
        rangeTwoPrange[0].substring(1, 2)
      ),
    ];
    const board = "Td9d5c";

    expect(
      calculateEquity(rangeOne, board, rangeTwo, Calculator).toFixed(2)
    ).toBe("0.50");
  });

  test("Board correctly calculates equity for hand against other hand that contains suited hands", () => {
    const rangeOnePrange = prange("JJ");
    const rangeOne = [
      new CardHandSuit(
        rangeOnePrange[0].substring(0, 1),
        rangeOnePrange[0].substring(1, 2)
      ),
    ];
    const rangeTwoPrange = prange("AKs");
    const rangeTwo = [
      new CardHandSuit(
        rangeTwoPrange[0].substring(0, 1),
        rangeTwoPrange[0].substring(1, 2)
      ),
    ];
    const board = "Td9d5c";

    expect(
      calculateEquity(rangeOne, board, rangeTwo, Calculator).toFixed(2)
    ).toBe("0.50");
  });

  test("Board correctly calculates equity for hand against other multiple hands that contains pairs", () => {
    const rangeOnePrange = prange("JJ");
    const rangeOne = [
      new CardHandSuit(
        rangeOnePrange[0].substring(0, 1),
        rangeOnePrange[0].substring(1, 2)
      ),
    ];
    const rangeTwoPrange = prange("KK, AA");
    const rangeTwo = rangeTwoPrange.map(
      (range) => new CardHandSuit(range.substring(0, 1), range.substring(1, 2))
    );
    const board = "Td9d5c";

    expect(
      calculateEquity(rangeOne, board, rangeTwo, Calculator).toFixed(2)
    ).toBe("0.50");
  });

  test("Board correctly calculates equity for hand against other multiple hands that contains all possible inputs", () => {
    const rangeOne = [new CardHandSuit("J", "J")];
    const rangeTwoPrange = prange("KK, AKs, AKo");
    const rangeTwo = rangeTwoPrange.map(
      (hand) => new CardHandSuit(hand.substring(0, 1), hand.substring(1, 2))
    );
    const board = "Td9d5c";

    expect(
      calculateEquity(rangeOne, board, rangeTwo, Calculator).toFixed(2)
    ).toBe("0.50");
  });

  test("Board does not calculate equity for two overlapping hands", () => {
    const rangeOne = [new CardHandSuit("J", "J")];
    const rangeTwo = [new CardHandSuit("A", "J")];
    const board = "Jd9d5c";

    expect(
      calculateEquity(rangeOne, board, rangeTwo, Calculator).toFixed(2)
    ).toBe("0.50");
  });

  test("Board does not calculate equity for two non-existant board and hand combinations", () => {
    const rangeOne = [new CardHandSuit("J", "J")];
    const rangeTwo = [new CardHandSuit("A", "T")];
    const board = "Td9d5c";

    expect(
      calculateEquity(rangeOne, board, rangeTwo, Calculator).toFixed(2)
    ).toBe("0.50");
  });

  test("CalcEquities renders the correct object", () => {
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges));
    PreflopRanges = PreflopRanges.filter(({ Street }) => Street == "Preflop");

    const testHand = new CardHandSuit("A", "A");

    PreflopRanges[0].hands = [testHand];

    const cards = generateCardGrid(PreflopRanges, true);
    console.log(cards); //?
    const board = ["Td", "9d", "5c"];
    const street = "Flop";

    expect(calcEquities(cards, board, PreflopRanges, street)).toStrictEqual({
      AA: { colorCards: "#8bddbe", equity: "0.34" },
    });
  });
});
