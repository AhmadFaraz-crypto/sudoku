import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sudoku app', () => {
  render(<App />);
  const heading = screen.getByText(/Sudoku/i);
  expect(heading).toBeInTheDocument();
});
