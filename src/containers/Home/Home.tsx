import { useContext, useEffect, useState } from 'react'
import { NewsContextType } from '../../@types/types'
import Filter from '../../components/Filter/Filter'
import NewsSourceList from '../../components/NewsSourceList/NewsSourceList'
import { NewsContext } from '../../store/Context'
import './Home.scss'

function Home() {
  const { setNewsSources } = useContext(NewsContext) as NewsContextType
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNewSources = () => {
    setLoading(true)
    setError(null)

    return fetch(
      `https://newsapi.org/v2/sources?language=en&apiKey=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        if (data.status === 'ok') {
          setNewsSources(data.sources)
          setLoading(false)
        }
      })
      .catch(error => {
        setError(error)
        setLoading(false)
        console.error('Error fetching news:', error)
      })
  }

  useEffect(() => {
    fetchNewSources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container" data-testid="home">
      <Filter />
      {loading ? (
        <p className="message">Loading...</p>
      ) : error ? (
        <p className="message">Something went wrong. Please try again later.</p>
      ) : (
        <div data-testid="news-sources">
          <NewsSourceList />
        </div>
      )}
    </div>
  )
}

export default Home
