import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NewsContext } from '../../store/Context';
import NewsItem from './NewsItem';

const mockNewsContextValue = {
  news: [],
  newsSources: [],
  setNews: jest.fn(),
  setNewsSources: jest.fn(),
  filteredNewsSources: [],
  filterNewsSourcesByCategory: jest.fn(), 
};

describe('NewsItem component', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('renders news item correctly', () => {
    const mockNews = {
      title: 'News Title 1',
      urlToImage: 'https://example.com/image1.jpg',
      content: 'Lorem ipsum dolor sit amet',
      publishedAt: '2024-05-15T10:00:00Z',
      source: {
          id: "string",
          name: "string",
      },
      author: "string",
      description: "String",
      url: "string",
    };

    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsItem news={mockNews} />
        </NewsContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('News Title 1')).toBeInTheDocument();

    expect(screen.getByAltText('news-img')).toBeInTheDocument();

    expect(screen.getByText('15.05')).toBeInTheDocument();
  });

  it('toggles news item in read list when clicked', () => {
    const mockNews = {
      title: 'News Title 1',
      urlToImage: 'https://example.com/image1.jpg',
      content: 'Lorem ipsum dolor sit amet',
      publishedAt: '2024-05-15T10:00:00Z',
      source: {
          id: "string",
          name: "string",
      },
      author: "string",
      description: "String",
      url: "string",
    };

    localStorageMock.getItem.mockReturnValueOnce('[]');

    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsItem news={mockNews} />
        </NewsContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByAltText('plus'));

    expect(localStorageMock.setItem).toHaveBeenCalledWith('readList', '["news-title-1"]');

    expect(screen.getByText('Add to read list')).toBeInTheDocument();

    localStorageMock.getItem.mockReturnValueOnce('["news-title-1"]');

    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsItem news={mockNews} />
        </NewsContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Remove from read list'));
  });
});
