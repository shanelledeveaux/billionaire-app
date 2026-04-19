import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Celebration from './Celebration';

describe('Celebration', () => {
  it('renders the celebration message', () => {
    render(<Celebration billionaireName="Elon Musk" onReset={() => {}} />);
    expect(screen.getByText('You spent every last billion.')).toBeInTheDocument();
    expect(screen.getByText(/Elon Musk/)).toBeInTheDocument();
  });

  it('calls onReset when Start over is clicked', async () => {
    const onReset = jest.fn();
    render(<Celebration billionaireName="Jeff Bezos" onReset={onReset} />);
    await userEvent.click(screen.getByText('Start over'));
    expect(onReset).toHaveBeenCalled();
  });
});
