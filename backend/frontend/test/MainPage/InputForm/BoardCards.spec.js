import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";
import { initialState } from "../../../src/containers/MainPage/reducer";
import history from "../../../src/utils/history";
import configureStore from "../../../src/configureStore.js";
import BoardCards from "../../../src/containers/MainPage/InputForm/BoardCards";

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);
//streetSelectRiver
function setup({ cardsFlipped }) {
  const props = { cardsFlipped };
  const enzymeWrapper = (
    <Provider store={store}>
      <BoardCards {...props} />
    </Provider>
  );

  return enzymeWrapper;
}
describe("Board Container", () => {
  test("The five images have something rendered", () => {
    const mode = { street: "Preflop", streetName: "Raise4BetCall" };

    const onClickFunction = (e, data) => data;

    const cardsFlipped = [];

    const enzymeWrapper = mount(setup({ cardsFlipped }));
    [0, 1, 2, 3, 4].forEach((imageIndex) => {
      const imgSrc = enzymeWrapper.find("img#Board" + imageIndex + "Card");

      expect(
        enzymeWrapper.find("img#Board" + imageIndex + "Card")
      ).toBeTruthy();
      expect(
        enzymeWrapper.find("img#Board" + imageIndex + "Card").length
      ).toEqual(1);
    });
  });

  test("The image backs are rendered when there is no entry", () => {
    const mode = { street: "Preflop", streetName: "Raise4BetCall" };

    const onClickFunction = (e, data) => data;

    const cardsFlipped = [];

    const enzymeWrapper = mount(setup({ cardsFlipped }));
    [0, 1, 2, 3, 4].forEach((imageIndex) => {
      enzymeWrapper.find("img#Board" + imageIndex + "Card");

      expect(
        enzymeWrapper.find("img#Board" + imageIndex + "Card")
      ).toBeTruthy();
      expect(
        enzymeWrapper.find("img#Board" + imageIndex + "Card").length
      ).toEqual(1);
    });
  });

  //FIXME: This test is passing when it should be failing
  test("The images render as cards are entered", () => {
    const mode = { street: "Preflop", streetName: "Raise4BetCall" };

    const onClickFunction = (e, data) => data;

    const cardsFlipped = [];

    ["Ah", "Th", "4c", "2s", "4d"].reduce((acc, curr, idx) => {
      const enzymeWrapper = mount(setup({ cardsFlipped: [...curr] }));

      enzymeWrapper.find("img#Board" + idx + "Card");

      expect(enzymeWrapper.find("img#Board" + idx + "Card")).toBeTruthy();
      expect(enzymeWrapper.find("img#Board" + idx + "Card").length).toEqual(1);
    });
  });
});
