import {render, screen, fireEvent} from '@testing-library/react'
import React from 'react'
import GameMode from './GameMode'
// import '@testing-library/jest-dom'

// beforeAll(()=>{
//   render(<GameMode/>);
// })

// afterAll(cleanup);

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
    const buttonElements = screen.getAllByRole('button')
    expect(buttonElements.length).toBe(2);
  })
})