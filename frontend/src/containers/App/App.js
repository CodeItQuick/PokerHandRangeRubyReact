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

import reducer from "../MainPage/reducer";

const key = "global";

const App = ({ ranges, mode, rangeColors }) => {
  useInjectReducer({ key, reducer });
  // const [stripe, setStripe] = useState(null);
  const username = useSelector(state => state.user);
  // useEffect(() => {
  //   if (window.Stripe) {
  //     setStripe(window.Stripe("pk_test_3QHFTQccclvodS2QXldeAkSh00qBGSooM3"));
  //   } else {
  //     document.querySelector("#stripe-js").addEventListener("load", function() {
  //       setStripe(window.Stripe("pk_test_3QHFTQccclvodS2QXldeAkSh00qBGSooM3"));
  //     });
  //   }

  //   // const token = localStorage.getItem("token");
  //   // if (token) {
  //   //   fetch(`http://localhost:3001/auto_login`, {
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`
  //   //     }
  //   //   })
  //   //   .then(resp => resp.json())
  //   //   .then(data =>{
  //   //     console.log(data);
  //   //   });
  //   // }
  // }, []);

  // const handleAuthClick = () => {
  //   const token = localStorage.getItem("token");
  //   fetch(`http://localhost:3001/auto_login`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log(data);
  //     });
  // };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  return (
    <Fragment>
      <Menu inverted>
        <Menu.Item>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        {username ? (
          <>
            <Menu.Item>{username}</Menu.Item>
            <Menu.Item>
              <NavLink to="/donate">Donate</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item>
              <NavLink to="/register">Register</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
      <MainPage
        ranges={ranges}
        mode={mode}
        rangeColors={rangeColors}
      ></MainPage>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  ranges: makeSelectRanges(),
  mode: makeSelectMode(),
  rangeColors: makeSelectRangeColors()
}); //?

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(App);
