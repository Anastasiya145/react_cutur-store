import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";
import { sortProducts } from "../../helpers/sortHelper";
import { SortType } from "../../types/SortType";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slickSlider.scss";
import { IconArrowRight } from "../Icon/IconArrowRight";
import { IconArrowLeft } from "../Icon/IconArrowLeft";

export type Props = {
  products: Product[];
  sortBy: SortType;
};

export const SlickSlider: React.FC<Props> = ({ products, sortBy }) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const sortedProducts = sortProducts(products, sortBy);

    setVisibleProducts(sortedProducts);
  }, [products]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    adaptiveHeight: true,
    prevArrow: (
      <IconArrowLeft
        style={{ width: 40, height: 40 }}
        className="slick-arrow"
      />
    ),
    nextArrow: (
      <IconArrowRight
        style={{ width: 40, height: 40 }}
        className="slick-arrow"
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
          arrows: false,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="product-slider">
      <Slider {...settings}>
        {visibleProducts.map((item: Product) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Slider>
    </div>
  );
};
