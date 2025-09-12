import React from "react";
import Slider from "react-slick";
import { PathnamesForNav } from "../../types/Pathnames";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./categoriesPhotosCarousel.scss";

export const CategoriesPhotosCarousel: React.FC = () => {
  const banners = Object.keys(PathnamesForNav)
    .slice(1)
    .map((path) => path.toLowerCase());

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="slick-carousel">
      <Slider {...settings}>
        {banners.map((bannerName: string) => (
          <img
            key={bannerName}
            alt={`banner_${bannerName}`}
            src={`../../img/categories/${bannerName}.jpg`}
          />
        ))}
      </Slider>
    </div>
  );
};
