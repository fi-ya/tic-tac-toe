import './App.css';
import React from 'react'
import Game from './components/Game'

function App() {

  return (
    <div className="App">
      <header className="App-header">    
        <h1>
        Let's play Tic Tac Toe!
        </h1>
      </header>
      <Game/>
    </div>
  );
}

export default App;
