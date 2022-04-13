import {fireEvent, render, screen} from '@testing-library/react'
import React from 'react'
import GameMode from './GameMode'
import Game from './Game'
// import startGame from './Game'

beforeEach(()=>{
  render(<GameMode/>);
})

describe ('GameMode', () =>{
  it('should render a heading ',() =>{
    const heading = screen.getByRole('heading', {  name: /select game mode/i})
    expect(heading).toBeInTheDocument();
  })

  it('should render human vs human game mode button',async()=>{
    const humanVsHumanBtn = screen.getByRole('button', {  name: /human vs human/i})
    expect(humanVsHumanBtn).toBeInTheDocument();
    expect(humanVsHumanBtn).toHaveClass('btn game_mode')
    expect(humanVsHumanBtn).toHaveTextContent(/^Human vs Human$/)
    expect(humanVsHumanBtn).toHaveValue('1')
  })

  it('should render computer vs human game mode button',()=>{
    const computerVsHumanBtn = screen.getByRole('button', {  name: /computer vs human/i})
    expect(computerVsHumanBtn).toBeInTheDocument()
    expect(computerVsHumanBtn).toHaveClass('btn game_mode')
    expect(computerVsHumanBtn).toHaveTextContent(/^Computer vs Human$/)
    expect(computerVsHumanBtn).toHaveValue('2')
  })

  it('should render two buttons', ()=>{
    const gameModeButtonElements = screen.getAllByRole('button');
    expect(gameModeButtonElements.length).toBe(2);
  })

  it('should call startGame function on click', ()=>{
    expect.assertions(1);
    const humanVsHumanBtn = screen.getByRole('button', {  name: /human vs human/i})

    const mockStartGame = jest.fn((value));

    fireEvent.click(humanVsHumanBtn)

  })
})

