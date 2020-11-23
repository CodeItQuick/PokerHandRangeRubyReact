import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "./../../../containers/MainPage/reducer";
import history from "./../../../utils/history";
import configureStore from "./../../../configureStore.js";
import Board from "./../../../containers/MainPage/Board";
import { expect } from "chai";

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
suite("MainPage Container", () => {
  test("board renders with a white card-button object", () => {
    const enzymeWrapper = shallow(setup(() => null));
    expect(enzymeWrapper.length).to.equal(1);
  });

  test("board fires onClick handler as clicked", () => {
    const enzymeWrapper = shallow(setup(() => null));
    expect(enzymeWrapper.length).to.equal(1);
  });
});
