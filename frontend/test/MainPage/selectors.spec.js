import React from "react";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { initialState } from '../../src/containers/MainPage/reducer.js';

import {
    selectGlobal,
    selectRouter,
    makeSelectRanges,
    makeSelectRange,
    makeSelectMode,
    makeSelectRangeColors,
    makeSelectUser
  } from '../../src/containers/MainPage/selectors.js';

Enzyme.configure({ adapter: new Adapter() });

function setup({ onMouseOverHandler, rangeColors}) {
  const props = { onMouseOverHandler, rangeColors };

  const enzymeWrapper = (<Board  {...props} />);

  return enzymeWrapper;
}
describe("MainPage Login Selectors", () => {
  test("rangeColors should return the colors ", () => {
    
    const mockParameters = { global: {...initialState, rangeColors: {
      "#8BDDBE": ['AA'],
      "#ED87A7": ['KK'],
      "#6B6C7C": ['QQ'],
      "#D3D3D3": ['JJ']
    }}};

    const getMakeSelectRangeColors = state => makeSelectRangeColors(state);

    const results = {
        "#8BDDBE": ['AA'],
        "#ED87A7": ['KK'],
        "#6B6C7C": ['QQ'],
        "#D3D3D3": ['JJ']
    }; 

    expect(getMakeSelectRangeColors()(mockParameters)).toEqual(results);
  });

  test("mode should return the current mode ", () => {
    
    const mockParameters = { global: {...initialState, mode: {
        street: "Preflop",
        streetAction: "Raise4BetFold"
      }}};

    const getMakeSelectMode = state => makeSelectMode(state);

    const results = {
        street: "Preflop",
        streetAction: "Raise4BetFold"
      }; 

    expect(getMakeSelectMode()(mockParameters)).toEqual(results);
  });

});