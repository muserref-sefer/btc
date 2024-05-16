import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NewsContextType } from '../../@types/types'
import { NewsContext } from '../../store/Context'
import NotFoundNews from '../NotFoundNews/NotFoundNews'
import './NewsSourceList.scss'

function NewsSourceList() {
  const { filteredNewsSources } = useContext(NewsContext) as NewsContextType

  return (
    <div className="newsSourceList">
      {filteredNewsSources.length === 0 ? (
        <NotFoundNews />
      ) : (
        filteredNewsSources.map(newsSource => (
          <Link
            to={`/source/${newsSource.id}`}
            className="newsSource"
            key={`newsSource${newsSource.id}`}
          >
            <h3 className="title">{newsSource.name}</h3>
            <div className="descriptionWrapper">
              <p className="description">{newsSource.description}</p>
              <img src="/assets/icon-arrow.svg" alt="arrow" />
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default NewsSourceList
