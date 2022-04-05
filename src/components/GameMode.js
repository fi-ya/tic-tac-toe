import React, {useState} from 'react'
import Game from './Game'

const BASE_URL = 'http://localhost:4567'

function GameMode({startGame, setGameMode}){

  const handleGameModeChoice = (e) => {
   
    let gameModeChoice = e.target.value
    setGameMode(gameModeChoice)
    startGame(gameModeChoice)

  }

  // const addGameMode = async (gameModeChoice) => {
  //   await fetch(BASE_URL + `/start-game/${gameModeChoice}`, {
  //     method: 'GET',
  //     headers: {
  //       'Access-Control-Allow-Origin': 'http://localhost:4567'
  //     }
  //   }).then(response => {
  //     if (!response.ok) throw new Error(response.status);
  //       return response.json()
  //   }).then(data => {
  //     console.log('game mode data:', data)
  //     // setGameMode()
  //   }).catch((error) => console.error('Error getting data for addGameMode:', error))
  // }

  return(
    <section>
      <h1> Select game mode</h1>
      <div className='flex-gap'>
        <button type="submit" id="human_human" value={1} className='btn game_mode' onClick={handleGameModeChoice}>Human vs Human</button>
        <button type="submit" id="computer_human" value={2} className='btn game_mode'
        onClick={handleGameModeChoice}>Computer vs Human</button>
      </div>
    </section>
  )
}

export default GameMode