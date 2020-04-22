import React, { useEffect, useState, useRef, Fragment, memo } from "react";
import "./App.css";
import MainPage from "../MainPage/index";
// import { useStripe } from "../../HOC/useStripe/useStripe";
// import { StripeProvider, Elements } from "react-stripe-elements";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../reducers/actions.js";
import { useInjectReducer } from "../../HOC/useInjectReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectRanges,
  makeSelectRangeColors,
  makeSelectMode
} from "../MainPage/selectors";

import styled from "styled-components";

import reducer from "../MainPage/reducer";
import Navbar from "../../components/NavBar";
import MainContainer from "../../components/MainContainer";

import Tour from "reactour";

const key = "global";

const StyledFragment = styled.div`
  background-color: #e2e3e6;
`;
const steps = [
  {
    selector: "button#PreflopRaise4BetCall",
    content:
      "First pick your betting pattern, Raise4BetCall, in this case you will select your strongest hands that you always raise with. "
  },
  {
    selector: "button#colorButtonAA",
    content:
      "AA is by far the strongest hand in holdem, select this hand by turning the table column green to go in your strongest hand range "
  },
  {
    selector: "button#PreflopRaise4BetFold",
    content:
      "Next we are going to take one of our strongest hands and turn it into a bluff when someone raises us. Select Raise4BetFold next. "
  },
  {
    selector: "button#colorButtonAQo",
    content:
      "AQo makes the perfect bluffing hand. Its strong enough to raise first in, and has cards that block the strongest hands in the game. Go ahead and select AQo."
  },
  {
    selector: "#Raise4BetValueTutorial",
    content:
      "How often are we bluffing raising just AA and AQo? Looks valuebet with aces 33% of the time!"
  },
  {
    selector: "#Raise4BetBluffTutorial",
    content:
      "How often are we bluffing raising just AA and AQo? Looks like we bluff twice as often at 67% as much as we valuebet. This ratio is much too high, we should now add kings and AKs to our range to balance our range."
  },
  {
    selector: "button#colorButtonKK , button#colorButtonAKs",
    content:
      "You can click and drag now to select the two hands, KK and AKs,  to balance out your range."
  },
  {
    selector: "#Raise4BetBluffTutorial",
    content:
      "This is fantastic, now we are only bluffing approximately less than half the time! If someone tries to rebluff our raise back at them, they will be greeted with an allin against a very strong hand much too often for this to be a profitable move"
  }
];
const App = ({ ranges, mode, rangeColors }) => {
  useInjectReducer({ key, reducer });
  // const [stripe, setStripe] = useState(null);
  const username = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isTourOpen, updateTourOpen] = useState(true);

  const closeTour = () => updateTourOpen(false);

  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  return (
    <StyledFragment>
      <MainContainer>
        <Navbar />
        <MainPage
          ranges={ranges}
          mode={mode}
          rangeColors={rangeColors}
        ></MainPage>
        <Tour steps={steps} isOpen={isTourOpen} onRequestClose={closeTour} />
      </MainContainer>
    </StyledFragment>
  );
};

const mapStateToProps = createStructuredSelector({
  ranges: makeSelectRanges(),
  mode: makeSelectMode(),
  rangeColors: makeSelectRangeColors()
}); //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(App);
