import { render, screen } from '@testing-library/react';
import React from 'react';
import NewsProvider, { NewsContext } from './Context';

describe('NewsProvider component', () => {
  it('renders children and provides context values', () => {
    const TestComponent = () => {
      const newsContext = React.useContext(NewsContext);

      return (
        <div>
          <span>{newsContext ? 'Context found' : 'Context not found'}</span>
        </div>
      );
    };

    render(
      <NewsProvider>
        <TestComponent />
      </NewsProvider>
    );

    expect(screen.getByText('Context found')).toBeInTheDocument();
  });
});
