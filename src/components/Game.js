import '../App.css';
import React, {useEffect, useState, useRef} from 'react'
import Board from './Board'

const BASE_URL = 'http://localhost:4567/'

function Game() {

    const [message, setMessage] = useState('')
  useEffect(()=> {
    async function fetchData(){
     await fetch(BASE_URL)
      .then(response => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json()})
      .then(data => { 
        console.log('Message data:', data)
        setMessage(data.message)
      }).catch((error) => console.error("Error getting data:", error))
    }
    fetchData()
  }, [])

  return (
      <>
      <header className="App-header">    
        <p>
        {message}
        </p>
      </header>
      <button className="start-btn">Start</button>
      <Board/>
      </>
  );
}

export default Game;