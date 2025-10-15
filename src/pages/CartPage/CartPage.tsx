import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { ProductInCart } from "../../types/Product";
import { CheckoutCard } from "../../components/CheckoutCard/CheckoutCard";
import { LoadingButton } from "../../components/LoadingButton";
import "./cartPage.scss";
import { PathnamesApp } from "../../types/Pathnames";

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

  if (!cart.length) {
    return (
      <div className="cart-page">
        <div className="cart-page__container">
          <div className="cart-page__empty">
            <div className="cart-page__empty-icon">🛒</div>
            <h1 className="cart-page__empty-title">Votre panier est vide</h1>
            <p className="cart-page__empty-text">
              Découvrez nos produits et ajoutez vos articles préférés à votre
              panier.
            </p>
            <LoadingButton
              text="Continuer mes achats"
              loading={false}
              className="cart-page__empty-button"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
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
                      {(item.price * item.count).toFixed(2)}€
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
                <span>{totalSum.toFixed(2)}€</span>
              </div>

              <div className="cart-page__summary-row cart-page__summary-total">
                <span>Total</span>
                <span>{totalSum.toFixed(2)}€</span>
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
    </div>
  );
};
