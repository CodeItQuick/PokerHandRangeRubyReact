import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from '../src/containers/MainPage/reducer';
import history from "../src/utils/history";
import configureStore from "../src/configureStore.js";
import StreetSelector from "../src/containers/MainPage/InputForm/StreetSelector";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

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

  test("StreetSelector buttons all function", () => {
    
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


});