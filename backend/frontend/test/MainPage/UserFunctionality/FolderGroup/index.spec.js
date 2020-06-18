import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import FolderGroup from "../../../../src/containers/MainPage/UserFunctionality/FolderGroup/index.js";

import configureStore from "../../../../src/configureStore";
import { initialState } from "../../../../src/containers/MainPage/reducer.js";
import history from "../../../../src/utils/history";
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);
//streetSelectRiver
function setup() {
  //   const props = { onHandleStreetHandler, mode };
  const enzymeWrapper = (
    <Provider store={store}>
      <FolderGroup />
    </Provider>
  );

  return enzymeWrapper;
}
describe("FolderGroup Component in MainPage Container", () => {
  test("When clicking defending ranges the onClick event is triggered", () => {
    let enzymeWrapper = mount(setup());

    expect(enzymeWrapper.find("a").length).toBe(2);

    const mockCallback = jest.fn();

    enzymeWrapper.find("a").at(1).props.onClick = mockCallback();
    enzymeWrapper
      .find("a")
      .at(1)
      .simulate("click");

    expect(mockCallback).toHaveBeenCalled();
  });
});
