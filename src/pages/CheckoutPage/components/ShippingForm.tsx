import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Address } from "../../../types/User";

interface CheckoutFormData {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  notes?: string;
}

interface ShippingFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  shippingCost: number;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  register,
  errors,
  shippingCost,
}) => {
  return (
    <div className="checkout-page__shipping">
      <h2 className="checkout-page__section-title">Adresse de livraison</h2>

      <div className="checkout-page__address-form">
        <div className="checkout-page__form-row">
          <div className="checkout-page__input-group">
            <label className="checkout-page__label">Pays *</label>
            <select
              {...register("shippingAddress.country", {
                required: "Le pays est requis",
              })}
              className="checkout-page__select"
            >
              <option value="France">France</option>
              <option value="Belgique">Belgique</option>
              <option value="Suisse">Suisse</option>
            </select>
            {errors.shippingAddress?.country && (
              <span className="checkout-page__error-message">
                {errors.shippingAddress.country.message}
              </span>
            )}
          </div>
        </div>

        <div className="checkout-page__form-row checkout-page__form-row--split">
          <div className="checkout-page__input-group">
            <label className="checkout-page__label">Ville *</label>
            <input
              type="text"
              {...register("shippingAddress.city", {
                required: "La ville est requise",
              })}
              className="checkout-page__input"
              placeholder="Paris"
            />
            {errors.shippingAddress?.city && (
              <span className="checkout-page__error-message">
                {errors.shippingAddress.city.message}
              </span>
            )}
          </div>

          <div className="checkout-page__input-group">
            <label className="checkout-page__label">Code postal *</label>
            <input
              type="text"
              {...register("shippingAddress.postalCode", {
                required: "Le code postal est requis",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Code postal invalide",
                },
              })}
              className="checkout-page__input"
              placeholder="75001"
            />
            {errors.shippingAddress?.postalCode && (
              <span className="checkout-page__error-message">
                {errors.shippingAddress.postalCode.message}
              </span>
            )}
          </div>
        </div>

        <div className="checkout-page__form-row">
          <div className="checkout-page__input-group">
            <label className="checkout-page__label">Adresse *</label>
            <input
              type="text"
              {...register("shippingAddress.street", {
                required: "L'adresse est requise",
              })}
              className="checkout-page__input"
              placeholder="123 Rue de la Paix"
            />
            {errors.shippingAddress?.street && (
              <span className="checkout-page__error-message">
                {errors.shippingAddress.street.message}
              </span>
            )}
          </div>
        </div>

        <div className="checkout-page__form-row">
          <div className="checkout-page__input-group">
            <label className="checkout-page__label">Appartement/Étage</label>
            <input
              type="text"
              {...register("shippingAddress.apartment")}
              className="checkout-page__input"
              placeholder="Apt 4B, 2ème étage"
            />
          </div>
        </div>

        <div className="checkout-page__delivery-options">
          <h3 className="checkout-page__subsection-title">
            Options de livraison
          </h3>
          <div className="checkout-page__delivery-method">
            <input
              type="radio"
              id="standard"
              value="standard"
              defaultChecked
              className="checkout-page__radio"
            />
            <label htmlFor="standard" className="checkout-page__radio-label">
              <div className="checkout-page__delivery-info-block">
                <div className="checkout-page__delivery-name">
                  Livraison standard
                </div>
                <div className="checkout-page__delivery-time">
                  3-5 jours ouvrés
                </div>
              </div>
              <div className="checkout-page__delivery-price">
                {shippingCost === 0
                  ? "Gratuite"
                  : `${shippingCost.toFixed(2)}€`}
              </div>
            </label>
          </div>
        </div>

        <div className="checkout-page__form-row">
          <div className="checkout-page__input-group">
            <label className="checkout-page__label">Notes de livraison</label>
            <textarea
              {...register("notes")}
              className="checkout-page__textarea"
              placeholder="Instructions spéciales pour la livraison..."
              rows={3}
            />
          </div>
        </div>

        <div className="checkout-page__form-row">
          <div className="checkout-page__checkbox-group">
            <input
              type="checkbox"
              id="saveAddress"
              className="checkout-page__checkbox"
            />
            <label
              htmlFor="saveAddress"
              className="checkout-page__checkbox-label"
            >
              Sauvegarder cette adresse dans mon profil
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
