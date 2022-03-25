import '../App.css';
import React, {useEffect, useState, useRef} from 'react'

const BASE_URL = 'http://localhost:4567/'

function Board(props){

    // console.log('Grid:', props.gridData.grid)
    console.log('Grid:', props.gridNumber[1])
    
    const [gridData, setGridData] = useState([])
  let gridNumber = useRef([])

  useEffect(()=> {
    async function fetchData(){
     await fetch(BASE_URL+'grid')
      .then(response => {
        console.log(response);
        if (!response.ok) throw new Error(response.status);
        return response.json()})
      .then(data => { 
        console.log('data:', data)
        // setGridData(data)
        let gridData = data.grid
        gridNumber.current = gridData
        console.log("gridNumber", gridNumber.current[0])
      }).catch((error) => console.error("Error getting data:", error))
    }
    fetchData()
  }, [])

  console.log('stateData', gridData)


    return(
    <section className="board-container">
      <div className="grid-container">
        <button className="grid-item" 
        // onClick={handleUpdateGrid} 
        >{props.gridNumber[0]}</button>
        <button className="grid-item">{props.gridNumber[1]}</button>
        <button className="grid-item">{props.gridNumber[2]}</button>
        <button className="grid-item">{props.gridNumber[3]}</button>
        <button className="grid-item">{props.gridNumber[4]}</button>
        <button className="grid-item">{props.gridNumber[5]}</button>
        <button className="grid-item">{props.gridNumber[6]}</button>
        <button className="grid-item">{props.gridNumber[7]}</button>
        <button className="grid-item">{props.gridNumber[8]}</button>
      </div>
    </section>
    )
}

export default Board;