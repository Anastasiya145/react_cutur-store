import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { NotFound } from "../../components/NotFound/NotFound";
import { ModelsCounter } from "../../components/ModelsCounter/ModelsCounter";
import { ProductList } from "../../components/ProductList/ProductList";
import "./favoritesPage.scss";

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(AppContext);
  const [productCount, setProductCount] = useState(favorites.length);

  const handleVisibleProductsNumber = (number: number) => {
    setProductCount(number);
  };



  return (
    <div className=".favorites-page">
      <BreadCrumbs />
      <h1 className="favorites-page__title">Favorites</h1>
      <ModelsCounter number={productCount} />

      {!favorites.length ? (
        <NotFound title="Your favorites list is empty" />
      ) : (
        <ProductList
          products={favorites}
          handleVisibleProductsNumber={handleVisibleProductsNumber}
        />
      )}
    </div>
  );
};
