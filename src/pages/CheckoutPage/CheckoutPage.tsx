import React, { useState } from "react";
import { createOrder } from "../../api/ordersApi";
import { useAppContext } from "../../context/AppContextProvider";
import { useAuth } from "../../context/AuthContext";
import { CreateOrderRequest } from "../../types/Order";
import "./CheckoutPage.scss";
import { useNavigate } from "react-router-dom";
import { PathnamesForUserMenu } from "../../types/Pathnames";
import { LoadingButton } from "../../components/LoadingButton";

const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { cart, clearCart } = useAppContext();
  const { user } = useAuth();

  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const orderDataForMutation: CreateOrderRequest = {
    user_email: user || "",
    items: cart.map((item) => ({
      id: item.id,
      quantity: item.count,
    })),
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createOrder(orderDataForMutation);
      setSuccess(true);
      clearCart();
      navigate(PathnamesForUserMenu.Commandes);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-page__title">Finaliser la commande</h1>
      <div className="checkout-page__summary">
        <h2 className="checkout-page__subtitle">Résumé de la commande</h2>
        {cart.length === 0 ? (
          <div className="checkout-page__text">Votre panier est vide.</div>
        ) : (
          <ul className="checkout-page__list">
            {cart.map((item) => (
              <li key={item.id} className="checkout-page__item">
                {item.name} x {item.count} — {item.price}€
              </li>
            ))}
          </ul>
        )}
        <div className="checkout-page__total">Total: {total}€</div>
      </div>
      <LoadingButton
        text="Confirmer la commande"
        loading={loading}
        disabled={loading || success || cart.length === 0}
        onClick={handleCheckout}
      />
      {error && <div className="checkout-page__error">{error}</div>}
      {success && (
        <div className="checkout-page__success">Commande réussie !</div>
      )}
    </div>
  );
};

export default CheckoutPage;
