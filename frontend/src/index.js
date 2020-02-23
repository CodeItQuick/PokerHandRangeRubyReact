import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import handRangesAvailable from './reducers/HandRanges';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(combineReducers({rootReducer, handRangesAvailable}), applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
