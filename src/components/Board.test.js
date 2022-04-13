import { render , screen, fireEvent} from "@testing-library/react";
import React from 'react';
import Board from './Board';
import GameMode from './GameMode';

beforeEach(()=>{
  render(<Board
     gridData={[1,2,3,4,5,6,7,8,9]} 
     currentPlayerMarker='X'
     addPlayerMarker={mockAddPlayerMarker}
  />);
})

const mockAddPlayerMarker = (gridData, currentPlayerMarker, playerMove)=>{
  return gridData, currentPlayerMarker, playerMove
}

describe('Board', ()=>{
  
  it('should render nine buttons', ()=>{
    const gridButtonElements = screen.getAllByRole('button');
    expect(gridButtonElements.length).toBe(9);
  })

  it('should render a number,one in each square', async()=>{
    const gridButtonElements = screen.getAllByRole('button');
    expect(gridButtonElements[0].textContent).toBe('1')
    expect(gridButtonElements[1].textContent).toBe('2')
    expect(gridButtonElements[2].textContent).toBe('3')
  })

  xit('should on click update board with player marker', async()=>{
 
    const playerMove = screen.getByRole('button', {  name: /1/i})
   
    fireEvent.click(playerMove)
    console.log(fireEvent.click(playerMove), 'playerMove')
    expect(mockAddPlayerMarker).toHaveBeenCalledTimes(1)
  
  })
})