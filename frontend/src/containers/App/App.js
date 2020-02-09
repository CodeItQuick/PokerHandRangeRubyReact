import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Board from '../../components/board/board';
import MainPage from '../MainPage/index';
import UserLogin from '../UserLogin/UserLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainPage></MainPage>
        <UserLogin></UserLogin>
      </header>
    </div>
  );
}

export default App;
