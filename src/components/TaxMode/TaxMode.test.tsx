import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaxMode from './TaxMode';

const mockPrograms = [
  { emoji: '🏫', name: 'Free school lunches', cost: 18, label: '$18B/yr' },
  { emoji: '💊', name: 'Medicaid expansion', cost: 54, label: '$54B/yr' },
];

describe('TaxMode', () => {
  it('renders the tax revenue', () => {
    render(
      <TaxMode
        taxRate={2}
        billCount={400}
        taxRevenue={26.6}
        programs={mockPrograms}
        onTaxRateChange={() => {}}
        onBillCountChange={() => {}}
      />
    );
    expect(screen.getByText('$26.6B')).toBeInTheDocument();
  });

  it('shows fully funded when revenue covers a program', () => {
    render(
      <TaxMode
        taxRate={5}
        billCount={400}
        taxRevenue={60}
        programs={mockPrograms}
        onTaxRateChange={() => {}}
        onBillCountChange={() => {}}
      />
    );
    expect(screen.getByText('Fully funded')).toBeInTheDocument();
  });

  it('calls onTaxRateChange when slider changes', async () => {
    const onTaxRateChange = jest.fn();
    render(
      <TaxMode
        taxRate={2}
        billCount={400}
        taxRevenue={26.6}
        programs={mockPrograms}
        onTaxRateChange={onTaxRateChange}
        onBillCountChange={() => {}}
      />
    );
    const sliders = screen.getAllByRole('slider');
    await userEvent.type(sliders[0], '{arrowright}');
    expect(onTaxRateChange).toHaveBeenCalled();
  });
});
