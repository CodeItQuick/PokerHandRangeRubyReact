import React from "react";
import MainPage from "./../../containers/MainPage";
import { handsInRange } from "./../../containers/MainPage/ProgressIndicator";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "./../../containers/MainPage/reducer";
import history from "./../../utils/history";
import configureStore from "./../../configureStore";
import RangeObject from "./../../containers/MainPage/EngineClasses/RangeObject";
import { CardHandSuitBuilder } from "./../../containers/MainPage/EngineClasses/CardHandSuitBuilder";
import { expect } from "chai";
Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

function setup() {
  const props = initialState;

  const enzymeWrapper = shallow(
    <Provider store={store}>
      <MainPage {...props} />
    </Provider>
  );

  return {
    props,
    enzymeWrapper,
  };
}
suite("MainPage Container", () => {
  test("renders an element on the page", () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.length).to.equal(1);
  });

  test("handsInRange should return false when given an empty range", () => {
    const range = initialState.ranges.map(({ Street, BetType }) => {
      return new RangeObject(Street, BetType, []);
    });
    const street = "Preflop";

    expect(handsInRange(range, street)).to.equal(false);
  });

  test("handsInRange should return true when given a range with AA", () => {
    const range = initialState.ranges.map((range) => {
      if (range.Street == "Preflop")
        return new RangeObject("Preflop", range.BetType, [
          new CardHandSuitBuilder().build("A", "A"),
        ]);
      else return new RangeObject(range.Street, range.BetType, []);
    });
    const street = "Preflop";

    expect(handsInRange(range, street)).to.equal(true);
  });
});
