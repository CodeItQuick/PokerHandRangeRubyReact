import React from "react";
import MainPage from "../../../src/containers/MainPage/index.js";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from '../../../src/containers/MainPage/reducer';
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import Board from "../../../src/containers/MainPage/Board";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

function setup({ onMouseOverHandler, rangeColors}) {
  const props = { onMouseOverHandler, rangeColors };

  const enzymeWrapper = (<Provider store={store}><Board  {...props} /></Provider>);

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

  test("board fires onClick handler as clicked", () => {

    const enzymeWrapper = mount(setup(jest.fn(),  {
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
 
    const enzymeWrapper = mount(setup({onMouseOverHandler: jest.fn, rangeColors: {
      "#8BDDBE": ['AA'],
      "#ED87A7": [],
      "#6B6C7C": [],
      "#D3D3D3": []
    }}));
    console.log(); //?
      console.log(enzymeWrapper); //?
      const colorcardAA = enzymeWrapper.find("#colorButtonAA").get(0).props.coloring;
      console.log(colorcardAA);
      expect(colorcardAA).toBe('#8BDDBE');
  });

  test("board renders with a grey card-button object when selected", () => {
 
    const enzymeWrapper = mount(setup({onMouseOverHandler: jest.fn, rangeColors: {
      "#8BDDBE": [],
      "#ED87A7": ['AA'],
      "#6B6C7C": [],
      "#D3D3D3": []
    }}));
    console.log(); //?
      console.log(enzymeWrapper); //?
      const colorcardAA = enzymeWrapper.find("#colorButtonAA").get(0).props.coloring;
      console.log(colorcardAA);
      expect(colorcardAA).toBe('#ED87A7');
  });

  test("board renders with a blackish card-button object when selected", () => {
 
    const enzymeWrapper = mount(setup({onMouseOverHandler: jest.fn, rangeColors: {
      "#8BDDBE": [],
      "#ED87A7": [],
      "#6B6C7C": ['AA'],
      "#D3D3D3": []
    }}));
    console.log(); //?
      console.log(enzymeWrapper); //?
      const colorcardAA = enzymeWrapper.find("#colorButtonAA").get(0).props.coloring;
      console.log(colorcardAA);
      expect(colorcardAA).toBe('#6B6C7C');
  });

  test("board renders with a pale grey card-button object when selected", () => {
 
    const enzymeWrapper = mount(setup({onMouseOverHandler: jest.fn, rangeColors: {
      "#8BDDBE": [],
      "#ED87A7": [],
      "#6B6C7C": [],
      "#D3D3D3": ['AA']
    }}));
    console.log(); //?
      console.log(enzymeWrapper); //?
      const colorcardAA = enzymeWrapper.find("#colorButtonAA").get(0).props.coloring;
      console.log(colorcardAA);
      expect(colorcardAA).toBe('#D3D3D3');
  });
});
