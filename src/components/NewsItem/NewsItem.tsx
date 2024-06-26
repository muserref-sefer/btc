import moment from 'moment'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { INews } from '../../@types/types'
import { onImageError, slugify } from '../../helpers'
import './NewsItem.scss'

const notFoundImage = '/assets/img-not-found.jpeg'
const placeholderImage = '/assets/img-placeholder.jpeg'

function NewsItem({ news }: { news: INews }) {
  const [newsList, setNewsList] = useState([])
  const isExistNews = isNewsInReadList(news.title)

  function isNewsInReadList(newsTitle: string): boolean {
    const newsSlug = slugify(newsTitle)
    const readList: string[] = JSON.parse(
      localStorage.getItem('readList') || '[]'
    )
    return readList.includes(newsSlug)
  }

  function renderToggleRead() {
    if (isExistNews) {
      return (
        <>
          <img src="/assets/icon-remove.svg" alt="plus" /> Remove from read list
        </>
      )
    } else {
      return (
        <>
          <img src="/assets/icon-plus.svg" alt="plus" /> Add to read list
        </>
      )
    }
  }

  function toggleReadList() {
    const newsSlug = slugify(news.title)
    let readList: string[] = JSON.parse(
      localStorage.getItem('readList') || '[]'
    )
    const index = readList.indexOf(newsSlug)

    if (isExistNews) {
      readList.splice(index, 1)
    } else {
      readList.push(newsSlug)
    }

    localStorage.setItem('readList', JSON.stringify(readList))
    setNewsList([...newsList])
  }

  return (
    <>
      <Link to={`/detail/${slugify(news.source.id)}/${slugify(news.title)}`}>
        <LazyLoadImage
          className="newsImage"
          src={news.urlToImage || notFoundImage}
          alt="news-img"
          onError={onImageError}
          placeholderSrc={placeholderImage}
        />
        <span className="title">{news.title}</span>
      </Link>
      <div className="linkWrapper">
        <button className="link" onClick={toggleReadList}>
          {renderToggleRead()}
        </button>
        <span className="date">
          {moment(news.publishedAt).utc().format('DD.MM')}
        </span>
      </div>
    </>
  )
}

export default NewsItem
