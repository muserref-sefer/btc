import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NewsContext } from '../../store/Context';
import Header from './Header';

const mockNewsContextValue = {
  news: [],
  newsSources: [],
  setNews: jest.fn(),
  setNewsSources: jest.fn(),
  filteredNewsSources: [],
  filterNewsSourcesByCategory: jest.fn(), 
};

test('renders logo', () => {
  render(
    <BrowserRouter>
      <NewsContext.Provider value={mockNewsContextValue}>
        <Header />
      </NewsContext.Provider>
    </BrowserRouter>
  );
  const logoElement = screen.getByAltText('logo');
  expect(logoElement).toBeInTheDocument();
});