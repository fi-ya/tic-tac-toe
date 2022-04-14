import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Game from './Game'
import { server, rest } from '../testServer'
import {mockFetchNewGameResponse, mockUpdateGameDataResponseOne,mockUpdateGameDataResponseTwo,mockUpdateGameDataResponseThree, mockUpdateGameDataResponseFour, mockUpdateGameDataResponseFive } from '../__mocks__/fetch'

async function mockApiGetRequest(btnValue){
  server.use(
    rest.get(`http://localhost:4567/start-game/${btnValue}`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(mockFetchNewGameResponse)
      )
    })
  )
}
async function mockApiPutRequest(mockApiResponse){
  server.use(
    rest.put(`http://localhost:4567/start-game/grid`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(mockApiResponse)
      )
    })
  )
}

describe('Game', () =>{

  it('should play a full human vs human game and exit successfully', async()=>{

    render(<Game/>)

    // select human vs human game mode
    const humanVsHumanBtnElement = screen.getByRole('button', {  name: /human vs human/i});
    await mockApiGetRequest(humanVsHumanBtnElement.value)
    userEvent.click(humanVsHumanBtnElement);
    await waitFor(() => screen.getByText(/click on the square you want to place your move/i));
    let playerHeadingElement = screen.getByRole('heading', {  name: /player x turn/i});
    const instructionTextElement = screen.getByText(/click on the square you want to place your move/i);
    
    expect(playerHeadingElement).toBeInTheDocument();
    expect(instructionTextElement).toBeInTheDocument();

    // first turn x
    const buttonElementOne = screen.getByRole('button', {  name: /1/i});
    await mockApiPutRequest(mockUpdateGameDataResponseOne )
    userEvent.click(buttonElementOne);
    await waitFor(() => screen.getByRole('heading', {  name: /player o turn/i}));
    
    expect(buttonElementOne.textContent).not.toBe('1');
    expect(buttonElementOne.textContent).toBe('X');

    // second turn o
    const buttonElementTwo = screen.getByRole('button', {  name: /2/i});
    await mockApiPutRequest(mockUpdateGameDataResponseTwo)
    userEvent.click(buttonElementTwo);
    await waitFor(() => screen.getByRole('heading', {  name: /player x turn/i}));
    
    expect(buttonElementTwo.textContent).not.toBe('2');
    expect(buttonElementTwo.textContent).toBe('O');

    // third turn x
    const buttonElementFive = screen.getByRole('button', {  name: /5/i});
    await mockApiPutRequest(mockUpdateGameDataResponseThree)
    userEvent.click(buttonElementFive);
    await waitFor(() => screen.getByRole('heading', {  name: /player o turn/i}));
    
    expect(buttonElementFive.textContent).not.toBe('5');
    expect(buttonElementFive.textContent).toBe('X');

    // fourth turn o
    const buttonElementSix = screen.getByRole('button', {  name: /6/i});
    await mockApiPutRequest(mockUpdateGameDataResponseFour)
    userEvent.click(buttonElementSix);
    await waitFor(() => screen.getByRole('heading', {  name: /player x turn/i}));
    
    expect(buttonElementSix.textContent).not.toBe('6');
    expect(buttonElementSix.textContent).toBe('O');

    // fifth turn x
    const buttonElementNine = screen.getByRole('button', {  name: /9/i});
    await mockApiPutRequest(mockUpdateGameDataResponseFive)
    userEvent.click(buttonElementNine);
    await waitFor(() => screen.getByRole('heading', {  name: /congratulations x won!!!/i }));
    
    expect(buttonElementNine.textContent).not.toBe('9');
    expect(buttonElementNine.textContent).toBe('X');

    // winner
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