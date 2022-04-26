import '../App.css'
import React, { useState } from 'react'
import Board from './Board'
import ReplayOrExit from './ReplayOrExit'
import GameMode from './GameMode'
import BASE_URL from '../config'
import { fetchNewGame, updateGameData, fetchComputerMove } from '../fetch'

function Game() {
  const [game, setNewGame] = useState(false)
  const [gridData, setGridData] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState('')
  const [currentPlayerMarker, setCurrentPlayerMarker] = useState('')
  const [gameStatus, setGameStatus] = useState('Keep playing')
  const [winner, setWinner] = useState('')
  const [exitGame, setExitGame] = useState(false)
  const [invalidMove, setInvalidMove] = useState(false)
  const [gameMode, setGameMode] = useState(null)

  async function startGame(gameModeChoice) {
    setGameMode(gameModeChoice)
    const url = BASE_URL + `/start-game/${gameModeChoice}`

    return await fetchNewGame(url)
      .then((data) => {
        let gridArray = JSON.parse(data.new_grid)
        setCurrentPlayer(data.player1_name)
        setNewGame(true)
        setCurrentPlayerMarker(data.player1_marker)
        setGridData(gridArray)
        setTimeout(() => {
          handleComputerMove(
            data.player1_name,
            data.new_grid,
            data.player1_marker,
          )
        }, 1000)
      })
      .catch((error) =>
        console.error('Error getting data for startGame:', error),
      )
  }

  async function getComputerMove(grid, currentPlayerMarker) {
    const url = BASE_URL + `/start-game/computer_move`

    return await fetchComputerMove(url, grid, currentPlayerMarker)
      .then((data) => {
        setTimeout(() => {
          handleUpdateGame(
            data.updated_grid,
            data.current_player_marker,
            data.game_status,
            data.current_player_name,
            data.winner,
          )
        }, 1000)
      })
      .catch((error) =>
        console.error('Error getting data for getComputerMove:', error),
      )
  }

  async function addPlayerMarker(gridData, currentPlayerMarker, playerMove) {
    const url = BASE_URL + `/start-game/grid`
    setInvalidMove(false)
    return await updateGameData(url, gridData, currentPlayerMarker, playerMove)
      .then((data) => {
        console.log('invalidMove before fetch', invalidMove)
        console.log("APP MARK DAYAE", data)
        if (data.invalid_move) {
          // console.log('invalidMove before', invalidMove)
          setInvalidMove(true)
          // console.log('invalidMove after', invalidMove)
        } else {
          handleUpdateGame(
            data.updated_grid,
            data.current_player_marker,
            data.game_status,
            data.current_player_name,
            data.winner,
            data.invalid_move
          )
          handleComputerMove(
            data.current_player_name,
            data.updated_grid,
            data.current_player_marker,
          )
        }
      })
      .catch((error) =>
        console.error('Error getting data for addPlayerMarker:', error),
      )
  }

  const handleUpdateGame = (
    updatedGrid,
    currentPlayerMarker,
    gameStatus,
    currentPlayerName,
    winner,
    invalidMoveStatus
  ) => {
    let updatedGridArray = JSON.parse(updatedGrid)
    setGridData(updatedGridArray)
    setCurrentPlayerMarker(currentPlayerMarker)
    setTimeout(() => {
      setGameStatus(gameStatus)
    }, 1000)
    setCurrentPlayer(currentPlayerName)
    setInvalidMove(invalidMoveStatus)

    handleWinningGame(gameStatus, winner)
  }

  const handleComputerMove = (currentPlayerName, grid, currentPlayerMarker) => {
    if (currentPlayerName === 'Computer') {
      getComputerMove(grid, currentPlayerMarker)
    }
  }

  const handleWinningGame = (gameStatus, winner) => {
    if (gameStatus === 'Won') {
      setWinner(winner)
      setCurrentPlayer('')
    }
  }

  const handleGameExit = () => {
    setExitGame(true)
  }

  const handleReplayGame = () => {
    setGameMode(null)
    setNewGame(true)
    setGameStatus('Keep playing')
    setCurrentPlayer('')
  }

  return (
    <main>
      {gameMode === null ? (
        <section>
          <GameMode startGame={startGame} />
        </section>
      ) : game && gameStatus === 'Keep playing' ? (
        <section>
          <h2 className='font-size_med'>Player {currentPlayerMarker} turn</h2>
          <p className='font-size_sm'>Click on the square you want to place your move</p>
          <Board
            gridData={gridData}
            currentPlayerMarker={currentPlayerMarker}
            addPlayerMarker={addPlayerMarker}
          />
        </section>
      ) : game && gameStatus === 'Tie' ? (
        <section>
          <h2 className='font-size_med blue-font'>Game over!! It's a tie!!!</h2>
          <ReplayOrExit
            handleReplayGame={handleReplayGame}
            handleGameExit={handleGameExit}
            exitGame={exitGame}
          />
        </section>
      ) : game && gameStatus === 'Won' ? (
        <section>
          <h2 className='font-size_med red-font'>Congratulations {winner} won!!!</h2>
          <ReplayOrExit
            handleReplayGame={handleReplayGame}
            handleGameExit={handleGameExit}
            exitGame={exitGame}
          />
        </section>
      ) : (
        <section>
          <GameMode startGame={startGame} />
        </section>
      )}
      {invalidMove ? (
        <div className="alert-msg red-bkgd">
          <h1 className="padding-sm">Invalid move. Try again!</h1>
        </div>
      ) : null}
      {currentPlayer === 'Computer' ? (
        <div className="alert-msg blue-bkgd">
          <h1 className="padding-sm">Computer thinking...</h1>
        </div>
      ) : null}
    </main>
  )
}

export default Game
