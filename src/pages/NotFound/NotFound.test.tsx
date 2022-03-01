import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

test('renders learn react link', () => {
  render(<NotFound />);
  const textElement = screen.getByText(/NotFound page/i);
  expect(textElement).toBeInTheDocument();
});
