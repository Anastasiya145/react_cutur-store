import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./bannerSwiper.scss";
import { PathnamesForNav } from "../../types/Pathnames";

export const BannerSwiper: React.FC = () => {
  const banners = Object.keys(PathnamesForNav)
    .slice(1)
    .map((path) => path.toLowerCase());

  return (
    <div className="banner-swiper">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={500}
        loop={true}
        a11y={{ enabled: true }}
      >
        {banners.map((bannerName: string) => (
          <SwiperSlide key={bannerName}>
            <img
              alt={`banner_${bannerName}`}
              src={`img/categories/${bannerName}.jpg`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
