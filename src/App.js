import './App.css';
import React, {useEffect, useState, useRef} from 'react'
import Game from './components/Game'

// const BASE_URL = 'http://localhost:4567/'

function App() {
  // const [grid, setGrid] = useState([])
  // let gridNumber = useRef([])

  // useEffect(()=> {
  //   async function fetchData(){
  //    await fetch(BASE_URL)
  //     .then(response => {
  //       console.log(response);
  //       if (!response.ok) throw new Error(response.status);
  //       return response.json()})
  //     .then(data => { 
  //       console.log('data:', data)
  //       // setGrid(data)
  //       let gridData = data.grid
  //       gridNumber.current = gridData
  //       console.log("gridNumber", gridNumber.current[0])
  //     }).catch((error) => console.error("Error getting data:", error))
  //   }
  //   fetchData()
  //   // setGrid(result.data)
  // }, [])

  // console.log('stateData', grid)
  return (
    <div className="App">
      <Game/>
    </div>
  );
}

export default App;
