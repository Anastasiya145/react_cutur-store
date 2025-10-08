import React from "react";
import "./deliveryOptions.scss";

interface DeliveryOptionsProps {
  shippingCost: number;
}

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  shippingCost,
}) => {
  return (
    <div className="delivery-options">
      <h3 className="delivery-options__title">Options de livraison</h3>
      <div className="delivery-options__method">
        <input
          type="radio"
          id="standard"
          value="standard"
          defaultChecked
          className="delivery-options__radio"
        />
        <label htmlFor="standard" className="delivery-options__radio-label">
          <div className="delivery-options__info">
            <div className="delivery-options__name">Livraison standard</div>
            <div className="delivery-options__time">3-5 jours ouvrés</div>
          </div>
          <div className="delivery-options__price">
            {shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}€`}
          </div>
        </label>
      </div>
    </div>
  );
};

export default DeliveryOptions;
