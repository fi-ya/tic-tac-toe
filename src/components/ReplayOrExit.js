import React from 'react'

function ReplayOrExit({ handleReplayGame, handleGameExit, exitGame }) {
  return (
    <>
      {exitGame ? (
        <div>
          <h1>Thank you for playing! Goodbye!</h1>
        </div>
      ) : (
        <div className="flex-gap">
          <button className="btn" onClick={handleReplayGame}>
            Replay
          </button>
          <button className="btn" onClick={handleGameExit}>
            Quit
          </button>
        </div>
      )}
    </>
  )
}

export default ReplayOrExit
