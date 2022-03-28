import React, { useState, useEffect } from 'react'

const BASE_URL = 'http://localhost:4567/'

const GameMode = ({addPlayerOne}) => {

    const [playerOne, setPlayerOne] = useState(1)

    const handleSubmit = (e) => {
        console.log('e', e)
        e.preventDefault()
        console.log('playerOneinside ', playerOne)
        addPlayerOne(playerOne)
    }
  
  return (
    <div>
        <h1>Select a game</h1>
        <form onSubmit={handleSubmit} className='game-mode-form'>
        <button type='submit' 
        onClick={(e)=>setPlayerOne(e.target.value)} 
        value='1'>Human vs Human</button>
        <button type='submit' 
        onClick={(e)=>setPlayerOne(e.target.value)}
        value='2'>Computer vs Human</button>
        </form>
    </div>


  )
}

export default GameMode