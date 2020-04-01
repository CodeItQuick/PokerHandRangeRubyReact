import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import handRangesAvailable from "./reducers/HandRanges";
import "bootstrap/dist/css/bootstrap.min.css";

import throttle from "lodash/throttle";
import history from "./utils/history";
import { saveState } from "./localStorage";
import configureStore from "./configureStore";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "styled-components";

//const store = createStore(combineReducers({rootReducer, handRangesAvailable}), applyMiddleware(thunk));
// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("app");

store.subscribe(
  throttle(() => {
    const { global, user, order } = store.getState();
    saveState({ global, user, order });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={{ main: "mediumseagreen" }}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
