import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BillionaireApp from './BillionaireApp';

describe('BillionaireApp', () => {
  it('renders the default billionaire headline', () => {
    render(<BillionaireApp />);
    expect(screen.getByText('Elon Musk')).toBeInTheDocument();
  });

  it('switches to tax mode', async () => {
    render(<BillionaireApp />);
    await userEvent.click(screen.getByText('Tax it'));
    expect(screen.getByText('Set the wealth tax rate')).toBeInTheDocument();
  });

  it('switches billionaire and resets cart', async () => {
    render(<BillionaireApp />);
    await userEvent.click(screen.getByText('Jeff Bezos'));
    expect(screen.getByText('$200B?')).toBeInTheDocument();
  });
});
