import { render , screen} from "@testing-library/react";
import React from 'react';
import Board from './Board';
import GameMode from './GameMode';

// beforeAll(()=>{
//   render(<GameMode/>);
// })

describe('Board', ()=>{
  
  it('should render nine buttons', ()=>{
    render(<Board gridData={[1,2,3,4,5,6,7,8,9]} currentPlayerMarker='X'/>);
    const gridButtonElements = screen.getAllByRole('button');
    expect(gridButtonElements.length).toBe(9);
  })

  it('should render a number,one in each square', async()=>{
    render(<Board gridData={[1,2,3,4,5,6,7,8,9]} currentPlayerMarker='X'/>);
    const gridButtonElements = screen.getAllByRole('button');
    expect(gridButtonElements[0].textContent).toBe('1')
    expect(gridButtonElements[1].textContent).toBe('2')
    expect(gridButtonElements[2].textContent).toBe('3')
  })

})