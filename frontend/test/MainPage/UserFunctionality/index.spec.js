import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import UserFunctionality from "../../../src/containers/MainPage/UserFunctionality/index";
import { Provider } from "react-redux";

import configureStore from "../../../src/configureStore";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);
//streetSelectRiver
function setup() {
  //   const props = { onHandleStreetHandler, mode };
  const enzymeWrapper = (
    <Provider store={store}>
      <UserFunctionality />
    </Provider>
  );

  return enzymeWrapper;
}

describe("FolderGroup Component in MainPage Container", () => {
  test("When clicking folder 1, 2, or 3 active class is selected", () => {
    let enzymeWrapper = mount(setup());

    // console.log(enzymeWrapper.find("a"));
    //expect(enzymeWrapper.find("a").length).toBe(5);
    const buttons = enzymeWrapper.find("a");
    const folderTwo = buttons.get(1).props.onClick();

    expect(folderTwo.render().hasClass("active item")).toBe(true);
  });
});
