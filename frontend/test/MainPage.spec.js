import React from "react";
import MainPage from "../src/containers/MainPage/index.js";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from '../src/containers/MainPage/reducer';
import history from "../src/utils/history";
import configureStore from "../src/configureStore.js";
import Board from "../src/components/board/board.js";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

function setup(onHandClick, classColorFn) {
  const props = {onHandClick, classColorFn};

  const enzymeWrapper = shallow(<Board  {...props} />);

  return {
    props,
    enzymeWrapper
  }
}
describe("MainPage Container", () => {

    test("Clicking the button changes the color of a hand", () => {

        const board = mount(<Board />);

        const MainPages = mount(<Provider store={store}><MainPage></MainPage></Provider>);
        //click the preflop button
        const Raise4BetCall = MainPages.find("[value='Raise4BetCall']").find("Button"); //?
        Raise4BetCall.simulate('click');

        //click the hand
        const AKsButton = board.find("[name='AKs']").find("Button"); //?
        AKsButton.simulate('click');

        //hand should have turned green
        expect(AKsButton.hasClass('green card-button ')).toBe(true); //?
    });
});
