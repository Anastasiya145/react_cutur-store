import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { PageLayout } from "../../makets/PageLayout";
import { ModelsCounter } from "../../components/ModelsCounter/ModelsCounter";
import { ProductList } from "../../components/ProductList/ProductList";
import "./favoritesPage.scss";

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(AppContext);
  const [productCount, setProductCount] = useState(favorites.length);
  const navigate = useNavigate();

  const handleVisibleProductsNumber = (number: number) => {
    setProductCount(number);
  };

  return (
    <div className="favorites-page">
      <BreadCrumbs />
      <h1 className="favorites-page__title">Favorites</h1>
      <ModelsCounter number={productCount} />

      {!favorites.length ? (
        <PageLayout
          icon="💔"
          title="Votre liste de favoris est vide"
          description="Explorez notre catalogue et ajoutez vos produits préférés à votre liste de souhaits."
          buttonText="Découvrir les produits"
          onButtonClick={() => navigate("/")}
          className="page-layout--favorites"
        />
      ) : (
        <ProductList
          products={favorites}
          handleVisibleProductsNumber={handleVisibleProductsNumber}
        />
      )}
    </div>
  );
};
