import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import Game from './components/Game'

describe ('App', ()=>{
  test('renders a heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', {  name: /let's play tic tac toe!/i})
    
    expect(heading).toBeInTheDocument();
  });

  xtest('renders game component on the homepage', () => {
    render(<App />);
    const gameComponent = render(<Game/>)
    
    expect(gameComponent).toBeInTheDocument();
  });
});


