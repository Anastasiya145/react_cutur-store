import React from "react";
import "./orderSummary.scss";
import { BadgeType, SecurityBadge } from "../SecurityBadge/SecurityBadge";
import { LoadingButton } from "../LoadingButton";
import { ProductInCart } from "../../types/Product";

type Props = {
  cart: ProductInCart[];
  totalSum: number;
  isButtonContinueDisabled?: boolean;
  onCheckout: () => void;
  onContinue: () => void;
  buttonContinueText?: string;
  buttonBackText?: string;
  isDeliveryPriceShown?: boolean;
  buttonContinueLoading?: boolean;
  badgeType?: BadgeType;
};

export const OrderSummary: React.FC<Props> = ({
  cart,
  totalSum,
  onCheckout,
  onContinue,
  isButtonContinueDisabled = false,
  buttonContinueText = "Continuer",
  buttonContinueLoading = false,
  buttonBackText = "Retour",
  isDeliveryPriceShown = false,
  badgeType,
}) => {
  const shippingCost = isDeliveryPriceShown ? (totalSum > 50 ? 5.99 : 0) : 0;

  return (
    <div className="sidebar">
      <div className="order-summary">
        <h2 className="order-summary__title">Résumé de commande</h2>

        <div className="order-summary__items">
          {cart.map((item) => (
            <div key={item.id} className="order-summary__item">
              <span className="order-summary__item-name">
                {item.name} × {item.count}
              </span>
              <span className="order-summary__item-price">
                {(Number(item.price) * item.count).toFixed(2)}€
              </span>
            </div>
          ))}
        </div>

        {isDeliveryPriceShown && (
          <>
            <div className="order-summary__row order-summary__total">
              <span> {`Sous-total (${cart.length} articles)`}</span>
              <span>{Number(totalSum).toFixed(2)}€</span>
            </div>
            <div className="order-summary__row order-summary__total">
              <span> Livraison</span>
              <span>{Number(shippingCost).toFixed(2)}€</span>
            </div>
          </>
        )}

        <div className="order-summary__row order-summary__total">
          <span>Total</span>
          <span>{Number(totalSum + shippingCost).toFixed(2)}€</span>
        </div>

        <div className="order-summary__actions">
          <LoadingButton
            disabled={isButtonContinueDisabled}
            className="order-summary__checkout-btn"
            onClick={onCheckout}
            text={buttonContinueText}
            loading={buttonContinueLoading}
          />

          <button
            type="button"
            className="order-summary__continue-shopping"
            onClick={onContinue}
          >
            {buttonBackText}
          </button>
        </div>

        <SecurityBadge type={badgeType} />
      </div>
    </div>
  );
};

export default OrderSummary;
