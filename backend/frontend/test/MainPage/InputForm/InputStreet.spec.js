import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import InputStreet from "../../../src/containers/MainPage/InputForm/InputStreet";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);
//streetSelectRiver
function setup({ street, onHandleStreetHandler }) {
  const props = {
    street,
    onHandleStreetHandler,
  };
  const enzymeWrapper = <InputStreet {...props} />;

  return enzymeWrapper;
}
describe("InputStreet Container", () => {
  test.each([
    "button#streetFirstChoice",
    "button#streetSecondChoice",
    "button#streetThirdChoice",
    "button#streetFourthChoice",
  ])(
    "receives a click when each button is pushed given we are on the flop",
    (buttonID) => {
      //Given
      const onHandleStreetHandlerSpy = jest.fn();
      const InputStreetActionButton = mount(
        setup({
          onHandleStreetHandler: onHandleStreetHandlerSpy,
          street: "Preflop",
        })
      );

      //When
      InputStreetActionButton.find(buttonID).simulate("click");

      //Then
      expect(onHandleStreetHandlerSpy.mock.calls.length).toEqual(1);
    }
  );
});
