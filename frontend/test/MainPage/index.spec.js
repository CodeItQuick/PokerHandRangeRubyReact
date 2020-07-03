import React from "react";
import MainPage from "../../src/containers/MainPage";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../src/containers/MainPage/reducer";
import history from "../../src/utils/history";
import configureStore from "../../src/configureStore";

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
  test("renders an element on the page", () => {
    const { enzymeWrapper } = setup();
    console.log(enzymeWrapper);

    expect(enzymeWrapper.length).toBe(1);
  });
});
