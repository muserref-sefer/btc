import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { NewsContextType } from "../../@types/types";
import { NewsContext } from "../../store/Context";
import NewsItem from "../NewsItem/NewsItem";
import "./NewsSlider.scss";

function NewsSlider() {
  const { news } = useContext(NewsContext) as NewsContextType;
  const threeItemsOfNews = news.slice(0, 3);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1078,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      },
    ]
  };

  return (
    <div className="newsSlider">
      <div className="sliderContainer">
        <Slider {...settings}>
          {threeItemsOfNews.map(news => 
            <div className="sliderItemWrapper" key={`sliderItem${news.source.name}`}>
              <div className="sliderItem">
                <NewsItem news={news} />
              </div>
            </div>
          )}
        </Slider>
      </div>
    </div>
  );
}

export default NewsSlider