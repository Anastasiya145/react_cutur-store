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
            <h1 className="section__title">Bienvenue chez Ma Douce Layette</h1>
            <p className="section__text">
              votre boutique en ligne dédiée aux accessoires bébé faits main,
              aux cadeaux de naissance originaux et aux créations couture
              artisanales. ✨ Ici, chaque pièce est pensée avec amour pour
              accompagner les premiers instants de bébé tout en douceur
            </p>
            <CategoriesPhotosCarousel />
          </section>
          <section className="section">
            <h1 className="section__title">Prix ​​chaud</h1>
            <SlickSlider products={products} sortBy={SortType.MaxDiscount} />
          </section>
          <section className="section">
            <h1 className="section__title">Par catégorie</h1>
            <CategoriesList />
          </section>
          <section className="section">
            <h1 className="section__title">Nouveaux modèles</h1>
            <SlickSlider products={products} sortBy={SortType.Newest} />
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
