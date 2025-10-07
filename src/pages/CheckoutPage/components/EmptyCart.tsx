import React from "react";
import { useNavigate } from "react-router-dom";

export const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        <div className="checkout-page__empty">
          <h1 className="checkout-page__title">Votre panier est vide</h1>
          <p className="checkout-page__text">
            Ajoutez des articles à votre panier pour passer commande.
          </p>
          <button
            className="checkout-page__button"
            onClick={() => navigate("/")}
          >
            Continuer mes achats
          </button>
        </div>
      </div>
    </div>
  );
};
