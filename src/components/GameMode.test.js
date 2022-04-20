import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import GameMode from './GameMode'

describe('GameMode', () => {
  it('should render a heading ', () => {
    render(<GameMode />)
    const heading = screen.getByRole('heading', { name: /select game mode/i })
    expect(heading).toBeInTheDocument()
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
