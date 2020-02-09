import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Board from '../../components/board/board';
import MainPage from '../MainPage/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainPage></MainPage>
      </header>
    </div>
  );
}

export default App;
