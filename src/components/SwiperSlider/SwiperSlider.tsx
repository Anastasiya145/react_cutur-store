import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 4, navigation: false },
          800: { slidesPerView: 3, navigation: false },
          620: { slidesPerView: 1, navigation: false },
        }}
        a11y={{ enabled: true }}
        style={{ padding: "0 8px" }}
      >
        {sortedProducts.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
