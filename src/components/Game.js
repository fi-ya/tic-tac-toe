import '../App.css';
import React, { useState } from 'react'
import Board from './Board'
import ReplayOrExit from './ReplayOrExit';
import GameMode from './GameMode';
import BASE_URL from '../config';

function Game() {

  const [game, setNewGame] = useState(false)
  const [gridData, setGridData] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState('')
  const [currentPlayerMarker, setCurrentPlayerMarker] = useState('')
  const [gameStatus, setGameStatus] = useState('Keep playing')
  const [winner, setWinner] = useState('')
  const [exitGame, setExitGame] = useState(false)
  const [invalidMove, setInvalidMove] = useState(false)
  const [gameMode, setGameMode] = useState(null);

  const startGame = async (gameModeChoice) => {
    return await fetch(BASE_URL + `/start-game/${gameModeChoice}`, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4567'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        return response.json()
      })
      .then(data => {
        console.log('start game data:', data)
        let gridArray = JSON.parse(data.new_grid)
        setCurrentPlayer(data.reset_current_player1_name)
        setNewGame(true)
        setCurrentPlayerMarker(data.reset_current_player_marker)
        setGridData(gridArray)
      })
      .catch((error) => console.error("Error getting data for startGame:", error))
  }

  const addPlayerMarker = async (gridData, currentPlayerMarker, playerMove) => {
    return await fetch(BASE_URL + `/start-game/grid`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4567'
      },
      body: JSON.stringify([gridData, currentPlayerMarker, playerMove]),
    }).then(response => {
      if (!response.ok) throw new Error(response.status);
      return response.json()
    })
      .then(data => {

        setInvalidMove(false)

        if (data.updated_grid === "Invalid move. Try again") {
          setInvalidMove(true)
        } else {
          let updatedGridArray = JSON.parse(data.updated_grid)
          setGridData(updatedGridArray)
          setCurrentPlayerMarker(data.current_player_marker)
          setGameStatus(data.game_status)
          
          if (data.game_status === "Won"){
            setWinner(data.winner)
          }
        }
      })
      .catch((error) => console.error("Error getting data for addPlayerMarker:", error))
  }

  const handleGameExit = () => {
    setExitGame(true)
  }

  const handleReplayGame = async () => {
    setGameMode(null)
    setNewGame(true)
    setGameStatus("Keep playing")
  }

  console.log('currentPlayer:', currentPlayer)
  return (
    <main>
      {gameMode === null ? ((
                  <section>
                     <GameMode startGame={startGame} setGameMode={setGameMode}/>
                  </section>
                )) : (
          game && gameStatus === "Keep playing" ? (
              <section>
                <h2>Player {currentPlayerMarker} turn</h2>
                <p>Click on the square you want to place your move</p>
                <Board 
                  gridData={gridData} 
                  currentPlayerMarker={currentPlayerMarker} 
                  addPlayerMarker={addPlayerMarker} />
              </section>
          )
          : game && gameStatus === "Tie" ? (
              <section>
                <h2>Game over!! It's a tie!!!</h2>
                <ReplayOrExit
                  handleReplayGame={handleReplayGame}
                  handleGameExit={handleGameExit}
                  exitGame={exitGame} />
              </section>
            )
              : game && gameStatus === "Won" ? (
                  <section>
                    <h2>Congratulations {winner} won!!!</h2>
                    <ReplayOrExit
                      handleReplayGame={handleReplayGame}
                      startGame={startGame}
                      handleGameExit={handleGameExit}
                      exitGame={exitGame} />
                  </section>
                )
              : (
                  <section>
                     <GameMode startGame={startGame} setGameMode={setGameMode}/>
                  </section>
                )
      )}
      { invalidMove? (
          <div className="error-msg">
            <h1 className="padding-sm">Invalid move. Try again!</h1>
          </div>) 
       : (null)
      }         
    </main>
  );
}

export default Game;