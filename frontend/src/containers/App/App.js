import React, {useEffect, useState, useRef} from 'react';
import logo from '../../logo.svg';
import './App.css';
import Board from '../../components/board/board';
import MainPage from '../MainPage/index';
import UserLogin from '../UserLogin/UserLogin';
import UserRegister from '../UserRegister/UserRegister';
import {useStripe} from '../../HOC/useStripe/useStripe';
import {StripeProvider, Elements} from 'react-stripe-elements';
import MyForm from '../MyForm/MyForm';
import useRequest1API from '../../HOC/API/useRequest1';
import StripeHookProvider from '../../HOC/useStripe/StripeHookProvider';
import {BrowserRouter, Route, NavLink} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function App() {
  const [stripe, setStripe] = useState(null);

  
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe("pk_test_3QHFTQccclvodS2QXldeAkSh00qBGSooM3"));
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        setStripe(window.Stripe("pk_test_3QHFTQccclvodS2QXldeAkSh00qBGSooM3"));
      });
    }
  }, []);

  

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header" >
          <Menu inverted>
            <Menu.Item><NavLink to="/">Home</NavLink></Menu.Item>
            <Menu.Item><NavLink to="/register">Register</NavLink></Menu.Item>
            <Menu.Item><NavLink to="/login">Login</NavLink></Menu.Item>
            <Menu.Item><NavLink to="/donate">Donate</NavLink></Menu.Item>
          </Menu>
          <Route path="/register" exact component={UserRegister} />
          <Route path="/login" exact component={UserLogin} />
          <Route path="/donate" exact render={() => {
            return (<StripeProvider {...{stripe}}>
              <Elements>
                <StripeHookProvider>
                  <MyForm stripe={stripe} />
                </StripeHookProvider>
              </Elements>
            </StripeProvider>);
          }} />
          <Route path="/" exact component={MainPage} />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
