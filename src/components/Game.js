import '../App.css';
import React, {useEffect, useState, useRef} from 'react'
import Board from './Board'

const BASE_URL = 'http://localhost:4567'

function Game() {

    const [game, setNewGame] = useState(false)
    const [gridData, setGridData] = useState([])
    
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
 
    console.log('stateData', gridData)
    console.log('game', game)

  return (
    <>
    {game ? (<>
        <h2>Player X turn</h2>
        <p>Click on the square you want to place your move</p>
        <Board gridData={gridData}/>
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