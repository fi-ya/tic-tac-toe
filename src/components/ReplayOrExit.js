import React from 'react'

const ReplayOrExit = ({startGame, handleGameExit, exitGame}) => {
  console.log('EXIT GAME STATE:', exitGame)

  
  return (

    <>
    {/* <div className='flex-gap'>
      <button className='btn' onClick={startGame}>Replay</button>
      <button className='btn'onClick={handleGameExit}>Quit</button>
    </div> */}

    {exitGame ? (<><h1>Thank you for playing! Goodbye!</h1></>) 
    : (<> <div className='flex-gap'>
    <button className='btn' onClick={startGame}>Replay</button>
    <button className='btn'onClick={handleGameExit}>Quit</button>
  </div></>)
  }
   </>
  )
}

export default ReplayOrExit