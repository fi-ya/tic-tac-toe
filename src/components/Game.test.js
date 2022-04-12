import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Game from './Game'
import GameMode from './GameMode'


// beforeAll(()=>{
//   render(<GameMode/>);
// })

const mockSetGameMode = jest.fn((mode)=>{
  return mode
});
const mockStartGame = jest.fn((mode) => {
  // const mockFetchNewGame = jest.fn((mode)=> { 
    // return data from mockApiCall
    return mode
  });
    // return setNewGame(true)
    // return mockFetchNewGame
// });

describe ('Game', () =>{
  
  it('should render a paragraph containing instructions ',() =>{
    render(<GameMode setGameMode={mockSetGameMode} startGame={mockStartGame}/>);
    const humanVsHumanBtnElement = screen.getByRole('button', {  name: /human vs human/i});
    const gameMode = humanVsHumanBtnElement.value
    
    fireEvent.click(humanVsHumanBtnElement);
    mockSetGameMode(gameMode);
    mockStartGame(gameMode)
    console.log('what is this oing', mockStartGame(gameMode))

    // const gameInstruction = screen.getByRole("paragraph", { name: /click on the square you want to place your move/i})
    // expect(gameInstruction).toBeInTheDocument()
   
  })
 
})