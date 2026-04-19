import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './Cart';

const mockCart = [
  { cat: 'Luxury', emoji: '✈️', name: 'Private 747 jumbo jet', desc: '', price: 0.4, qty: 2 },
  { cat: 'Housing', emoji: '🏠', name: '1,000 median US homes', desc: '', price: 0.4, qty: 1 },
];

describe('Cart', () => {
  it('shows empty state when cart is empty', () => {
    render(<Cart cart={[]} spent={0} onRemove={() => {}} onClear={() => {}} onShare={() => {}} />);
    expect(screen.getByText(/Nothing yet/)).toBeInTheDocument();
  });

  it('renders cart items with quantity badges', () => {
    render(<Cart cart={mockCart} spent={1.2} onRemove={() => {}} onClear={() => {}} onShare={() => {}} />);
    expect(screen.getByText('Private 747 jumbo jet')).toBeInTheDocument();
    expect(screen.getByText('×2')).toBeInTheDocument();
  });

  it('calls onRemove when ✕ is clicked', async () => {
    const onRemove = jest.fn();
    render(<Cart cart={mockCart} spent={1.2} onRemove={onRemove} onClear={() => {}} onShare={() => {}} />);
    const removeButtons = screen.getAllByText('✕');
    await userEvent.click(removeButtons[0]);
    expect(onRemove).toHaveBeenCalledWith('Private 747 jumbo jet');
  });

  it('calls onClear when Clear cart is clicked', async () => {
    const onClear = jest.fn();
    render(<Cart cart={mockCart} spent={1.2} onRemove={() => {}} onClear={onClear} onShare={() => {}} />);
    await userEvent.click(screen.getByText('Clear cart'));
    expect(onClear).toHaveBeenCalled();
  });

  it('shows Share button when cart has items', () => {
    render(<Cart cart={mockCart} spent={1.2} onRemove={() => {}} onClear={() => {}} onShare={() => {}} />);
    expect(screen.getByText('Share')).toBeInTheDocument();
  });
});
