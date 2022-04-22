import React from 'react'

function GameMode({ startGame }) {
  const handleGameModeChoice = (e) => {
    let gameModeChoice = e.target.value
    startGame(gameModeChoice)
  }

  return (
    <section className="game-mode-container">
      <h1 className="font-size_med margin_sm">How to play</h1>
      <div className="instruction-container">
        <p>
          First pick who you would like to play against, another human or a
          computer. Each player take turns in placing their marker on the board
          with `X` playing first. The first player to get 3 of their marks in a
          row (up, down, across, or diagonally) is the winner. When all 9
          squares are full, the game is over. If no player has 3 marks in a row,
          the game ends in a tie.
        </p>
      </div>
      <h1 className="font-size_med margin_sm">Select game mode</h1>
      <div className="flex-gap" id="game-mode-options">
        {
          <button
            type="submit"
            name="human_human"
            value={1}
            className="btn game_mode"
            onClick={handleGameModeChoice}
          >
            Human vs Human
          </button>
        }
        <button
          type="submit"
          name="computer_human"
          value={2}
          className="btn game_mode"
          onClick={handleGameModeChoice}
        >
          Computer vs Human
        </button>
      </div>
    </section>
  )
}

export default GameMode
