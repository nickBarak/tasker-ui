import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('DOM', () => {
  it('renders correctly', () => {
    render(<App />);
    const title = screen.getByText(/Tasker/i);
    const user = screen.getByText('Nick Barak');
    expect(title).toBeInTheDocument();
    expect(user).toBeInTheDocument();
  });
});
