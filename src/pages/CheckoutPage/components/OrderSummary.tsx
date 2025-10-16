import React from "react";
import { ProductInCart } from "../../../types/Product";
import { LoadingButton } from "../../../components/LoadingButton";
import { SecurityBadge } from "../../../components/SecurityBadge/SecurityBadge";
import { deliveryMessages } from "../../../constants/messages";

interface OrderSummaryProps {
  cart: ProductInCart[];
  total: number;
  shippingCost: number;
  finalTotal: number;
  currentStep: number;
  loading: boolean;
  onBack: () => void;
  onContinue: () => void;
  isValid: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  total,
  shippingCost,
  finalTotal,
  currentStep,
  loading,
  onBack,
  onContinue,
  isValid,
}) => {
  return (
    <div className="checkout-page__summary">
      <h3 className="checkout-page__summary-title">Résumé de commande</h3>

      <div className="checkout-page__summary-items">
        {cart.map((item) => (
          <div key={item.id} className="checkout-page__summary-item">
            <span className="checkout-page__summary-item-name">
              {item.name} × {item.count}
            </span>
            <span className="checkout-page__summary-item-price">
              {(Number(item.price) * item.count).toFixed(2)}€
            </span>
          </div>
        ))}
      </div>

      <div className="checkout-page__summary-row">
        <span>
          Sous-total ({cart.length} article{cart.length > 1 ? "s" : ""})
        </span>
        <span>{total.toFixed(2)}€</span>
      </div>

      <div className="checkout-page__summary-row">
        <span>Livraison</span>
        <span>
          {shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}€`}
        </span>
      </div>

      <div className="checkout-page__free-shipping-info">
        {deliveryMessages.freeShipping}
      </div>

      <div className="checkout-page__summary-divider"></div>

      <div className="checkout-page__summary-row checkout-page__summary-total">
        <span>Total</span>
        <span>{finalTotal.toFixed(2)}€</span>
      </div>

      <SecurityBadge />

      <div className="checkout-page__actions">
        {currentStep === 2 && (
          <button
            type="button"
            className="checkout-page__back-btn"
            onClick={onBack}
          >
            Retour
          </button>
        )}

        <LoadingButton
          text={currentStep === 1 ? "Continuer" : "Confirmer la commande"}
          loading={loading}
          disabled={loading || !isValid}
          className="checkout-page__submit-btn"
          onClick={onContinue}
        />
      </div>
    </div>
  );
};
