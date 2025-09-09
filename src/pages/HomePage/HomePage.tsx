import React from "react";
import { CategoriesList } from "../../components/CategoriesList/CategoriesList";
import { Product } from "../../types/Product";
import { SortType } from "../../types/SortType";
import { SlickSlider } from "../../components/SlickSlider/SlickSlider";
import { Loader } from "../../components/Loader/Loader";
import { SlickCarousel } from "../../components/SlickCarousel/SlickCarousel";
import "./homePage.scss";

export type Props = {
  products: Product[];
  isLoading: boolean;
};

export const HomePage: React.FC<Props> = ({ products, isLoading }) => {
  return (
    <>
      {!isLoading ? (
        <div className="page__home">
          <section className="section">
            <h1 className="section__title">Welcome to my store!</h1>
            <SlickCarousel />
          </section>
          <section className="section">
            <h1 className="section__title">Hot prices</h1>
            <SlickSlider products={products} sortBy={SortType.MaxDiscount} />
          </section>
          <section className="section">
            <h1 className="section__title">Shop by category</h1>
            <CategoriesList />
          </section>
          <section className="section">
            <h1 className="section__title">Brand new models</h1>
            <SlickSlider products={products} sortBy={SortType.Newest} />
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
