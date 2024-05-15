import { render, screen } from '@testing-library/react';
import NotFoundNews from './NotFoundNews';

describe('NotFoundNews Component Test', () => {
  test('renders "There were no results." message', () => {
    render(<NotFoundNews />);
    const notFoundMessage = screen.getByText('There were no results.');
    expect(notFoundMessage).toBeInTheDocument();
  });
});
