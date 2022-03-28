import './App.css';
import React , {useEffect, useState, useRef}from 'react'
import Game from './components/Game'
import GameMode from './components/GameMode'

const BASE_URL = 'http://localhost:4567/'

function App() {

  

  const addPlayerOne = async (playerOne) =>{
    const res = await fetch(BASE_URL+`game-mode`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4567'
        },
        body: JSON.stringify(playerOne),
      }).then(response => {
        console.log("RESPONSE",response);
        if (!response.ok) throw new Error(response.status);
        return response.json()})
      .then(data => { 
        console.log("DATA:",JSON.parse(data.mode))
       
      }).catch((error) => console.error("Error getting data:", error))
}

  return (
    <div className="App">
      <header className="App-header">    
        <h1>
        Let's play Tic Tac Toe!
        </h1>
      </header>
      <Game/>
      {/* <GameMode addPlayerOne={addPlayerOne}/> */}
    </div>
  );
}

export default App;
