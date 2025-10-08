import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./swiperSlider.scss";
import { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";
import { sortProducts } from "../../helpers/sortHelper";
import { SortType } from "../../types/SortType";

export type Props = {
  products: Product[];
  sortBy: SortType;
};

export const SwiperSlider: React.FC<Props> = ({ products, sortBy }) => {
  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div className="product-slider">
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={16}
        // Use 'auto' so Swiper will show as many slides as fit the viewport
        slidesPerView={"auto"}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // keep a simple breakpoint: on very small screens show 1 slide
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          768: {
            // from tablet upwards use auto sizing so multiple cards fit
            slidesPerView: "auto",
            spaceBetween: 16,
          },
        }}
        autoplay={
          sortedProducts.length > 4
            ? {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        slidesPerGroup={1}
        speed={600}
        grabCursor={true}
        centeredSlides={false}
        watchSlidesProgress={true}
        a11y={{ enabled: true }}
        loop={sortedProducts.length > 4}
      >
        {sortedProducts.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
};
