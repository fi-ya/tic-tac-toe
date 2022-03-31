import '../App.css';
import React, {useState} from 'react'
import Board from './Board'
import ReplayOrExit from './ReplayOrExit';

const BASE_URL = 'http://localhost:4567'

function Game() {

    const [game, setNewGame] = useState(false)
    const [gridData, setGridData] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState('')
    const [currentPlayerMarker, setCurrentPlayerMarker] = useState('')
    const [gameStatus, setGameStatus] = useState('Keep playing')
    const [winner, setWinner] = useState('')
    const [exitGame, setExitGame] = useState(false)
  
    const startGame = async ()=> {
        await fetch(BASE_URL+'/start-game', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4567'
            }
        })
         .then(response => {
           console.log("RESPONSE startGame:",response);
           if (!response.ok) throw new Error(response.status);
           return response.json()
        })
         .then(data => { 
        console.log("GET DATA startGame:",data)
           let gridArray = JSON.parse(data.new_grid)
           setNewGame(true)
           setCurrentPlayer(data.reset_current_player)
           setCurrentPlayerMarker(data.reset_current_player_marker)
           setGridData(gridArray)
         })
         .catch((error) => console.error("Error getting data:", error))
    }

    const addPlayerMarker = async(gridData, currentPlayerMarker, playerMove) => {
        await fetch(BASE_URL+`/start-game/grid`, {
          method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4567'
            },
            body: JSON.stringify([gridData, currentPlayerMarker, playerMove]),
        }).then(response => {
          console.log("PUT RESPONSE addPlayerMarker",response);
          if (!response.ok) throw new Error(response.status);
          return response.json()})
        .then(data => { 
          console.log("PUT DATA addPlayerMarker:", data)
          let updatedGridArray = JSON.parse(data.updated_grid)
          setCurrentPlayerMarker(data.current_player_marker)
          setGridData(updatedGridArray) 
          setGameStatus(data.game_status)
          setWinner(data.winner)
        })
        .catch((error) => console.error("Error getting data:", error))
      }

    const handleGameExit =  () => {
    setExitGame(true)
    }

    const handleReplayGame =  async () => {
        await fetch(BASE_URL+'/start-game', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4567'
            }
        })
            .then(response => {
            console.log("RESPONSE startGame:",response);
            if (!response.ok) throw new Error(response.status);
            return response.json()
        })
            .then(data => { 
        console.log("GET DATA startGame:",data)
            let gridArray = JSON.parse(data.new_grid)
            setNewGame(true)
            setGameStatus("Keep playing")
            setCurrentPlayer(data.reset_current_player)
            setCurrentPlayerMarker(data.reset_current_player_marker)
            setGridData(gridArray)
            })
            .catch((error) => console.error("Error getting data:", error))
    }

    console.log('END gridData:', gridData)
    console.log('TYPEOF gridData:', typeof(gridData[0]))
    console.log('END game:', game)
    console.log('END currentPlayer:', currentPlayer)
    console.log('END gameStatus:', gameStatus)
    console.log('END winner:', winner)

  return (
    <>
    {game && gameStatus == "Keep playing" ? (
        <>
            <h2>Player {currentPlayerMarker} turn</h2>
            <p>Click on the square you want to place your move</p>
            <Board gridData={gridData} currentPlayerMarker={currentPlayerMarker} addPlayerMarker={addPlayerMarker}/>
        </>
        )
        : game && gameStatus == "Tie" ? (
            <>
            <h2>Game over!! It's a tie!!!</h2>
            <ReplayOrExit 
            handleReplayGame={handleReplayGame}
            handleGameExit={handleGameExit} 
            exitGame={exitGame}/>
            </>
        )
        : game && gameStatus == "Won" ?(
            <>
            <h2>Congratulations {winner} won!!!</h2>
            <ReplayOrExit 
            handleReplayGame={handleReplayGame}
            startGame={startGame} 
            handleGameExit={handleGameExit} 
            exitGame={exitGame} />
            </>
            )
        :(
            <>
            <button type="submit" id="start" className="btn" onClick={startGame}>Start</button>
            </>)
    }
    </>


  );
}

export default Game;