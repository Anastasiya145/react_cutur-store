import React, { useMemo } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { TextInput } from "../../../components/forms/TextInput/TextInput";
import { Select } from "../../../components/forms/Select/Select";
import "./paymentStep.scss";

type Props = {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors: any;
};

const cardTypes = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
];

function luhnCheck(value: string) {
  const v = value.replace(/\s+/g, "");
  let sum = 0;
  let shouldDouble = false;
  for (let i = v.length - 1; i >= 0; i--) {
    let digit = parseInt(v.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export const PaymentStep: React.FC<Props> = ({ register, watch, errors }) => {
  const method = watch("payment.method");

  const cardNumberRules = useMemo(
    () => ({
      required: "Numéro de carte requis",
      pattern: { value: /^[0-9\s]+$/, message: "Seulement chiffres" },
      validate: (v: string) => luhnCheck(v) || "Numéro de carte invalide",
      minLength: { value: 12, message: "Numéro trop court" },
      maxLength: { value: 19, message: "Numéro trop long" },
    }),
    []
  );

  const expiryRules = useMemo(
    () => ({
      required: "Date d'expiration requise",
      pattern: { value: /^(0[1-9]|1[0-2])\/(\d{2})$/, message: "Format MM/AA" },
    }),
    []
  );

  const cvcRules = useMemo(
    () => ({
      required: "CVC requis",
      pattern: { value: /^[0-9]{3,4}$/, message: "3 ou 4 chiffres" },
    }),
    []
  );

  return (
    <div className="checkout-page__payment">
      <h2 className="checkout-page__section-title">Paiement</h2>

      <div className="checkout-page__payment-method">
        <Select
          label="Méthode de paiement"
          options={[
            { value: "card", label: "Carte bancaire" },
            { value: "apple", label: "Apple Pay" },
          ]}
          {...register("payment.method")}
        />
      </div>

      {method === "card" && (
        <div className="checkout-page__card-form">
          <TextInput
            label="Nom sur la carte"
            placeholder="NOM PRÉNOM"
            {...register("payment.cardName", { required: "Nom requis" })}
            error={errors?.payment?.cardName?.message}
          />

          <TextInput
            label="Numéro de carte"
            placeholder="4242 4242 4242 4242"
            {...register("payment.cardNumber", cardNumberRules)}
            error={errors?.payment?.cardNumber?.message}
          />

          <div className="checkout-page__card-row">
            <TextInput
              label="Date d'expiration (MM/AA)"
              placeholder="05/28"
              {...register("payment.expiry", expiryRules)}
              error={errors?.payment?.expiry?.message}
            />
            <TextInput
              label="CVC"
              placeholder="123"
              {...register("payment.cvc", cvcRules)}
              error={errors?.payment?.cvc?.message}
            />
          </div>

          <Select
            label="Type de carte"
            options={cardTypes}
            {...register("payment.cardType")}
          />

          <div className="checkout-page__card-hints">
            <img src="/img/cards/visa.svg" alt="Visa" />
            <img src="/img/cards/mastercard.svg" alt="Mastercard" />
            <img src="/img/cards/amex.svg" alt="Amex" />
            <img
              src="/img/cards/apple-pay.svg"
              alt="Apple Pay"
              className="apple-pay-icon"
            />
            <span className="checkout-page__secure">Paiement sécurisé</span>
          </div>
        </div>
      )}

      {method === "apple" && (
        <div className="checkout-page__apple-pay">
          <button type="button" className="apple-pay-btn">
            Payer avec Apple Pay
          </button>
          <p className="checkout-page__apple-note">
            Appuyez pour payer via Apple Pay
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;
