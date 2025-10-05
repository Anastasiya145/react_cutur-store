import React, { useEffect, useState } from "react";
import { CategoriesList } from "../../components/CategoriesList/CategoriesList";
import { Product } from "../../types/Product";
import { SortType } from "../../types/SortType";
import { Loader } from "../../components/Loader/Loader";
import "./homePage.scss";
import { getProducts } from "../../api/productsApi";
import { BannerSwiper } from "../../components/BannerSwiper/BannerSwiper";
import { SwiperSlider } from "../../components/SwiperSlider/SwiperSlider";

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
        <div className="home-page__home">
          <section className="home-page__section">
            <h1 className="home-page__title">
              Bienvenue chez Ma Douce Layette
            </h1>
            <p className="home-page__text">
              Votre boutique en ligne dédiée aux accessoires bébé faits main,
              aux cadeaux de naissance originaux et aux créations couture
              artisanales. ✨
              <br />
              Ici, chaque pièce est pensée avec amour pour accompagner les
              premiers instants de bébé tout en douceur
            </p>
            <BannerSwiper />
          </section>
          <section className="home-page__section">
            <h1 className="home-page__title">Prix ​​chaud</h1>
            <SwiperSlider products={products} sortBy={SortType.MaxDiscount} />
          </section>
          <section className="home-page__section">
            <h1 className="home-page__title">Par catégorie</h1>
            <CategoriesList />
          </section>
          <section className="home-page__section">
            <h1 className="home-page__title">Nouveaux modèles</h1>
            <SwiperSlider products={products} sortBy={SortType.Newest} />
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
