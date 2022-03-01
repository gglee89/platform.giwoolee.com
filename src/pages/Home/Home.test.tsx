import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders learn react link', () => {
  render(<Home />);
  const textElement = screen.getByText(/Home page/i);
  expect(textElement).toBeInTheDocument();
});
