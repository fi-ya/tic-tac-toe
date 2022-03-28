import '../App.css';
import React, {useEffect, useState, useRef} from 'react'
import Board from './Board'

const BASE_URL = 'http://localhost:4567'

function Game() {

    const [game, setNewGame] = useState(false)
    const [gridData, setGridData] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState('X')
    
    useEffect(()=> {
        fetchGridData()
    }, [])
    
    const fetchGridData = async () => {
        await fetch(BASE_URL)
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
        await fetch(BASE_URL+'/start-game')
         .then(response => {
           console.log(response);
           if (!response.ok) throw new Error(response.status);
           return response.json()})
         .then(data => { 
           console.log('START GAME:',data)
           setNewGame(true)
         }).catch((error) => console.error("Error getting data:", error))
    }
 
    const addPlayerMarker = async(playerMove) => {
        const res = await fetch(BASE_URL+`/grid/:#{playerMove}`, {
          method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4567'
            },
            body: JSON.stringify(playerMove),
        }).then(response => {
          console.log("RESPONSE player move",response);
          if (!response.ok) throw new Error(response.status);
          return response.json()})
        .then(data => { 
          console.log("DATA player move:", data)
          setCurrentPlayer(data.current_player)
          setGridData(data.grid)
         
        }).catch((error) => console.error("Error getting data:", error))
      }

    console.log('stateData', gridData)
    console.log('game', game)

  return (
    <>
    {game ? (<>
        <h2>Player {currentPlayer} turn</h2>
        <p>Click on the square you want to place your move</p>
        <Board gridData={gridData} addPlayerMarker={addPlayerMarker}/>
        </>)
        :
        (<>
        <button type="submit" id="start" className="start-btn" onClick={startGame}>Start</button>
        <Board gridData={gridData}/>
        </>)
    }
    </>


  );
}

export default Game;