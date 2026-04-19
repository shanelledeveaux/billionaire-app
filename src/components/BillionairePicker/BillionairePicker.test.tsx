import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BillionairePicker from './BillionairePicker';

const mockBillionaires = [
  { name: 'Elon Musk', worth: 240, years: '3.2 million', source: 'Forbes, 2024' },
  { name: 'Jeff Bezos', worth: 200, years: '2.7 million', source: 'Forbes, 2024' },
];

describe('BillionairePicker', () => {
  it('renders all billionaire buttons', () => {
    render(<BillionairePicker billionaires={mockBillionaires} activeIdx={0} onSelect={() => {}} />);
    expect(screen.getByText('Elon Musk')).toBeInTheDocument();
    expect(screen.getByText('Jeff Bezos')).toBeInTheDocument();
  });

  it('shows net worth on each button', () => {
    render(<BillionairePicker billionaires={mockBillionaires} activeIdx={0} onSelect={() => {}} />);
    expect(screen.getByText('$240B')).toBeInTheDocument();
    expect(screen.getByText('$200B')).toBeInTheDocument();
  });

  it('calls onSelect with the correct index', async () => {
    const onSelect = jest.fn();
    render(<BillionairePicker billionaires={mockBillionaires} activeIdx={0} onSelect={onSelect} />);
    await userEvent.click(screen.getByText('Jeff Bezos'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
