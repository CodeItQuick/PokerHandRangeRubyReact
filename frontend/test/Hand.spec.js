import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Hand from "../src/components/hand/hand.js";

Enzyme.configure({ adapter: new Adapter() });

function setup(cardOnes, cardTwos, suits, classColor, mockCallBack = jest.fn()) {
  
  const props = { onHandClick: mockCallBack, 
    cardOne: cardOnes, cardTwo: cardTwos,
    suit: suits, classColor: classColor}; //?

  const enzymeWrapper = <Hand {...props} />;

  return {
    enzymeWrapper
  }
}
describe("Hand Container", () => {
  test("AKs should render white card-button when not selected", () => {
    const enzymeWrapper = setup('A', 'K', 's', false);
    const wrapper = mount(enzymeWrapper.enzymeWrapper);
    console.log(wrapper); //?
    expect(wrapper.find('button').hasClass('white card-button')).toBe(true);
  });
  test("AKs should render green card-button when green card-button Selected", () => {
    const enzymeWrapper = setup('A', 'K', 's', 'green card-button');
    const wrapper = mount(enzymeWrapper.enzymeWrapper);
    console.log(wrapper); //?
    expect(wrapper.find('button').hasClass('green card-button')).toBe(true);
  });
  test("Clicking the button generates an event", () => {

    const mockCallBack = jest.fn();

    const enzymeWrapper = setup('A', 'K', 's', 'green card-button', mockCallBack);
    const button = shallow(enzymeWrapper.enzymeWrapper);
    button.find('Button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

});