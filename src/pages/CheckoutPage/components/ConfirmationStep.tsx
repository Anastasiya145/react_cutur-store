import React from "react";
import { Address } from "../../../types/User";
import { ProductInCart } from "../../../types/Product";
import { OrderItem } from "./OrderItem";

interface ConfirmationStepProps {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  cart: ProductInCart[];
  onEditAddress: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  shippingAddress,
  billingAddress,
  sameAsShipping,
  cart,
  onEditAddress,
}) => {
  return (
    <div className="checkout-page__confirmation">
      <h2 className="checkout-page__section-title">Confirmation de commande</h2>

      <div className="checkout-page__addresses-info">
        <div className="checkout-page__delivery-info">
          <h3 className="checkout-page__subsection-title">
            Adresse de livraison
          </h3>
          <div className="checkout-page__address-display">
            <p>{shippingAddress.street}</p>
            {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
            <p>
              {shippingAddress.postalCode} {shippingAddress.city}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
          <button
            type="button"
            className="checkout-page__edit-btn"
            onClick={onEditAddress}
          >
            Modifier
          </button>
        </div>

        <div className="checkout-page__billing-info">
          <h3 className="checkout-page__subsection-title">
            Adresse de facturation
          </h3>
          <div className="checkout-page__address-display">
            {sameAsShipping ? (
              <p className="checkout-page__same-address">
                Même adresse que la livraison
              </p>
            ) : (
              <>
                <p>{billingAddress.street}</p>
                {billingAddress.apartment && <p>{billingAddress.apartment}</p>}
                <p>
                  {billingAddress.postalCode} {billingAddress.city}
                </p>
                <p>{billingAddress.country}</p>
              </>
            )}
          </div>
          <button
            type="button"
            className="checkout-page__edit-btn"
            onClick={onEditAddress}
          >
            Modifier
          </button>
        </div>
      </div>

      <div className="checkout-page__items-review">
        <h3 className="checkout-page__subsection-title">Articles commandés</h3>
        <div className="checkout-page__items-list">
          {cart.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
