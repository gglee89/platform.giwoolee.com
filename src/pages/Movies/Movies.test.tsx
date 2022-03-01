import React from 'react';
import { render, screen } from '@testing-library/react';
import Movies from './Movies';

test('renders learn react link', () => {
  render(<Movies />);
  const textElement = screen.getByText(/Movies page/i);
  expect(textElement).toBeInTheDocument();
});
