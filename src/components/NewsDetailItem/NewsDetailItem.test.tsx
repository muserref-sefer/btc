import { fireEvent, render, screen } from '@testing-library/react';
import NewsDetailItem from './NewsDetailItem';

describe('NewsDetailItem component', () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('renders news detail item correctly', () => {
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

    render(<NewsDetailItem news={mockNews} />);

    expect(screen.getByText('News Title 1')).toBeInTheDocument();
    expect(screen.getByAltText('news-img')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
    expect(screen.getByAltText('plus')).toBeInTheDocument();
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

    render(<NewsDetailItem news={mockNews} />);

    fireEvent.click(screen.getByText('Add to read list'));

    expect(localStorageMock.setItem).toHaveBeenCalledWith('readList', '["news-title-1"]');
    expect(screen.getByText('Add to read list')).toBeInTheDocument();

    localStorageMock.getItem.mockReturnValueOnce('["news-title-1"]');

    render(<NewsDetailItem news={mockNews} />);

    expect(screen.getByText('Remove from read list')).toBeInTheDocument();
  });
});
