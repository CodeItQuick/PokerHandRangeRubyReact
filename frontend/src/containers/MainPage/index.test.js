import React from "react";
import MainPage from "./index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Provider } from "react-redux";

describe("MainPage Container", state => {
  test("renders", () => {
    const wrapper = shallow(<MainPage />);
    expect(wrapper.exists()).toBe(true);
  });
});
