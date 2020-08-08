import React from "react";
import MainPage from "../../../src/containers/MainPage/index.js";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import BoardOfHands, {
  generateCardGrid,
  orderedCard,
} from "../../../src/containers/MainPage/Board/StateUpdate";
import { calculateEquity } from "../../../src/containers/MainPage/Board/EquityCalculations";
import CardHandSuit from "../../../src/containers/MainPage/Board/CardHandSuit";
import { ranges } from "../../../src/containers/MainPage/sampleData.js";
import { bind } from "../../../src/containers/MainPage/Board/index.js";
import Board from "../../../src/containers/MainPage/Board";
import { Table } from "semantic-ui-react";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

function setup() {
  let enzymeWrapper = (
    <Provider store={store}>
      <Board />
    </Provider>
  );

  return enzymeWrapper;
}

describe("State Update Functions", () => {
  test(" generate CardGrid generates an empty object when given an empty range", () => {
    const PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges));
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).toStrictEqual({});
  });

  test(" generate CardGrid generates an AA object when given an AA range", () => {
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let AAHandObj = new CardHandSuit("A", "A");
    PreflopRanges[0].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).toStrictEqual({
      AA: {
        colorCards: ["#8bddbe", "#ed87a7", "#6b6c7c", "#d3d3d3"][0],
        equity: "n/a",
      },
    });
  });

  test(" generate CardGrid generates an AA object when given an AA range", () => {
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let AAHandObj = new CardHandSuit("A", "A");
    PreflopRanges[1].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).toStrictEqual({
      AA: {
        colorCards: ["#8bddbe", "#ed87a7", "#6b6c7c", "#d3d3d3"][1],
        equity: "n/a",
      },
    });
  });

  test(" generate CardGrid generates an AA object when given an AA range", () => {
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let AAHandObj = new CardHandSuit("A", "A");
    PreflopRanges[2].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).toStrictEqual({
      AA: {
        colorCards: ["#8bddbe", "#ed87a7", "#6b6c7c", "#d3d3d3"][2],
        equity: "n/a",
      },
    });
  });

  test(" generate CardGrid generates an AA object when given an AA range", () => {
    let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
      ({ Street }) => Street == "Preflop"
    );
    let AAHandObj = new CardHandSuit("A", "A");
    PreflopRanges[3].hands = [AAHandObj];
    const Position = initialState.mode.isIP;
    const newCardGrid = generateCardGrid(PreflopRanges, Position);

    expect(newCardGrid).toStrictEqual({
      AA: {
        colorCards: ["#8bddbe", "#ed87a7", "#6b6c7c", "#d3d3d3"][3],
        equity: "n/a",
      },
    });
  });

  test(" BoardOfHands generates a card grid on instantiation", () => {
    let bind = jest.fn();
    let Board = mount(setup());

    let cardGrid = Board.find("#cardgridtable");

    expect(cardGrid.length).toBe(2);
  });

  test(" BoardOfHands generates a card grid on instantiation", () => {
    let bind = jest.fn();
    let boardOfHands = new BoardOfHands(bind);
    let Board = mount(setup());

    let cardGrid = Board.find("#cardgridtable");

    expect(cardGrid.length).toBe(2);
  });
});
