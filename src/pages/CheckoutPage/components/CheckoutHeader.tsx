import React from "react";

interface CheckoutHeaderProps {
  currentStep: number;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  currentStep,
}) => {
  return (
    <div className="checkout-page__header">
      <h1 className="checkout-page__title">Finaliser la commande</h1>
      <div className="checkout-page__steps">
        <div
          className={`checkout-page__step ${currentStep >= 1 ? "active" : ""}`}
        >
          <span className="checkout-page__step-number">1</span>
          <span className="checkout-page__step-label">Livraison</span>
        </div>
        <div className="checkout-page__step-divider"></div>
        <div
          className={`checkout-page__step ${currentStep >= 2 ? "active" : ""}`}
        >
          <span className="checkout-page__step-number">2</span>
          <span className="checkout-page__step-label">Confirmation</span>
        </div>
      </div>
    </div>
  );
};
