import { render, screen } from '@testing-library/react'
import App from './App'
import { NewsContext } from './store/Context'

const mockNewsContextValue = {
  news: [],
  newsSources: [],
  setNews: jest.fn(),
  setNewsSources: jest.fn(),
  filteredNewsSources: [],
  filterNewsSourcesByCategory: jest.fn()
}

test('renders header', () => {
  render(
    <NewsContext.Provider value={mockNewsContextValue}>
      <App />
    </NewsContext.Provider>
  )
  const headerElement = screen.getByTestId('header')
  expect(headerElement).toBeInTheDocument()
})

test('navigates to Home when "/" is accessed', () => {
  window.history.pushState({}, 'Home', '/')
  render(
    <NewsContext.Provider value={mockNewsContextValue}>
      <App />
    </NewsContext.Provider>
  )
  const homeElement = screen.getByTestId('home')
  expect(homeElement).toBeInTheDocument()
})

test('navigates to NewsSource when "/source/:slug" is accessed', () => {
  window.history.pushState({}, 'News Source', '/source/source-slug')
  render(
    <NewsContext.Provider value={mockNewsContextValue}>
      <App />
    </NewsContext.Provider>
  )
  const sourceElement = screen.getByTestId('newsSource')
  expect(sourceElement).toBeInTheDocument()
})

test('navigates to NewsDetail when "/detail/:source/:slug" is accessed', () => {
  window.history.pushState({}, 'News Detail', '/detail/source-slug/news-slug')
  render(
    <NewsContext.Provider value={mockNewsContextValue}>
      <App />
    </NewsContext.Provider>
  )
  const detailElement = screen.getByTestId('newsDetail')
  expect(detailElement).toBeInTheDocument()
})

test('renders NotFound for unknown routes', () => {
  window.history.pushState({}, 'Unknown Route', '/unknown-route')
  render(
    <NewsContext.Provider value={mockNewsContextValue}>
      <App />
    </NewsContext.Provider>
  )
  const notFoundElement = screen.getByTestId('notFound')
  expect(notFoundElement).toBeInTheDocument()
})
