import '../App.css'
import React from 'react'

function Board({ gridData, currentPlayerMarker, addPlayerMarker }) {
  console.log(gridData, "board")
  const setPlayerMarker = (e) => {
    let playerMove = [e.target.innerHTML, e.target.value]
    addPlayerMarker(gridData, currentPlayerMarker, playerMove)
  }

  return (
    <section className="board-container">
      <div className="grid-container">
        {gridData.map((item, i) => (
          <button
            key={i}
            className="grid-item"
            onClick={setPlayerMarker}
            value={i}
            data-testid={`board-btn-element${i + 1}`}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Board
