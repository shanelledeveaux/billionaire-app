import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpendMode from './SpendMode';

const mockItems = [
  { cat: 'Luxury', emoji: '✈️', name: 'Private 747 jumbo jet', desc: 'Full custom interior', price: 0.4 },
];

const defaultProps = {
  categories: ['All', 'Luxury'],
  activeCat: 'All',
  filteredItems: mockItems,
  remaining: 240,
  flashItem: null,
  spentPct: 0,
  cart: [],
  spent: 0,
  billionaireName: 'Elon Musk',
  onCatChange: () => {},
  onBuy: () => {},
  onRemove: () => {},
  onClear: () => {},
  onShare: () => {},
  onSurprise: () => {},
};

describe('SpendMode', () => {
  it('renders category tabs and items', () => {
    render(<SpendMode {...defaultProps} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Private 747 jumbo jet')).toBeInTheDocument();
  });

  it('shows Celebration when 100% spent', () => {
    render(<SpendMode {...defaultProps} spentPct={100} />);
    expect(screen.getByText('You spent every last billion.')).toBeInTheDocument();
  });

  it('calls onSurprise when Surprise me is clicked', async () => {
    const onSurprise = jest.fn();
    render(<SpendMode {...defaultProps} onSurprise={onSurprise} />);
    await userEvent.click(screen.getByText('Surprise me'));
    expect(onSurprise).toHaveBeenCalled();
  });

  it('calls onCatChange when a category tab is clicked', async () => {
    const onCatChange = jest.fn();
    render(<SpendMode {...defaultProps} onCatChange={onCatChange} />);
    await userEvent.click(screen.getByText('Luxury'));
    expect(onCatChange).toHaveBeenCalledWith('Luxury');
  });
});
