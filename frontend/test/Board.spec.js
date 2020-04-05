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
  test("board renders with a white card-button object", () => {
    const {enzymeWrapper} = setup(jest.fn(), () => "white card-button");
    console.log(enzymeWrapper); //?
    expect(enzymeWrapper.length).toBe(1);
  });

  test("board renders with a white card-button object", () => {

    const {enzymeWrapper} = setup(jest.fn(), Board.handleClassColor);
    console.log(enzymeWrapper); //?
    expect(enzymeWrapper.length).toBe(1);
  });

  test("Clicking a button doesn't throw an error", () => {

  });

});
