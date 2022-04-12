import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Game from './Game'
import GameMode from './GameMode'

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
  
  xit('should render a paragraph containing instructions ', async() =>{
    render(<GameMode setGameMode={mockSetGameMode} startGame={mockStartGame}/>);
    const humanVsHumanBtnElement = screen.getByRole('button', {  name: /human vs human/i});
    const gameMode = humanVsHumanBtnElement.value
    
    fireEvent.click(humanVsHumanBtnElement);
    mockSetGameMode(gameMode);
    mockStartGame(gameMode)

    const gameInstruction = await screen.getByRole("paragraph", { name: /click on the square you want to place your move/i})
    screen.debug()
    expect(gameInstruction).toBeInTheDocument()
   
  })
 
})