import React, { useEffect, useState } from 'react'
import { INews, INewsSource, NewsContextType } from '../@types/types'

export const NewsContext = React.createContext<NewsContextType | null>(null)

const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [news, setNews] = useState<INews[]>([])
  const [newsSources, setNewsSources] = useState<INewsSource[]>([])
  const [filteredNewsSources, setFilteredNewsSources] = useState<INewsSource[]>(
    []
  )

  const filterNewsSourcesByCategory = (categories: string[]) => {
    if (!categories.length) {
      setFilteredNewsSources(newsSources)
      return
    }

    const filteredItems = newsSources.filter(newsSource =>
      categories.includes(newsSource.category)
    )
    setFilteredNewsSources(filteredItems)
  }

  useEffect(() => {
    setFilteredNewsSources(newsSources)
  }, [newsSources])

  return (
    <NewsContext.Provider
      value={{
        newsSources,
        setNewsSources,
        filteredNewsSources,
        filterNewsSourcesByCategory,
        news,
        setNews
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export default NewsProvider
