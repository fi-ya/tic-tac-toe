import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe ('App', ()=>{
  it('should render a heading', () => {
    render(<App />)
    const heading = screen.getByRole('heading', {  name: /let's play tic tac toe!/i})
    expect(heading).toBeInTheDocument();
  });

  it('should render game component on the homepage', () => {
    render(<App />)
    const gameComponent = screen.getByRole('main')
    expect(gameComponent).toBeInTheDocument();
  });
});


