import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NewsContext } from '../../store/Context'
import Home from './Home'

const mockfilteredNewsSources = [
  {
    id: 'abc-news',
    name: 'ABC News',
    description:
      'Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.',
    url: 'https://abcnews.go.com',
    category: 'general',
    language: 'en',
    country: 'us'
  }
]

const mockNewsContextValue = {
  news: [],
  newsSources: [],
  setNews: jest.fn(),
  setNewsSources: jest.fn(),
  filteredNewsSources: mockfilteredNewsSources,
  filterNewsSourcesByCategory: jest.fn()
}

describe('Home Component Tests', () => {
  test('renders loading state initially', async () => {
    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <Home />
        </NewsContext.Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull())
  })

  test('renders error state if fetching news fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Fake error'))
    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <Home />
        </NewsContext.Provider>
      </BrowserRouter>
    )
    await screen.findByText('Something went wrong. Please try again later.')
  })

  test('renders news sources when data is fetched successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ status: 'ok', sources: mockfilteredNewsSources })
    })
    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <Home />
        </NewsContext.Provider>
      </BrowserRouter>
    )
    await screen.findByTestId('news-sources')
    expect(screen.getByText('ABC News')).toBeInTheDocument()
  })

  test('correctly handles category filtering', async () => {
    const mockNewsContextValue = {
      news: [],
      newsSources: mockfilteredNewsSources,
      setNews: jest.fn(),
      setNewsSources: jest.fn(),
      filteredNewsSources: mockfilteredNewsSources,
      filterNewsSourcesByCategory: jest.fn()
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ status: 'ok', sources: mockfilteredNewsSources })
    })

    render(
      <BrowserRouter>
        <NewsContext.Provider value={mockNewsContextValue}>
          <Home />
        </NewsContext.Provider>
      </BrowserRouter>
    )

    await screen.findByTestId('news-sources')

    fireEvent.click(screen.getByText('general'))

    expect(screen.getByText('ABC News')).toBeInTheDocument()
  })
})
