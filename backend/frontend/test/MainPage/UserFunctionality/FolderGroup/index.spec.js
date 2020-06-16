import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import FolderGroup from '../../../../src/containers/MainPage/UserFunctionality/FolderGroup/index.js';

Enzyme.configure({ adapter: new Adapter() });

//streetSelectRiver
function setup() {
//   const props = { onHandleStreetHandler, mode };
  const enzymeWrapper = (<FolderGroup />);

  return enzymeWrapper;
}
describe("FolderGroup Component in MainPage Container", () => {
  test("When clicking defending ranges active class is selected", () => {
    let enzymeWrapper = mount(setup());
    
    expect(enzymeWrapper.find('a').length).toBe(2);
    const buttons = enzymeWrapper.find('a');
    const defendingRanges = buttons.at(1);

    console.log(defendingRanges); //?
    defendingRanges.simulate('click');
    console.log(defendingRanges.html()); //?
 
    expect(defendingRanges.render().hasClass('active item')).toBe(true);

    
    });

    test("When clicking opening ranges active class is selected", () => {
    
        let enzymeWrapper = mount(setup());
    
        expect(enzymeWrapper.find('a').length).toBe(2);
        const buttons = enzymeWrapper.find('a');
    
        const openingRanges = buttons.at(0);
        openingRanges.simulate('click');

        expect(openingRanges.render().hasClass('active item')).toBe(true);
    })

});