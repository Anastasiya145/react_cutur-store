import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { ProductInCart } from "../../types/Product";
import { CheckoutCard } from "../../components/CheckoutCard/CheckoutCard";
import { PageLayout } from "../../makets/PageLayout/PageLayout";
import "./cartPage.scss";
import { PathnamesApp } from "../../types/Pathnames";
import { BreadCrumbs } from "../../components/BreadCrumbs";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

export const CartPage: React.FC = () => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  const unavailableItems = useMemo(
    () => cart.filter((item) => item.items_left === 0),
    [cart]
  );
  const hasUnavailable = unavailableItems.length > 0;

  const totalSum = useMemo(() => {
    return cart.reduce(
      (accumulator, item: ProductInCart) =>
        accumulator + item.price * item.count,
      0
    );
  }, [cart]);

  const isAuthenticated = Boolean(localStorage.getItem("user"));

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate(PathnamesApp.Connexion);
      return;
    }

    navigate(PathnamesApp.Paiement);
  };

  return (
    <div className="cart-page">
      <BreadCrumbs />

      {!cart.length ? (
        <PageLayout
          icon="🛒"
          title="Votre panier est vide"
          description="Découvrez nos produits et ajoutez vos articles préférés à votre panier."
          buttonText="Continuer mes achats"
          onButtonClick={() => navigate("/")}
          className="page-layout--cart"
        />
      ) : (
        <div className="cart-page__container">
          <div className="cart-page__header">
            <h1 className="cart-page__title">Mon Panier</h1>
            <div className="cart-page__items-count">
              {cart.length} article{cart.length > 1 ? "s" : ""}
            </div>
          </div>

          <div className="cart-page__content">
            <div className="cart-page__main">
              {hasUnavailable && (
                <div className="cart-page__warning">
                  <div className="cart-page__warning-icon">⚠️</div>
                  <div className="cart-page__warning-text">
                    Certains articles de votre panier ne sont plus disponibles.
                    Veuillez les retirer pour continuer.
                  </div>
                </div>
              )}

              <div className="cart-page__products">
                {cart.map((item) => (
                  <CheckoutCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <OrderSummary
              onCheckout={handleCheckout}
              onContinue={() => navigate(PathnamesApp.Accueil)}
              cart={cart}
              totalSum={totalSum}
              buttonContinueText={
                !isAuthenticated
                  ? "Se connecter pour commander"
                  : "Passer la commande"
              }
              buttonBackText="Continuer mes achats"
              badgeType="achat"
            />
          </div>
        </div>
      )}
    </div>
  );
};
