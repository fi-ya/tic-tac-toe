import '../App.css';
import React, {useEffect, useState, useRef} from 'react'
import Board from './Board'

const BASE_URL = 'http://localhost:4567/'

function Game() {
  const [gridData, setGridData] = useState([])
  let gridNumber = useRef([])

  useEffect(()=> {
    async function fetchData(){
     await fetch(BASE_URL+ 'grid')
      .then(response => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json()})
      .then(data => { 
        console.log('data:', data)
        // setGridData(data)
        let gridData = data.grid
        gridNumber.current = gridData
        console.log("gridNumber", gridNumber.current[0])
      }).catch((error) => console.error("Error getting data:", error))
    }
    fetchData()
  }, [])

  console.log('stateData', gridData)
  return (
      <>
      <header className="App-header">    
        <p>
          Lets's play
        </p>
        <a
          className="App-link"
          href="https://en.wikipedia.org/wiki/Tic-tac-toe"
          target="_blank"
          rel="noopener noreferrer"
        >
          TIC TAC TOE
        </a>
      </header>
      <button className="start-btn">Start</button>
      <Board gridNumber={gridNumber.current} />
      {/* <Board gridData={gridData} /> */}
      </>
  );
}

export default Game;