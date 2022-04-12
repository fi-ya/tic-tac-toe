import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import React from 'react'
import GameMode from './GameMode'
import Game from './Game'
// import '@testing-library/jest-dom'

// beforeAll(()=>{
//   render(<Game/>);
// })

// afterAll(cleanup);

const mockSetGameMode = jest.fn();
const mockStartGame = jest.fn((value) => {
  const mockFetchNewGame = jest.fn((value)=> {data});
    return 
});

describe ('GameMode', () =>{
  it('should render a heading ',() =>{
    render(<GameMode/>);
    const heading = screen.getByRole('heading', {  name: /select game mode/i})
    expect(heading).toBeInTheDocument();
  })

  it('should render human vs human game mode button',async()=>{
    render(<GameMode/>);
    const humanVsHumanBtn = screen.getByRole('button', {  name: /human vs human/i})
    expect(humanVsHumanBtn).toBeInTheDocument();
    expect(humanVsHumanBtn).toHaveAttribute('type', 'submit')
    expect(humanVsHumanBtn).toHaveClass('btn game_mode')
    expect(humanVsHumanBtn).toHaveTextContent(/^Human vs Human$/)
    expect(humanVsHumanBtn).toHaveValue('1')

    // fireEvent.click(humanVsHumanBtn);
    // const whoTurnHeading = await screen.getByRole('heading', {  name: /player x turn/i})
    // expect(whoTurnHeading).toBeInTheDocument();
    
    // await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
  })

  it('should render computer vs human game mode button',()=>{
    render(<GameMode/>);
    const computerVsHumanBtn = screen.getByRole('button', {  name: /computer vs human/i})
    expect(computerVsHumanBtn).toBeInTheDocument()
    expect(computerVsHumanBtn).toHaveAttribute('type','submit')
    expect(computerVsHumanBtn).toHaveClass('btn game_mode')
    expect(computerVsHumanBtn).toHaveTextContent(/^Computer vs Human$/)
    expect(computerVsHumanBtn).toHaveValue('2')
  })

  it('should render two buttons', ()=>{
    render(<GameMode/>)
    const gameModeButtonElements = screen.getAllByRole('button');
    expect(gameModeButtonElements.length).toBe(2);
  })

  it('should on click of human vs human game start game', async ()=>{
    render(<GameMode
            setGameMode={mockSetGameMode}
            startGame={mockStartGame}/>)

    const humanVsHumanBtnElement = screen.getByRole('button', {  name: /human vs human/i})
    
   const clickEvent =  fireEvent.click(humanVsHumanBtnElement)
   console.log('click',clickEvent);
   console.log('humanVsHumanBtnElement',humanVsHumanBtnElement.value);
    // expect(humanVsHumanBtn).toBeInTheDocument();
  })
})