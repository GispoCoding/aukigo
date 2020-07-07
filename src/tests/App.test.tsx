import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('app displays loading', () => {
    render(<App />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
