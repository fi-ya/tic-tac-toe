import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Game from './Game'
import GameMode from './GameMode'

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      // json: () => Promise.resolve([]),
      data : 'data'
    })
})

describe ('Game', () =>{

  xit('should play a full human vs human game', async()=>{
    render(<Game/>);
    const humanVsHumanBtnElement = screen.getByRole('button', {  name: /human vs human/i});
    
    // mock response from gameMode get request
    // jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(['banana']) }))

    userEvent.click(humanVsHumanBtnElement)

    console.log('this')
    
    // expect(screen.getByText(/click on the square you want to place your move/i)).toBeInTheDocument();
    // const humanMove1 = screen.getByRole('button', {  name: /1/i});
    // expect(screen.getByRole('button', {  name: /x/i})).toBeInTheDocument();
  })



  
})