import React from "react";
import "./checkoutHeader.scss";
import classNames from "classnames";

interface CheckoutHeaderProps {
  currentStep: number;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  currentStep,
}) => {
  const steps = [
    { number: 1, label: "Livraison" },
    { number: 2, label: "Confirmation" },
    { number: 3, label: "Paiement" },
  ];

  return (
    <div className="checkout-header">
      <h1 className="checkout-header__title">Finaliser la commande</h1>
      <div className="checkout-header__steps">
        {steps.map((step) => (
          <div className="checkout-header__step-wrapper" key={step.number}>
            <div
              className={classNames("checkout-header__step", {
                active: currentStep === step.number,
              })}
            >
              <span className="checkout-header__step-number">
                {step.number}
              </span>
              <span className="checkout-header__step-label">{step.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
