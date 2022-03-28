import '../App.css';
import React, {useEffect, useState, useRef} from 'react'
import Board from './Board'

const BASE_URL = 'http://localhost:4567/'

function Game() {

  function handleClick(e){
      e.preventDefault();
    async function postData(){
        await fetch(BASE_URL+'start-game', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
        body:JSON.stringify(
            {
                // 
            }
        ),            
        })
         .then(response => {
           console.log(response);
           if (!response.ok) throw new Error(response.status);
           return response.json()})
         .then(data => { 
           console.log('success',data)
         }).catch((error) => console.error("Error getting data:", error))
       }
       postData()
  }

  return (
      <>
      <p>Player X turn </p>
      <Board/>
      </>
  );
}

export default Game;