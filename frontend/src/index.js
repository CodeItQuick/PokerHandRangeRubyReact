import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import throttle from "lodash/throttle";
import { saveState } from "./localStorage";
import configureStore from "./configureStore";
import { initialState } from "./containers/MainPage/reducer.js";
import history from "./utils/history";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "styled-components";

import UserRegister from "./containers/Auth/Register/UserRegister.js";
import Login from "./containers/Auth/Login/UserLogin.js";
// import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config";
import { ErrorBoundary } from "./utils/ErrorBoundary";

//const store = createStore(combineReducers({rootReducer, handRangesAvailable}), applyMiddleware(thunk));
// Create redux store with history
//const initialState = {};
const store = configureStore(initialState, history);

store.subscribe(
  throttle(() => {
    try {
      const { global, user } = store.getState();
      saveState({ global, user });
    } catch {
      saveState({ global: initialState, user: {} });
    }
  }, 1000)
);

const siteUrl = `${process.env.REACT_APP_PRODUCTION_API_URL}`;

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(appState && siteUrl ? siteUrl : window.location.pathname);
};

ReactDOM.render(
  // <Auth0Provider
  //   domain={config.domain}
  //   client_id={config.clientId}
  //   redirect_uri={siteUrl}
  //   onRedirectCallback={onRedirectCallback}
  // >
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={{ main: "mediumseagreen" }}>
          <Route exact path="/" component={App} />
          <Route exact path="/register" component={UserRegister} />
          <Route exact path="/login" component={Login} />
        </ThemeProvider>
      </Router>
    </Provider>
  </ErrorBoundary>,
  // </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
