import { fireEvent, render, screen } from '@testing-library/react';
import { NewsContext } from '../../store/Context';
import Filter from './Filter';

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

const mockContextValue = {
  news: [],
  newsSources: mockfilteredNewsSources,
  setNewsSources: jest.fn(),
  setNews: jest.fn(),
  filteredNewsSources: [],
  filterNewsSourcesByCategory: jest.fn(),
};

it("renders filter buttons correctly", () => {
  render(
    <Filter />,
    { wrapper: ({ children }) => <NewsContext.Provider value={mockContextValue}>{children}</NewsContext.Provider> }
  );

  expect(screen.getByText("general")).toBeInTheDocument();
});

it("toggles category when button is clicked", () => {
  render(
    <Filter />,
    { wrapper: ({ children }) => <NewsContext.Provider value={mockContextValue}>{children}</NewsContext.Provider> }
  );

  fireEvent.click(screen.getByText("general"));
  expect(mockContextValue.filterNewsSourcesByCategory).toHaveBeenCalledWith(["general"]);
});