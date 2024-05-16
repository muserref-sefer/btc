import { render, screen } from '@testing-library/react'
import { NewsContext } from '../../store/Context'
import NewsList from './NewsList'

const mockNewsContextValue = {
  news: [],
  newsSources: [],
  setNews: jest.fn(),
  setNewsSources: jest.fn(),
  filteredNewsSources: [],
  filterNewsSourcesByCategory: jest.fn()
}

describe('NewsList Component Tests', () => {
  test('renders "no more news" message when news list is empty', () => {
    render(
      <NewsContext.Provider value={mockNewsContextValue}>
        <NewsList />
      </NewsContext.Provider>
    )

    expect(screen.getByText('There is no more news.')).toBeInTheDocument()
  })
})
