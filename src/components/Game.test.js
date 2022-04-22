import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Game from './Game'
import { server, rest } from '../testServer'
import {
  mockFetchNewGameResponse,
  mockUpdateGameDataResponseOne,
  mockUpdateGameDataResponseTwo,
  mockUpdateGameDataResponseThree,
  mockUpdateGameDataResponseFour,
  mockUpdateGameDataResponseFive,
  mockTieGameDataResponse,
  mockInvalidMoveGameDataResponse,
} from '../__mocks__/fetch'

describe('Game', () => {
  it('wins human vs human game and exit successfully', async () => {
    render(<Game />)
    await selectHumanVsHumanGame()
    await playHumanVsHumanWinningGame()
    const quitButtonElement = screen.getByRole('button', { name: /quit/i })

    expect(quitButtonElement).toBeInTheDocument()

    userEvent.click(quitButtonElement)
    const goodbyeHeadingElement = screen.getByRole('heading', {
      name: /thank you for playing! goodbye!/i,
    })

    expect(goodbyeHeadingElement).toBeInTheDocument()
  })

  it('wins human vs human game and replays successfully', async () => {
    render(<Game />)
    await selectHumanVsHumanGame()
    await playHumanVsHumanWinningGame()
    const replayButtonElement = screen.getByRole('button', { name: /replay/i })

    expect(replayButtonElement).toBeInTheDocument()

    // replay
    userEvent.click(replayButtonElement)
    const gameModeButtonElements = screen.getAllByRole('button')

    expect(gameModeButtonElements.length).toBe(2)
    expect(
      screen.getByRole('button', { name: /human vs human/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /computer vs human/i }),
    ).toBeInTheDocument()
  })

  it('draws human vs human game and replays successfully', async () => {
    render(<Game />)
    await selectHumanVsHumanGame()
    await playTieGame()
    const tieHeadingElement = screen.getByRole('heading', {
      name: /game over!! it's a tie!!!/i,
    })

    expect(tieHeadingElement).toBeInTheDocument()

    const quitButtonElement = screen.getByRole('button', { name: /quit/i })
    const replayButtonElement = screen.getByRole('button', { name: /replay/i })

    expect(quitButtonElement).toBeInTheDocument()
    expect(replayButtonElement).toBeInTheDocument()

    // replay
    userEvent.click(replayButtonElement)
    const gameModeButtonElements = screen.getAllByRole('button')

    expect(gameModeButtonElements.length).toBe(2)
    expect(
      screen.getByRole('button', { name: /human vs human/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /computer vs human/i }),
    ).toBeInTheDocument()
  })

  it('displays an error message if the position has already been taken', async () => {
    render(<Game />)
    await selectHumanVsHumanGame()

    // first turn x
    const buttonElementOne = screen.getByRole('button', { name: /1/i })
    await mockApiPutRequest(mockUpdateGameDataResponseOne)
    userEvent.click(buttonElementOne)
    await waitFor(() => screen.getByRole('heading', { name: /player o turn/i }))

    expect(buttonElementOne.textContent).not.toBe('1')
    expect(buttonElementOne.textContent).toBe('X')

    // second turn o
    const buttonElementOneAgain = screen.getByRole('button', { name: /x/i })
    await mockApiPutRequest(mockInvalidMoveGameDataResponse)
    userEvent.click(buttonElementOneAgain)
    await waitFor(() =>
      screen.getByRole('heading', { name: /invalid move\. try again!/i }),
    )

    expect(
      screen.getByRole('heading', { name: /invalid move\. try again!/i }),
    ).toBeInTheDocument()
    expect(buttonElementOneAgain.textContent).not.toBe('O')
    expect(buttonElementOneAgain.textContent).toBe('X')
  })
})

async function mockApiGetRequest(btnValue) {
  server.use(
    rest.get(
      `http://localhost:4567/start-game/${btnValue}`,
      (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockFetchNewGameResponse))
      },
    ),
  )
}
async function mockApiPutRequest(mockApiResponse) {
  server.use(
    rest.put(`http://localhost:4567/start-game/grid`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockApiResponse))
    }),
  )
}

async function selectHumanVsHumanGame() {
  const humanVsHumanBtnElement = screen.getByRole('button', {
    name: /human vs human/i,
  })
  await mockApiGetRequest(humanVsHumanBtnElement.value)
  userEvent.click(humanVsHumanBtnElement)

  await waitFor(() =>
    screen.getByText(/click on the square you want to place your move/i),
  )
  const playerHeadingElement = screen.getByRole('heading', {
    name: /player x turn/i,
  })
  const instructionTextElement = screen.getByText(
    /click on the square you want to place your move/i,
  )

  expect(playerHeadingElement).toBeInTheDocument()
  expect(instructionTextElement).toBeInTheDocument()
}

async function playHumanVsHumanWinningGame() {
  // first turn x
  const buttonElementOne = screen.getByRole('button', { name: /1/i })
  await mockApiPutRequest(mockUpdateGameDataResponseOne)
  userEvent.click(buttonElementOne)
  await waitFor(() => screen.getByRole('heading', { name: /player o turn/i }))

  expect(buttonElementOne.textContent).not.toBe('1')
  expect(buttonElementOne.textContent).toBe('X')

  // second turn o
  const buttonElementTwo = screen.getByRole('button', { name: /2/i })
  await mockApiPutRequest(mockUpdateGameDataResponseTwo)
  userEvent.click(buttonElementTwo)
  await waitFor(() => screen.getByRole('heading', { name: /player x turn/i }))

  expect(buttonElementTwo.textContent).not.toBe('2')
  expect(buttonElementTwo.textContent).toBe('O')

  // third turn x
  const buttonElementFive = screen.getByRole('button', { name: /5/i })
  await mockApiPutRequest(mockUpdateGameDataResponseThree)
  userEvent.click(buttonElementFive)
  await waitFor(() => screen.getByRole('heading', { name: /player o turn/i }))

  expect(buttonElementFive.textContent).not.toBe('5')
  expect(buttonElementFive.textContent).toBe('X')

  // fourth turn o
  const buttonElementSix = screen.getByRole('button', { name: /6/i })
  await mockApiPutRequest(mockUpdateGameDataResponseFour)
  userEvent.click(buttonElementSix)
  await waitFor(() => screen.getByRole('heading', { name: /player x turn/i }))

  expect(buttonElementSix.textContent).not.toBe('6')
  expect(buttonElementSix.textContent).toBe('O')

  // fifth turn x
  const buttonElementNine = screen.getByRole('button', { name: /9/i })
  await mockApiPutRequest(mockUpdateGameDataResponseFive)
  userEvent.click(buttonElementNine)

  await waitFor(() => screen.getByRole('heading', { name: /player o turn/i }))

  expect(buttonElementNine.textContent).not.toBe('9')
  expect(buttonElementNine.textContent).toBe('X')

  await waitFor(() =>
    screen.getByRole('heading', { name: /congratulations x won!!!/i }),
  )
  // winner
  const congratsHeadingElement = screen.getByRole('heading', {
    name: /congratulations x won!!!/i,
  })

  expect(congratsHeadingElement).toBeInTheDocument()
}

async function playTieGame() {
  // test from last turn
  const lastPlayButtonElement = screen.getByRole('button', { name: /9/i })
  await mockApiPutRequest(mockTieGameDataResponse)
  userEvent.click(lastPlayButtonElement)
  await waitFor(() => screen.getByRole('heading', { name: /player o turn/i }))

  await waitFor(() =>
    screen.getByRole('heading', { name: /game over!! it's a tie!!!/i }),
  )
}
