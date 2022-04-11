import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import Game from './components/Game'

test('renders heading on the homepage', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {  name: /let's play tic tac toe!/i})
  
  expect(heading).toBeInTheDocument();
});

xtest('renders game component on the homepage', () => {
  render(<App />);
  const gameComponent = render(<Game/>)
  
  expect(gameComponent).toBeInTheDocument();
});