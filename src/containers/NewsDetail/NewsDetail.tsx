import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { INews } from "../../@types/types";
import NewsDetailItem from "../../components/NewsDetailItem/NewsDetailItem";
import { slugify } from "../../helpers";
import "./NewsDetail.scss";

function NewsDetail() {
  const defaultNewsItem = {
    source: {
      id: "",
      name: "",
    },
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: "",
    content: ""
  }
  const { source, slug } = useParams() as { source: string, slug: string }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newsItem, setNewsItem] = useState(defaultNewsItem);

  const fetchNews = () => {
    setLoading(true);
    setError(null);

    return fetch(`https://newsapi.org/v2/top-headlines/?sources=${source}&language=en&apiKey=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if(data.status === "ok") {
          const newsDetail = data.articles.find((item: INews) => {
            return slugify(item.title) === slug
          })
          setNewsItem(newsDetail);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching news:", error);
      });
  }

  useEffect(() => {
    fetchNews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="detailContainer" data-testid="newsDetail">
      <div className="newsDetail">
        {loading ? (
          <p className="message">Loading...</p>
        ) : error ? (
          <p className="message">Something went wrong. Please try again later.</p>
        ) : (
          <>
            <NewsDetailItem news={newsItem} />
            <Link className="backBtn" to={`/source/${newsItem.source.id}`}>{'<'} Go back</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default NewsDetail