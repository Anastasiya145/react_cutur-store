import React, { useState } from "react";
import { createOrder } from "../../api/ordersApi";
import { useAppContext } from "../../context/AppContextProvider";
import { useAuth } from "../../context/AuthContext";
import { OrderItem, CreateOrderRequest } from "../../types/Order";
import "./CheckoutPage.scss";

const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { cart, clearCart } = useAppContext();
  const { user } = useAuth();

  // Build order items from cart
  const orderItems: OrderItem[] = cart.map((item) => ({
    name: item.name,
    quantity: item.count,
    price: item.price,
    image: item.images[0] || "",
  }));

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const orderData: CreateOrderRequest = {
    user_email: user || "",
    date: new Date().toISOString(),
    status: "pending",
    total,
    items: orderItems,
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createOrder(orderData);
      setSuccess(true);
      // Clear cart after success
      clearCart();
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
      <button
        className="checkout-page__button"
        onClick={handleCheckout}
        disabled={loading || success || cart.length === 0}
      >
        {loading ? "Envoi en cours..." : "Confirmer la commande"}
      </button>
      {error && <div className="checkout-page__error-message">{error}</div>}
      {success && (
        <div className="checkout-page__success-message">Commande réussie !</div>
      )}
    </div>
  );
};

export default CheckoutPage;
