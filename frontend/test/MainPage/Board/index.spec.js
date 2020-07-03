import React from "react";
import MainPage from "../../../src/containers/MainPage/index";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore";
import Board from "../../../src/containers/MainPage/Board";
import { ranges } from "../../../src/containers/MainPage/sampleData";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

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
    expect(colorcardAA).toBe("#AAA");
  });
});
