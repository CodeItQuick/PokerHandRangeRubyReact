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
    <div className="App">
      <header className="App-header" >
        <UserRegister></UserRegister>
        <MainPage></MainPage>
        <UserLogin></UserLogin>
        <StripeProvider {...{stripe}}>
          <Elements>
            <StripeHookProvider>
              <MyForm stripe={stripe} />
            </StripeHookProvider>
            
          </Elements>
        </StripeProvider>
      </header>
    </div>
  );
}

export default App;
