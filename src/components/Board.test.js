import { render , screen, fireEvent} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from 'react';
import Board from './Board';


describe('Board', ()=>{
  
  it('should render nine buttons', ()=>{
    render(<Board
      gridData={[1,2,3,4,5,6,7,8,9]} 
      currentPlayerMarker='X'
      
   />);
    const gridButtonElements = screen.getAllByRole('button');
    expect(gridButtonElements.length).toBe(9);
  })

  it('should render a number,one in each square', async()=>{
    render(<Board
      gridData={[1,2,3,4,5,6,7,8,9]} 
      currentPlayerMarker='X'
      
   />);
    const gridButtonElements = screen.getAllByRole('button');
    expect(gridButtonElements[0].textContent).toBe('1')
    expect(gridButtonElements[1].textContent).toBe('2')
    expect(gridButtonElements[2].textContent).toBe('3')
  })

  it('player clicks on grid button ', async()=>{
    expect.assertions(2);

    const mockAddPlayerMarkerStub = jest.fn();
    render(<Board
      gridData={[1,2,3,4,5,6,7,8,9]} 
      currentPlayerMarker='X'
      addPlayerMarker={mockAddPlayerMarkerStub}
   />);

    const gridButtonElementOne = screen.getByRole('button', {  name: /1/i});
    userEvent.click(gridButtonElementOne);

    expect(mockAddPlayerMarkerStub).toBeCalled();
    expect(mockAddPlayerMarkerStub).toBeCalledWith([1,2,3,4,5,6,7,8,9], 'X', gridButtonElementOne.textContent);

  })
})
