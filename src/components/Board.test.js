import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Board from './Board'

describe('Board', () => {
  it('should render nine buttons', () => {
    render(<Board gridData={[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']} />)
    const gridButtonElements = screen.getAllByRole('button')

    expect(gridButtonElements.length).toBe(9)
  })

  it('should render a number,one in each square', async () => {
    render(<Board gridData={[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']} />)
    const gridButtonElements = screen.getAllByRole('button')

    expect(gridButtonElements[0].textContent).toBe(' ')
    expect(gridButtonElements[1].textContent).toBe(' ')
    expect(gridButtonElements[2].textContent).toBe(' ')
  })

  it('player X clicks on grid button 1', () => {
    expect.assertions(2)

    const addPlayerMarkerStub = jest.fn()
    const gridDataStub = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    const currentPlayerMarkerStub = 'X'
    render(
      <Board
        gridData={gridDataStub}
        currentPlayerMarker={currentPlayerMarkerStub}
        addPlayerMarker={addPlayerMarkerStub}
      />,
    )

    const gridButtonElementOne = screen.getByTestId('board-btn-element1')
    const playerMove = [gridButtonElementOne.textContent,gridButtonElementOne.value]
    
    userEvent.click(gridButtonElementOne)

    expect(addPlayerMarkerStub).toBeCalled()
    expect(addPlayerMarkerStub).toBeCalledWith(
      gridDataStub,
      currentPlayerMarkerStub,
      playerMove
    )
  })

  it('player O clicks on grid button 2 ', async () => {
    expect.assertions(2)

    const addPlayerMarkerStub = jest.fn()
    const gridDataStub = ['X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    const currentPlayerMarkerStub = 'O'
    render(
      <Board
        gridData={gridDataStub}
        currentPlayerMarker={currentPlayerMarkerStub}
        addPlayerMarker={addPlayerMarkerStub}
      />,
    )

    const gridButtonElementTwo = screen.getByTestId('board-btn-element2')
    const playerMove = [gridButtonElementTwo.textContent,gridButtonElementTwo.value]
    
    userEvent.click(gridButtonElementTwo)

    expect(addPlayerMarkerStub).toBeCalled()
    expect(addPlayerMarkerStub).toBeCalledWith(
      gridDataStub,
      currentPlayerMarkerStub,
      playerMove
    )
  })
})
