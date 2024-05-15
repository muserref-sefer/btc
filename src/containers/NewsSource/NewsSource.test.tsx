import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NewsContext } from '../../store/Context';
import NewsSource from './NewsSource';

const mockNewsSources = [
  {
    "source": {
        "id": "abc-news",
        "name": "ABC News"
    },
    "author": "The Associated Press",
    "title": "Russian president Putin to make a state visit to China this week",
    "description": "The Chinese Foreign Ministery says Russian President Vladimir Putin will make a two-day state visit to China this week",
    "url": "https://abcnews.go.com/International/wireStory/russian-president-putin-make-state-visit-china-week-110204816",
    "urlToImage": "https://i.abcnewsfe.com/a/ffa607e4-e710-4062-828d-e0f249456690/wirestory_9db43561dd4c1b580d44af73d05e0e08_16x9.jpg?w=1600",
    "publishedAt": "2024-05-14T07:32:52Z",
    "content": "BEIJING -- Russian President Vladimir Putin will make a two-day state visit to China this week, the Chinese Foreign Ministry said Tuesday.\r\nPutin will meet Chinese leader Xi Jinping during his visit … [+1247 chars]"
  },
  {
    "source": {
        "id": "abc-news",
        "name": "ABC News"
    },
    "author": "MORIAH BALINGIT Associated Press, SUSAN MONTOYA BRYAN Associated Press, DYLAN LOVAN OF Associated Press, DANIEL BEEKMAN OF THE SEATTLE TIMES Associated Press",
    "title": "Congress is sending families less help for day care costs. So states are stepping in",
    "description": "Child care has long been expensive for families, hard to find and financially precarious for day care owners and workers",
    "url": "https://abcnews.go.com/Business/wireStory/congress-sending-families-day-care-costs-states-stepping-110201513",
    "urlToImage": "https://i.abcnewsfe.com/a/2f4d52f0-12e6-4398-96da-c244ba9bac0f/wirestory_a3f6eb5b85dbe73e70e8d082421a7bef_16x9.jpg?w=1600",
    "publishedAt": "2024-05-14T04:04:54Z",
    "content": "ALBUQUERQUE, N.M. -- Across the country, the story for families is virtually the same: Child care is unaffordable for many, hard to find for those who can pay, and financially precarious for day care… [+6704 chars]"
  },
  {
    "source": {
        "id": "abc-news",
        "name": "ABC News"
    },
    "author": "SOPHIE AUSTIN /REPORT FOR AMERICA Associated Press",
    "title": "California moves closer to requiring new pollutant-warning labels for gas stoves",
    "description": "The California Assembly has approved legislation that would require new gas stoves to carry a label warning users about pollutants that have been linked to respiratory illnesses",
    "url": "https://abcnews.go.com/Business/wireStory/california-moves-closer-requiring-new-pollutant-warning-labels-110195906",
    "urlToImage": "https://i.abcnewsfe.com/a/57d764d1-262b-4759-83bb-719e300f63eb/wirestory_3d9a7f2f708ce407cf534fe1ea91fe28_16x9.jpg?w=1600",
    "publishedAt": "2024-05-14T00:58:26Z",
    "content": "SACRAMENTO, Calif. -- California could require all new gas stoves sold in the state to carry a label warning users about pollutants they can release that have been linked to respiratory illnesses.\r\nT… [+4296 chars]"
  },
  {
    "source": {
        "id": "abc-news",
        "name": "ABC News"
    },
    "author": "The Associated Press",
    "title": "Arizona's high court is allowing the attorney general 90 more days on her abortion ban strategy",
    "description": "Arizona’s highest court has given the state’s attorney general another 90 days to decide further legal action in the case over a 160-year-old near-total abortion ban",
    "url": "https://abcnews.go.com/Politics/wireStory/arizonas-high-court-allowing-attorney-general-90-days-110195908",
    "urlToImage": "https://i.abcnewsfe.com/a/87d83634-8e65-4fdf-b6c1-420195a3c7b2/wirestory_577fc889367669ff24b435afb719ec79_16x9.jpg?w=1600",
    "publishedAt": "2024-05-14T00:54:08Z",
    "content": "PHOENIX -- Arizona's highest court on Monday gave the state's attorney general another 90 days to decide further legal action in the case over a 160-year-old near-total ban on abortion that lawmakers… [+1893 chars]"
  }
];

const mockNewsContextValue = {
  news: [],
  newsSources: [],
  setNews: jest.fn(),
  setNewsSources: jest.fn(),
  filteredNewsSources: [],
  filterNewsSourcesByCategory: jest.fn(), 
};

describe('NewsSource Component Tests', () => {
  test('renders loading state initially', async () => {
    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsSource />
        </NewsContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state if fetching news fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Fake error'));
    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsSource />
        </NewsContext.Provider>
      </BrowserRouter>
    );
    await screen.findByText('Something went wrong. Please try again later.');
  });

  test('renders news sources when data is fetched successfully', async () => {
    const mockNewsContextValue = {
      news: mockNewsSources,
      newsSources: [],
      setNews: jest.fn(),
      setNewsSources: jest.fn(),
      filteredNewsSources: [],
      filterNewsSourcesByCategory: jest.fn(), 
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ status: 'ok', articles: mockNewsSources, total: 1 }),
    });
    jest.useFakeTimers(); 

    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <NewsSource />
        </NewsContext.Provider>
      </BrowserRouter>
    );
    await screen.findByTestId('newsSourceContainer');
    expect(screen.getByText("Arizona's high court is allowing the attorney general 90 more days on her abortion ban strategy")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(60000);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
