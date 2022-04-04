import '../App.css';
import React from 'react'

function Board({ gridData, currentPlayerMarker, addPlayerMarker }) {

  const setPlayerMarker = (e) => {
    let playerMove = e.target.innerHTML
    addPlayerMarker(gridData, currentPlayerMarker, playerMove)
  }

  return (
    <section className="board-container">
      <div className="grid-container">
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[0]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[1]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[2]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[3]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[4]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[5]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[6]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[7]}</button>
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[8]}</button>
      </div>
    </section>
  )
}

export default Board;