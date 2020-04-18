import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from '../../../src/containers/MainPage/reducer';
import history from "../../../src/utils/history";
import StreetSelector from "../../../src/containers/MainPage/InputForm/StreetSelector";

Enzyme.configure({ adapter: new Adapter() });

//streetSelectRiver
function setup({onHandleStreetHandler, mode }) {
  const props = { onHandleStreetHandler, mode };
  const enzymeWrapper = (<StreetSelector  {...props} />);

  return enzymeWrapper;
}
describe("MainPage Container", () => {
  test("StreetSelector renders a component when given a mode", () => {
    const mode = {street: 'Preflop', streetName: 'Raise4BetCall'};

    const onClickFunction = (e, data) => data;

    const enzymeWrapper = shallow(setup({onClickFunction, mode }));
    expect(enzymeWrapper.length).toBe(1);
  });

  test("StreetSelector clicking 4 buttons causes the function to be called 4 times", () => {
    
    const streetActions = ['Raise4BetCall', 'Raise4BetFold', 'RaiseCall', 'RaiseFold'];
    const mode = {street: 'Preflop', streetName: 'Raise4BetCall'};
    
    const onHandleStreetHandler = (jest.fn((e, data) => e));

    let enzymeWrapper = [];
    
    streetActions.forEach((streetAction, idx) => {
      console.log(streetAction); //?
      enzymeWrapper[idx] = mount(setup({onHandleStreetHandler, mode})); 

      enzymeWrapper[idx].find('button#Preflop' + streetAction).simulate('click');
      expect(onHandleStreetHandler).toBeCalledTimes(idx + 1); //?
    
    });

  }); 

    test("StreetSelector can switch between preflop, flop, turn, and river.", () => {
    
      const streetActions = ['streetSelectPreflop', 'streetSelectFlop', 'streetSelectTurn', 'streetSelectRiver'];
      const mode = {street: 'Preflop', streetName: 'Raise4BetCall'};
      
      const onHandleStreetHandler = (jest.fn((e, data) => e));
  
      let enzymeWrapper = [];
      
      streetActions.forEach((streetAction, idx) => {
        console.log(streetAction); //?
        enzymeWrapper[idx] = mount(setup({onHandleStreetHandler, mode})); 
        console.log(streetAction); //?
        enzymeWrapper[idx].find('a#' + streetAction).simulate('click');
        expect(onHandleStreetHandler).toBeCalledTimes(idx + 1); //?
      
      });
    });


});