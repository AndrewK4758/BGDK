// import React from 'react'
// import Layout from '../components/layout/Layout';
import { render, screen } from '@testing-library/react';

it('renders correctly', () => {
  render(<h1>GAMES APP</h1>);
  const x = screen.getByText(/GAMES APP/i);
  expect(x).toBeTruthy();
});
