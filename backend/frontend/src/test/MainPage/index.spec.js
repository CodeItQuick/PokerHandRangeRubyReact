import React from "react";
import MainPage from "./../../containers/MainPage";
import { handsInRange } from "./../../containers/MainPage/ProgressIndicator";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "./../../containers/MainPage/reducer";
import history from "./../../utils/history";
import configureStore from "./../../configureStore";
import HandRange from "./../../containers/MainPage/EngineClasses/HandRange";
import { StartingHandBuilder } from "./../../containers/MainPage/EngineClasses/StartingHandBuilder";
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
describe("MainPage Container", () => {
  it("renders an element on the page", () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.length).to.equal(1);
  });

  it("handsInRange should return false when given an empty range", () => {
    const range = initialState.ranges.map(({ Street, BetType }) => {
      return new HandRange(Street, BetType, []);
    });
    const street = "Preflop";

    expect(handsInRange(range, street)).to.equal(false);
  });

  it("handsInRange should return true when given a range with AA", () => {
    const range = initialState.ranges.map((range) => {
      if (range.Street == "Preflop")
        return new HandRange("Preflop", range.BetType, [
          new StartingHandBuilder().build("A", "A"),
        ]);
      else return new HandRange(range.Street, range.BetType, []);
    });
    const street = "Preflop";

    expect(handsInRange(range, street)).to.equal(true);
  });
});
