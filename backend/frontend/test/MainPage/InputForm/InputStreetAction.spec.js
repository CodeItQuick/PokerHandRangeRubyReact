import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import InputStreetAction from "../../../src/containers/MainPage/InputForm/InputStreetAction";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);
//streetSelectRiver
function setup({ street, streetAction, onHandleStreetHandlerButtons }) {
  const props = {
    street,
    streetAction,
    onHandleStreetHandlerButtons,
  };
  const enzymeWrapper = <InputStreetAction {...props} />;

  return enzymeWrapper;
}
describe("InputStreetAction Container", () => {
  test.each([
    "button#firstChoice",
    "button#secondChoice",
    "button#thirdChoice",
    "button#fourthChoice",
  ])(
    "receives a click when each button is pushed given we are on the flop",
    (buttonID) => {
      //Given
      const onHandleStreetHandlerButtonsSpy = jest.fn();
      const InputStreetActionButton = mount(
        setup({
          street: "Flop",
          streetAction: "Bluff",
          onHandleStreetHandlerButtons: onHandleStreetHandlerButtonsSpy,
        })
      );

      //When
      InputStreetActionButton.find(buttonID).simulate("click");

      //Then
      expect(onHandleStreetHandlerButtonsSpy.mock.calls.length).toEqual(1);
    }
  );
  test.each([
    "button#firstChoice",
    "button#secondChoice",
    "button#thirdChoice",
    "button#fourthChoice",
  ])(
    "receives a click when each button is pushed given we are on the preflop",
    (buttonID) => {
      //Given
      const onHandleStreetHandlerButtonsSpy = jest.fn();
      const InputStreetActionButton = mount(
        setup({
          street: "Preflop",
          streetAction: "Raise4betCall",
          onHandleStreetHandlerButtons: onHandleStreetHandlerButtonsSpy,
        })
      );

      //When
      InputStreetActionButton.find(buttonID).simulate("click");

      //Then
      expect(onHandleStreetHandlerButtonsSpy.mock.calls.length).toEqual(1);
    }
  );
});
