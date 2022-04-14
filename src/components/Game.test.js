import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer, setupWorker } from 'msw/node'
import '@testing-library/jest-dom'
import Game from './Game'
import {mockFetchNewGameResponse, mockUpdateGameDataResponseOne,mockUpdateGameDataResponseTwo,mockUpdateGameDataResponseThree, mockUpdateGameDataResponseFour, mockUpdateGameDataResponseFive } from '../__mocks__/fetch'

const server = setupServer(
  rest.get("http://localhost:4567", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockFetchNewGameResponse)
    )
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Game', () =>{

  it('should play a full human vs human game and exit successfully', async()=>{

    render(<Game/>)
    const humanVsHumanBtnElement = screen.getByRole('button', {  name: /human vs human/i});

    server.use(
      rest.get(`http://localhost:4567/start-game/${humanVsHumanBtnElement.value}`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockFetchNewGameResponse)
        )
      })
    )

    userEvent.click(humanVsHumanBtnElement);
    
    await waitFor(() => screen.getByText(/click on the square you want to place your move/i));

    const playerHeadingElement = screen.getByRole('heading', {  name: /player x turn/i});
    const instructionTextElement = screen.getByText(/click on the square you want to place your move/i);
    
    expect(playerHeadingElement).toBeInTheDocument();
    expect(instructionTextElement).toBeInTheDocument();

    const buttonElementOne = screen.getByRole('button', {  name: /1/i});

    server.use(
      rest.put(`http://localhost:4567/start-game/grid`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockUpdateGameDataResponseOne)
        )
      })
    )
    
    userEvent.click(buttonElementOne);

    await waitFor(() => screen.getByRole('heading', {  name: /player o turn/i}));
    
    expect(buttonElementOne.textContent).not.toBe('1');
    expect(buttonElementOne.textContent).toBe('X');

    const buttonElementTwo = screen.getByRole('button', {  name: /2/i});

    server.use(
      rest.put(`http://localhost:4567/start-game/grid`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockUpdateGameDataResponseTwo)
        )
      })
    )
    
    userEvent.click(buttonElementTwo);

    await waitFor(() => screen.getByRole('heading', {  name: /player x turn/i}));
    
    expect(buttonElementTwo.textContent).not.toBe('2');
    expect(buttonElementTwo.textContent).toBe('O');
    
    const buttonElementFive = screen.getByRole('button', {  name: /5/i});

    server.use(
      rest.put(`http://localhost:4567/start-game/grid`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockUpdateGameDataResponseThree)
        )
      })
    )
    
    userEvent.click(buttonElementFive);

    await waitFor(() => screen.getByRole('heading', {  name: /player o turn/i}));
    
    expect(buttonElementFive.textContent).not.toBe('5');
    expect(buttonElementFive.textContent).toBe('X');

    const buttonElementSix = screen.getByRole('button', {  name: /6/i});

    server.use(
      rest.put(`http://localhost:4567/start-game/grid`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockUpdateGameDataResponseFour)
        )
      })
    )
    
    userEvent.click(buttonElementSix);

    await waitFor(() => screen.getByRole('heading', {  name: /player x turn/i}));
    
    expect(buttonElementSix.textContent).not.toBe('6');
    expect(buttonElementSix.textContent).toBe('O');

    const buttonElementNine = screen.getByRole('button', {  name: /9/i});

    server.use(
      rest.put(`http://localhost:4567/start-game/grid`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(mockUpdateGameDataResponseFive)
        )
      })
    )
    
    userEvent.click(buttonElementNine);

    await waitFor(() => screen.getByRole('heading', {  name: /congratulations x won!!!/i }));
    
    expect(buttonElementNine.textContent).not.toBe('9');
    expect(buttonElementNine.textContent).toBe('X');

    const congratsHeadingElement = screen.getByRole('heading', {  name: /congratulations x won!!!/i})
    const replayButtonElement = screen.getByRole('button', {  name: /replay/i})
    const quitButtonElement = screen.getByRole('button', {  name: /quit/i})
    
    expect(congratsHeadingElement).toBeInTheDocument();
    expect(replayButtonElement).toBeInTheDocument();
    expect(quitButtonElement).toBeInTheDocument();

    userEvent.click(quitButtonElement);

    const goodbyeHeadingElement = screen.getByRole('heading', {  name: /thank you for playing! goodbye!/i})

    expect(goodbyeHeadingElement).toBeInTheDocument();
  
  })
})