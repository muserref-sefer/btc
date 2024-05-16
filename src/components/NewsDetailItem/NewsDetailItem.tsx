import moment from 'moment'
import { SyntheticEvent, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { INews } from '../../@types/types'
import { slugify } from '../../helpers'
import './NewsDetailItem.scss'

const notFoundImage = '/assets/img-not-found.jpeg'
const placeholderImage = '/assets/img-placeholder.jpeg'

const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  const imgElement = e.target as HTMLImageElement
  if (imgElement.src !== placeholderImage) {
    imgElement.src = notFoundImage
  }
}

function NewsDetailItem({ news }: { news: INews }) {
  const [newsList, setNewsList] = useState([])

  function isNewsInReadList(newsTitle: string): boolean {
    const newsSlug = slugify(newsTitle)
    const readList: string[] = JSON.parse(
      localStorage.getItem('readList') || '[]'
    )
    return readList.includes(newsSlug)
  }

  function renderToggleRead() {
    if (isNewsInReadList(news.title)) {
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

    if (isNewsInReadList(news.title)) {
      readList.splice(index, 1)
    } else {
      readList.push(newsSlug)
    }

    localStorage.setItem('readList', JSON.stringify(readList))
    setNewsList([...newsList])
  }

  return (
    <>
      <span className="title">{news.title}</span>
      <LazyLoadImage
        className="newsImage"
        src={news.urlToImage || notFoundImage}
        alt="news-img"
        onError={onImageError}
        placeholderSrc={placeholderImage}
      />
      <p className="content">{news.content}</p>
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

export default NewsDetailItem
