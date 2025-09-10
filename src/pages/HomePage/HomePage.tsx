import React, { useEffect, useState } from "react";
import { CategoriesList } from "../../components/CategoriesList/CategoriesList";
import { Product } from "../../types/Product";
import { SortType } from "../../types/SortType";
import { SlickSlider } from "../../components/SlickSlider/SlickSlider";
import { Loader } from "../../components/Loader/Loader";
import "./homePage.scss";
import { getProducts } from "../../api/fetchData";
import { CategoriesPhotosCarousel } from "../../components/SlickCarousel/CategoriesPhotosCarousel";

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadProducts() {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="page__home">
          <section className="section">
            <h1 className="section__title">Welcome to my store!</h1>
            <CategoriesPhotosCarousel />
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
