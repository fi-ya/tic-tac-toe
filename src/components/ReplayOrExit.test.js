import { render, screen } from "@testing-library/react";
import ReplayOrExit from "./ReplayOrExit";

beforeEach(() => {
  render(<ReplayOrExit/>)
})

describe('ReplayOrExit', ()=>{

  it('should render a replay button', ()=>{
    const replayButtonElement = screen.getByRole('button', {name: /replay/i});
    expect(replayButtonElement).toBeInTheDocument();
  })

  it('should render a replay button', ()=>{
    const quitButtonElement = screen.getByRole('button', {name: /quit/i})
    expect(quitButtonElement).toBeInTheDocument();
  })

  it('should render two buttons', ()=>{
    const replayOrExitButtonElements = screen.getAllByRole('button');
    expect(replayOrExitButtonElements.length).toBe(2);
  })
})