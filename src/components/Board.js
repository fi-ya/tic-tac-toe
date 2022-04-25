import '../App.css'
import React from 'react'

function Board({ gridData, currentPlayerMarker, addPlayerMarker }) {
 
  const setPlayerMarker = (e) => {
    let playerMove = [e.target.innerHTML, e.target.value]
    addPlayerMarker(gridData, currentPlayerMarker, playerMove)
  }

  return (
    <section className="board-container">
      <div className="grid-container">
        {gridData.map((item, i) => (
          <button key={i} className="grid-item" onClick={setPlayerMarker} value={i}>
            {item}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Board
