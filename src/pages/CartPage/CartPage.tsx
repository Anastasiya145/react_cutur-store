import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { ProductInCart } from "../../types/Product";
import { CheckoutCard } from "../../components/CheckoutCard/CheckoutCard";
import { LoadingButton } from "../../components/LoadingButton";
import { PageLayout } from "../../makets/PageLayout/PageLayout";
import "./cartPage.scss";
import { PathnamesApp } from "../../types/Pathnames";
import { BreadCrumbs } from "../../components/BreadCrumbs";

export const CartPage: React.FC = () => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  const unavailableItems = useMemo(
    () => cart.filter((item) => item.items_left === 0),
    [cart]
  );
  const hasUnavailable = unavailableItems.length > 0;
  const [loading, setLoading] = useState(false);

  const totalSum = useMemo(() => {
    return cart.reduce(
      (accumulator, item: ProductInCart) =>
        accumulator + item.price * item.count,
      0
    );
  }, [cart]);

  const totalModelsCount = useMemo(() => {
    return cart.reduce(
      (accumulator, item: ProductInCart) => accumulator + item.count,
      0
    );
  }, [cart]);

  const isAuthenticated = Boolean(localStorage.getItem("user"));

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(PathnamesApp.Paiement);
    }, 500);
  };

  return (
    <div className="cart-page">
      <BreadCrumbs />
      <h1 className="cart-page__title">Mon Panier</h1>

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

            <div className="cart-page__sidebar">
              <div className="cart-page__summary">
                <h2 className="cart-page__summary-title">Résumé de commande</h2>

                <div className="cart-page__summary-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-page__summary-item">
                      <span className="cart-page__summary-item-name">
                        {item.name} × {item.count}
                      </span>
                      <span className="cart-page__summary-item-price">
                        {(Number(item.price) * item.count).toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>

                <div className="cart-page__summary-divider"></div>

                <div className="cart-page__summary-row">
                  <span>
                    Sous-total ({totalModelsCount} article
                    {totalModelsCount > 1 ? "s" : ""})
                  </span>
                  <span>{Number(totalSum).toFixed(2)}€</span>
                </div>

                <div className="cart-page__summary-row cart-page__summary-total">
                  <span>Total</span>
                  <span>{Number(totalSum).toFixed(2)}€</span>
                </div>

                <div className="cart-page__actions">
                  <LoadingButton
                    text={
                      !isAuthenticated
                        ? "Se connecter pour commander"
                        : "Passer la commande"
                    }
                    loading={loading}
                    disabled={hasUnavailable || loading}
                    className="cart-page__checkout-btn"
                    onClick={handleCheckout}
                  />

                  <button
                    type="button"
                    className="cart-page__continue-shopping"
                    onClick={() => navigate("/")}
                  >
                    Continuer mes achats
                  </button>
                </div>

                <div className="cart-page__security">
                  <div className="cart-page__security-icon">🔒</div>
                  <div className="cart-page__security-text">
                    <div className="cart-page__security-title">
                      Achat sécurisé
                    </div>
                    <div className="cart-page__security-desc">
                      Vos données sont protégées
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
