import {render, screen, fireEvent} from '@testing-library/react'
import React from 'react'
import GameMode from './GameMode'
// import '@testing-library/jest-dom'

// beforeAll(()=>{
//   render(<GameMode/>);
// })

// afterAll(cleanup);

describe ('GameMode', () =>{
  test('renders a heading ',() =>{
    render(<GameMode/>);
    const heading = screen.getByRole('heading', {  name: /select game mode/i})
    expect(heading).toBeInTheDocument();
  })

  test('renders human vs human game mode button',async()=>{
    render(<GameMode/>);
    const humanVsHumanBtn = screen.getByRole('button', {  name: /human vs human/i})
    expect(humanVsHumanBtn).toBeInTheDocument();
    // fireEvent.click(humanVsHumanBtn);
    // const whoTurnHeading = await screen.getByRole('heading', {  name: /player x turn/i})
    // expect(whoTurnHeading).toBeInTheDocument();
    
    // await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
  })

  test('renders computer vs human game mode button',()=>{
    render(<GameMode/>);
    const computerVsHumanBtn = screen.getByRole('button', {  name: /computer vs human/i})
    expect(computerVsHumanBtn).toBeInTheDocument();
  })
})