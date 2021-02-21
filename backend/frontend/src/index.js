import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "semantic-ui-less/semantic.less";

import throttle from "lodash/throttle";
import { saveState } from "./localStorage";
import configureStore from "./configureStore";
import { initialState } from "./containers/MainPage/reducer.js";
import history from "./utils/history";
import { ConnectedRouter } from "connected-react-router";

// import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config";
import { ErrorBoundary } from "./utils/ErrorBoundary";

// import HttpsRedirect from "react-https-redirect";

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

const siteUrl = `http://www.poker-range-appalyzer.com`;

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  history.push(appState && siteUrl ? siteUrl : window.location.pathname);
};

ReactDOM.render(
  <ErrorBoundary>
    {/* <HttpsRedirect> */}
    {/* <Auth0Provider
      domain="dev-824eb3ar.us.auth0.com"
      clientId="NTS7ZtvzLweGZjLhYDlhj9PsN44FDFel"
      redirectUri="https://www.poker-range-appalyzer.com"
      audience="https://dev-824eb3ar.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    > */}
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={App} />
      </Router>
    </Provider>
    {/* </Auth0Provider> */}
    {/* </HttpsRedirect> */}
  </ErrorBoundary>, //{" "},
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
