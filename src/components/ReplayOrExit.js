import React from 'react'

const ReplayOrExit = ({handleReplayGame,handleGameExit, exitGame}) => {
  console.log('EXIT GAME STATE:', exitGame)
  
  return (

    <>
    {exitGame ? (<><h1>Thank you for playing! Goodbye!</h1></>) 
    : (<> <div className='flex-gap'>
    <button className='btn' onClick={handleReplayGame}>Replay</button>
    <button className='btn'onClick={handleGameExit}>Quit</button>
  </div></>)
  }
   </>
  )
}

export default ReplayOrExit