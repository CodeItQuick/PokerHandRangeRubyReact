import React from "react";
import MainPage from "../src/containers/MainPage/index.js";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from '../src/containers/MainPage/reducer';
import history from "../src/utils/history";
import configureStore from "../src/configureStore.js";
import Board from "../src/containers/MainPage/Board/";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

function setup(onHandClick, ranges) {
  const props = {onHandClick, ranges};

  const enzymeWrapper = (<Board  {...props} />);

  return enzymeWrapper;
}
describe("MainPage Container", () => {
  test("board renders with a white card-button object", () => {
    const enzymeWrapper = shallow(setup(jest.fn(), {
      Preflop: {
        disabled: false,
        Raise4BetCall: {
          color: "green",
          active: "red",
          prHandString: [],
          colorCard: "green card-button"
        }
      }}));
    console.log(enzymeWrapper); //?
    expect(enzymeWrapper.length).toBe(1);
  });

  test("board renders with a white card-button object", () => {

    const enzymeWrapper = shallow(setup(Board.handleClassColor,  {
      Preflop: {
        disabled: false,
        Raise4BetCall: {
          color: "green",
          active: "red",
          prHandString: [],
          colorCard: "green card-button"
        }
      }}));
    console.log(enzymeWrapper); //?
    expect(enzymeWrapper.length).toBe(1);
  }); 

  test("board renders with a green card-button object when selected", () => {

    const enzymeWrapper = mount(setup(jest.fn, ['AA']));
      console.log(enzymeWrapper); //?
      console.log(enzymeWrapper.find('AA').hasClass('green card-button'));
      expect(enzymeWrapper.find('AA').hasClass('green card-button')).toBe(true);
  });

});
