import { useContext } from "react";
import { NewsContextType } from "../../@types/types";
import { NewsContext } from "../../store/Context";
import NewsItem from "../NewsItem/NewsItem";
import "./NewsList.scss";

function NewsList() {
  const { news } = useContext(NewsContext) as NewsContextType;
  let newsExceptFirstThere = news.slice(3);

  if (newsExceptFirstThere.length === 0) {
    return <p className="message">There is no more news.</p>;
  }

  return (
    <div className="newsList">
      {newsExceptFirstThere.map((news, index) => {
        return (
          <div className="news" key={`news-${news.source.id}-${index}`}>
            <NewsItem news={news} />
          </div>
        )
      })}
    </div>
  )
}

export default NewsList