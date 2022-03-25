import '../App.css';
import React, {useEffect, useState} from 'react'

const BASE_URL = 'http://localhost:4567/'

function Board(){

  const [gridData, setGridData] = useState([])

  useEffect(()=> {
    async function fetchData(){
     await fetch(BASE_URL+'grid')
      .then(response => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json()})
      .then(data => { 
        console.log('GRID data:', data)
        setGridData(data.grid)
      }).catch((error) => console.error("Error getting data:", error))
    }
    fetchData()
  }, [])

  console.log('stateData', gridData)

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