import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemCard from './ItemCard';

const mockItem = {
  cat: 'Luxury',
  emoji: '✈️',
  name: 'Private 747 jumbo jet',
  desc: 'Full custom interior, crew quarters',
  price: 0.4,
};

describe('ItemCard', () => {
  it('renders the item name, description, and price', () => {
    render(<ItemCard item={mockItem} canAfford onBuy={() => {}} isFlashing={false} />);
    expect(screen.getByText('Private 747 jumbo jet')).toBeInTheDocument();
    expect(screen.getByText('Full custom interior, crew quarters')).toBeInTheDocument();
    expect(screen.getByText('$400M')).toBeInTheDocument();
  });

  it('enables the buy button when affordable', () => {
    render(<ItemCard item={mockItem} canAfford onBuy={() => {}} isFlashing={false} />);
    expect(screen.getByRole('button', { name: 'Buy this' })).toBeEnabled();
  });

  it('disables the buy button when not affordable', () => {
    render(<ItemCard item={mockItem} canAfford={false} onBuy={() => {}} isFlashing={false} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onBuy with the item when clicked', async () => {
    const onBuy = jest.fn();
    render(<ItemCard item={mockItem} canAfford onBuy={onBuy} isFlashing={false} />);
    await userEvent.click(screen.getByText('Buy this'));
    expect(onBuy).toHaveBeenCalledWith(mockItem);
  });
});
