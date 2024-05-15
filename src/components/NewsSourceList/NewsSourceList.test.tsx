import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NewsContext } from '../../store/Context';
import NewsSourceList from './NewsSourceList';

const mockfilteredNewsSources = [
  {
    "id": "abc-news",
    "name": "ABC News",
    "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
    "url": "https://abcnews.go.com",
    "category": "general",
    "language": "en",
    "country": "us"
  }
];

const mockNewsContextValue = {
  news: [],
  newsSources: [],
  setNewsSources: jest.fn(),
  setNews: jest.fn(),
  filteredNewsSources: mockfilteredNewsSources,
  filterNewsSourcesByCategory: jest.fn(),
};

describe('NewsSourceList Component Tests', () => {
  test('renders news sources when filteredNewsSources array is not empty', () => {
    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsSourceList />
        </NewsContext.Provider>
      </BrowserRouter>
    );

    mockfilteredNewsSources.forEach((news) => {
      const newsSourceElement = screen.getByText(news.name);
      expect(newsSourceElement).toBeInTheDocument();
    });

    const arrowIcons = screen.getAllByAltText('arrow');
    expect(arrowIcons).toHaveLength(mockfilteredNewsSources.length);
  });

  test('renders NotFoundNews component when filteredNewsSources array is empty', () => {
    const mockNewsContextValue = {
      news: [],
      newsSources: [],
      setNewsSources: jest.fn(),
      setNews: jest.fn(),
      filteredNewsSources: [],
      filterNewsSourcesByCategory: jest.fn(),
    };

    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsSourceList />
        </NewsContext.Provider>
      </BrowserRouter>
    );

    const notFoundNewsComponent = screen.getByTestId('not-found-news');
    expect(notFoundNewsComponent).toBeInTheDocument();
  });
});
