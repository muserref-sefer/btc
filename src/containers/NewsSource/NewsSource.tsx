import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NewsContextType } from '../../@types/types'
import NewsList from '../../components/NewsList/NewsList'
import NewsSlider from '../../components/NewsSlider/NewsSlider'
import { NewsContext } from '../../store/Context'
import './NewsSource.scss'

function NewsSource() {
  const { slug } = useParams() as { slug: string }
  const { setNews } = useContext(NewsContext) as NewsContextType
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNews = () => {
    setLoading(true)
    setError(null)

    return fetch(
      `https://newsapi.org/v2/top-headlines/?sources=${slug}&language=en&apiKey=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then(data => {
        if (data.status === 'ok') {
          const sortedData = data.articles.sort(
            (
              prev: { publishedAt: moment.MomentInput },
              next: { publishedAt: moment.MomentInput }
            ) => {
              return moment(next.publishedAt).diff(prev.publishedAt)
            }
          )

          setNews(sortedData)
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
    fetchNews()

    const timeout = setInterval(() => {
      fetchNews()
    }, 60000)

    return () => clearInterval(timeout)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div data-testid="newsSource">
      {loading ? (
        <p className="message">Loading...</p>
      ) : error ? (
        <p className="message">Something went wrong. Please try again later.</p>
      ) : (
        <div data-testid="newsSourceContainer">
          <NewsSlider />
          <div className="newsListContainer">
            <div className="newsListHeader">
              <h2 className="headerTitle">Spot + Futures</h2>
              <Link className="newsBtn" to="/">
                {'<'} Go to News
              </Link>
            </div>
            <NewsList />
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsSource
