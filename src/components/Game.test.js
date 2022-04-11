import {render, screen} from '@testing-library/react'
import React from 'react'
import Game from './Game'

beforeAll(()=>{
  render(<Game/>);
})

describe ('Game', () =>{
  render(<Game/>);
  xit('should render a paragraph containing instructions ',() =>{
    // const gameInstruction = screen.getByRole("paragraph", { name: /click on the square you want to place your move/i})
    // expect(gameInstruction).toBeInTheDocument()
   
  })
  screen.getBy
 
})