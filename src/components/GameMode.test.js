import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import GameMode from './GameMode'

describe('GameMode', () => {
  it('should render two headings, how to play, select game mode ', () => {
    render(<GameMode />)
    const howToPlayHeading = screen.getByRole('heading', {  name: /how to play/i})
    const selectGameModeHeading = screen.getByRole('heading', { name: /select game mode/i })
    
    expect(howToPlayHeading).toBeInTheDocument()
    expect(selectGameModeHeading).toBeInTheDocument()
  })

  it('should render paragraph containing instructions on how to play game ', () => {
    render(<GameMode />)
    const gameInstructionsParagraph = screen.getByText(  /first pick who you would like to play against, another human or a computer\. each player take turns in placing their marker on the board with `x` playing first\. the first player to get 3 of their marks in a row \(up, down, across, or diagonally\) is the winner\. when all 9 squares are full, the game is over\. if no player has 3 marks in a row, the game ends in a tie\./i  )
    
    expect(gameInstructionsParagraph).toBeInTheDocument()
  })

  it('should render human vs human game mode button', async () => {
    render(<GameMode />)
    const humanVsHumanBtn = screen.getByRole('button', {
      name: /human vs human/i,
    })
    expect(humanVsHumanBtn).toBeInTheDocument()
    expect(humanVsHumanBtn).toHaveClass('btn game_mode')
    expect(humanVsHumanBtn).toHaveTextContent(/^Human vs Human$/)
    expect(humanVsHumanBtn).toHaveValue('1')
  })

  it('should render computer vs human game mode button', () => {
    render(<GameMode />)
    const computerVsHumanBtn = screen.getByRole('button', {
      name: /computer vs human/i,
    })
    expect(computerVsHumanBtn).toBeInTheDocument()
    expect(computerVsHumanBtn).toHaveClass('btn game_mode')
    expect(computerVsHumanBtn).toHaveTextContent(/^Computer vs Human$/)
    expect(computerVsHumanBtn).toHaveValue('2')
  })

  it('should render two buttons', () => {
    render(<GameMode />)
    const gameModeButtonElements = screen.getAllByRole('button')
    expect(gameModeButtonElements.length).toBe(2)
  })

  it('human vs human game button clicked', async () => {
    expect.assertions(2)

    let choice
    const startGameStub = jest.fn(choice)
    render(<GameMode startGame={startGameStub} />)

    const humanVsHumanBtn = screen.getByRole('button', {
      name: /human vs human/i,
    })
    userEvent.click(humanVsHumanBtn)

    expect(startGameStub).toBeCalled()
    expect(startGameStub).toBeCalledWith(humanVsHumanBtn.value)
  })

  it('computer vs human game button clicked', async () => {
    expect.assertions(2)

    let choice
    const startGameStub = jest.fn(choice)
    render(<GameMode startGame={startGameStub} />)

    const computerVsHumanBtn = screen.getByRole('button', {
      name: /computer vs human/i,
    })
    userEvent.click(computerVsHumanBtn)

    expect(startGameStub).toBeCalled()
    expect(startGameStub).toBeCalledWith(computerVsHumanBtn.value)
  })
})
