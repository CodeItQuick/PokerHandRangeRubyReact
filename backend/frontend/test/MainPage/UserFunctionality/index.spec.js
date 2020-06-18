import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import UserFunctionality from "../../../src/containers/MainPage/UserFunctionality/index.js";
import { Provider } from "react-redux";

import configureStore from "../../../src/configureStore";
import { initialState } from "../../../src/containers/MainPage/reducer.js";
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
  test.each([0])(
    "When clicking folder 1, 2, or 3 active class is selected",
    (folderNumbers) => {
      let enzymeWrapper = mount(setup());

      // console.log(enzymeWrapper.find("a"));
      //expect(enzymeWrapper.find("a").length).toBe(5);
      const buttons = enzymeWrapper.find("a");
      const folderTwo = buttons.at(folderNumbers);

      console.log(folderTwo); //?
      folderTwo.simulate("click");
      console.log(folderTwo.html()); //?

      expect(folderTwo.render().hasClass("active item")).toBe(true);
    }
  );
});
