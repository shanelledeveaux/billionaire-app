import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Hero';

const mockBillionaire = {
  name: 'Elon Musk',
  worth: 240,
  years: '3.2 million',
  source: 'Forbes, 2024',
};

describe('Hero', () => {
  it('renders the billionaire name and worth', () => {
    render(<Hero billionaire={mockBillionaire} mode="spend" onModeChange={() => {}} />);
    expect(screen.getByText('Elon Musk')).toBeInTheDocument();
    expect(screen.getByText('$240B?')).toBeInTheDocument();
  });

  it('calls onModeChange with "tax" when Tax it is clicked', async () => {
    const onModeChange = jest.fn();
    render(<Hero billionaire={mockBillionaire} mode="spend" onModeChange={onModeChange} />);
    await userEvent.click(screen.getByText('Tax it'));
    expect(onModeChange).toHaveBeenCalledWith('tax');
  });

  it('marks the active mode button', () => {
    render(<Hero billionaire={mockBillionaire} mode="tax" onModeChange={() => {}} />);
    const taxBtn = screen.getByText('Tax it');
    expect(taxBtn.className).toMatch(/modeBtnActive/);
  });
});
