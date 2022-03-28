import '../App.css';
import React, {useEffect, useState} from 'react'

const BASE_URL = 'http://localhost:4567/'

function Board({gridData}){


    return(
    <section className="board-container">
      <div className="grid-container">
        <button className="grid-item">{gridData[0]}</button>
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