import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Board from './Board'

describe('Board', () => {
  it('should render nine buttons', () => {
    render(<Board gridData={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />)
    const gridButtonElements = screen.getAllByRole('button')

    expect(gridButtonElements.length).toBe(9)
  })

  it('should render a number,one in each square', async () => {
    render(<Board gridData={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />)
    const gridButtonElements = screen.getAllByRole('button')

    expect(gridButtonElements[0].textContent).toBe('1')
    expect(gridButtonElements[1].textContent).toBe('2')
    expect(gridButtonElements[2].textContent).toBe('3')
  })

  it('player X clicks on grid button 1', () => {
    expect.assertions(2)

    const addPlayerMarkerStub = jest.fn()
    const gridDataStub = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const currentPlayerMarkerStub = 'X'
    render(
      <Board
        gridData={gridDataStub}
        currentPlayerMarker={currentPlayerMarkerStub}
        addPlayerMarker={addPlayerMarkerStub}
      />,
    )

    const gridButtonElementOne = screen.getByRole('button', { name: /1/i })
    userEvent.click(gridButtonElementOne)

    expect(addPlayerMarkerStub).toBeCalled()
    expect(addPlayerMarkerStub).toBeCalledWith(
      gridDataStub,
      currentPlayerMarkerStub,
      gridButtonElementOne.textContent,
    )
  })

  it('player O clicks on grid button 2 ', async () => {
    expect.assertions(2)

    const addPlayerMarkerStub = jest.fn()
    const gridDataStub = ['X', 2, 3, 4, 5, 6, 7, 8, 9]
    const currentPlayerMarkerStub = 'O'
    render(
      <Board
        gridData={gridDataStub}
        currentPlayerMarker={currentPlayerMarkerStub}
        addPlayerMarker={addPlayerMarkerStub}
      />,
    )

    const gridButtonElementTwo = screen.getByRole('button', { name: /2/i })
    userEvent.click(gridButtonElementTwo)

    expect(addPlayerMarkerStub).toBeCalled()
    expect(addPlayerMarkerStub).toBeCalledWith(
      gridDataStub,
      currentPlayerMarkerStub,
      gridButtonElementTwo.textContent,
    )
  })
})
