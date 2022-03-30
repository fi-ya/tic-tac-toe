import '../App.css';
import React, {useEffect, useState, useRef} from 'react'
import Board from './Board'
import ReplayOrQuit from './ReplayOrQuit';

const BASE_URL = 'http://localhost:4567'

function Game() {

    const [game, setNewGame] = useState(false)
    const [gridData, setGridData] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState('')
    const [gameStatus, setGameStatus] = useState('Keep playing')
    
    useEffect(()=> {
        fetchGridData()
    }, [])
    
    const fetchGridData = async () => {
        await fetch(BASE_URL, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4567'
            }
        })
          .then(response => {
            console.log(response);
            if (!response.ok) throw new Error(response.status);
            return response.json()})
          .then(data => { 
            console.log('GRID data:', data)
            setGridData(data.grid)
          }).catch((error) => console.error("Error getting data:", error))
    }
    
    const startGame = async ()=> {
        await fetch(BASE_URL+'/start-game', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:4567'
            }
        })
         .then(response => {
           console.log(response);
           if (!response.ok) throw new Error(response.status);
           return response.json()})
         .then(data => { 
           console.log('START GAME:',data)
           setNewGame(true)
           setCurrentPlayer(data.current_player)
         }).catch((error) => console.error("Error getting data:", error))
    }

    const addPlayerMarker = async(currentPlayer, playerMove) => {
        const res = await fetch(BASE_URL+`/start-game/grid`, {
          method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4567'
            },
            body: JSON.stringify([currentPlayer, playerMove]),
        }).then(response => {
          console.log("RESPONSE player move",response);
          if (!response.ok) throw new Error(response.status);
          return response.json()})
        .then(data => { 
          console.log("DATA player move:", data)
          setCurrentPlayer(data.current_player)
          setGridData(data.grid)
          setGameStatus(data.game_status)
        }).catch((error) => console.error("Error getting data:", error))
      }

    console.log('END gridData:', gridData)
    console.log('END game:', game)
    console.log('END currentPlayer:', currentPlayer)
    console.log('END gameStatus:', gameStatus)

  return (
    <>
    {game ? (<>

        {gameStatus == "Keep playing" ?(
            <>
            <h2>Player {currentPlayer} turn</h2>
            <p>Click on the square you want to place your move</p>
            </>
            ) : 
            gameStatus == "Tie" ? (
                <>
                <h2>Game over!! It's a tie!!!</h2>
                <ReplayOrQuit/>
                </>
                ) :
                (
                    <>
                    <h2>Congratulations ??? won!!!</h2>
                    <ReplayOrQuit/>
                    </>
                    )
                }
        <Board gridData={gridData} currentPlayer={currentPlayer} addPlayerMarker={addPlayerMarker}/>
        </>)
        :
        (<>
        <button type="submit" id="start" className="btn" onClick={startGame}>Start</button>
        <Board gridData={gridData}/>
        </>)
    }
    </>


  );
}

export default Game;