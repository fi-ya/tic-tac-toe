import '../App.css';
import React, {useEffect, useState} from 'react'

const BASE_URL = 'http://localhost:4567/'

function Board({gridData, addPlayerMarker}){
    const [grid, updateGrid] = useState('')

    const setPlayerMarker = (e) => {
        console.log("playerMove:",e.target.innerHTML)
        let playerMove = e.target.innerHTML
        addPlayerMarker(playerMove)
    }

    return(
    <section className="board-container">
      <div className="grid-container">
        <button className="grid-item" onClick={setPlayerMarker}>{gridData[0]}</button>
        <button className="grid-item">{gridData[1]}</button>
        <button className="grid-item">{gridData[2]}</button>
        <button className="grid-item">{gridData[3]}</button>
        <button className="grid-item">{gridData[4]}</button>
        <button className="grid-item">{gridData[5]}</button>
        <button className="grid-item">{gridData[6]}</button>
        <button className="grid-item">{gridData[7]}</button>
        <button className="grid-item">{gridData[8]}</button>
      </div>
    </section>
    )
}

export default Board;