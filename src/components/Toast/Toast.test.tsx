import { render, screen } from '@testing-library/react';
import Toast from './Toast';

describe('Toast', () => {
  it('renders the message', () => {
    render(<Toast message="Half your fortune is gone." />);
    expect(screen.getByText('Half your fortune is gone.')).toBeInTheDocument();
  });
});
