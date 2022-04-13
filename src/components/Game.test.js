import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { act } from "react-dom/test-utils";
import React from 'react'
import Game from './Game'
import GameMode from './GameMode'

// beforeAll(() => {
//   global.fetch = () =>
//     Promise.resolve({
//       json: () => Promise.resolve(['data']),
//       data : 'data'
//     })
// })

beforeEach(() => {
  global.fetch = jest.fn()
    
})

describe ('Game', () =>{

  it('should play a full human vs human game', async()=>{
    // global.fetch.mockResolvedValue(()=>{
    //   return {json: () => Promise.resolve(['data']), status: 200}
    // })

    global.fetch.mockResolvedValue(Promise.resolve({
            json: () => Promise.resolve({reset_current_player1_name : 'Human',
            reset_current_player_marker : 'X',
            new_grid : '["1", "2", "3", "4", "5", "6", "7", "8", "9"]'}),
            status: 200,
            ok: true
          }))
    
    render(<Game/>);
    const humanVsHumanBtnElement = screen.getByRole('button', {  name: /human vs human/i});
    
    // mock response from gameMode get request
    // jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(['banana']) }))

    act(()=> userEvent.click(humanVsHumanBtnElement))

    console.log('this')    
    // expect(screen.getByText(/click on the square you want to place your move/i)).toBeInTheDocument();
    // const humanMove1 = screen.getByRole('button', {  name: /1/i});
    // expect(screen.getByRole('button', {  name: /x/i})).toBeInTheDocument();
  })



  
})