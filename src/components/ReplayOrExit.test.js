import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import ReplayOrExit from "./ReplayOrExit";

describe('ReplayOrExit', ()=>{

  it('should render a replay button', ()=>{
    render(<ReplayOrExit/>)
    const replayButtonElement = screen.getByRole('button', {name: /replay/i});
    expect(replayButtonElement).toBeInTheDocument();
  })

  it('should render a replay button', ()=>{
    render(<ReplayOrExit/>)
    const quitButtonElement = screen.getByRole('button', {name: /quit/i})
    expect(quitButtonElement).toBeInTheDocument();
  })

  it('should render two buttons', ()=>{
    render(<ReplayOrExit/>)
    const replayOrExitButtonElements = screen.getAllByRole('button');
    expect(replayOrExitButtonElements.length).toBe(2);
  })

  it('should display goodbye message', ()=>{
    const mockExitGameStatus = true
    render(<ReplayOrExit exitGame={mockExitGameStatus}/>);

    const exitHeadingElement = screen.getByRole('heading', {  name: /thank you for playing! goodbye!/i});

    expect(exitHeadingElement).toBeInTheDocument();
  })

  it('replay button clicked', ()=>{
    expect.assertions(1);
    const mockExitGameStatus = false
    const mockHandleReplayGameStub = jest.fn();
    render(<ReplayOrExit handleReplayGame={mockHandleReplayGameStub} exitGame={mockExitGameStatus}/>);

    const replayButtonElement = screen.getByRole('button', {  name: /replay/i});
    userEvent.click(replayButtonElement);

    expect(mockHandleReplayGameStub).toBeCalled();
  })  

  it('quit button clicked', ()=>{
    expect.assertions(1);
    const mockExitGameStatus = false
    const mockHandleExitGameStub = jest.fn();
    render(<ReplayOrExit handleGameExit={mockHandleExitGameStub} exitGame={mockExitGameStatus}/>);

    const quitButtonElement = screen.getByRole('button', {  name: /quit/i});
    userEvent.click(quitButtonElement);

    expect(mockHandleExitGameStub).toBeCalled();
  })  
})