import React from 'react'

function GameMode({startGame, setGameMode}){

  const handleGameModeChoice = (e) => {
    let gameModeChoice = e.target.value
    setGameMode(gameModeChoice)
    startGame(gameModeChoice)
  }

  return(
    <section >
      <h1> Select game mode</h1>
      <div className='flex-gap' id='game-mode-options'>
        <button type="submit" id="human_human" value={1} className='btn game_mode' onClick={handleGameModeChoice}>Human vs Human</button>
        <button type="submit" id="computer_human" value={2} className='btn game_mode'
        onClick={handleGameModeChoice}>Computer vs Human</button>
      </div>
    </section>
  )
}

export default GameMode