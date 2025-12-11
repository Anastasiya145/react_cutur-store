import React, { useMemo, useEffect } from "react";
import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import { TextInput } from "../../../components/forms/TextInput/TextInput";
import { Select } from "../../../components/forms/Select/Select";
import { Address } from "../../../types/User";
import classNames from "classnames";
import "./paymentStep.scss";

interface PaymentFormData {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  notes?: string;
  payment?: {
    method?: string;
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    cardType?: string;
  };
}

type Props = {
  register: UseFormRegister<PaymentFormData>;
  watch: UseFormWatch<PaymentFormData>;
  setValue: UseFormSetValue<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
};

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

const cardTypes = [
  { value: "visa", label: "Visa", img: "/img/cards/visa.svg" },
  {
    value: "mastercard",
    label: "Mastercard",
    img: "/img/cards/mastercard.svg",
  },
];

export const PaymentStep: React.FC<Props> = ({
  register,
  watch,
  setValue,
  errors,
}) => {
  const method = watch("payment.method");
  const cardNumber = watch("payment.cardNumber") || "";

  const cardNumberRules = useMemo(() => {
    return {
      required: "Numéro de carte requis",
      pattern: { value: /^[0-9\s]+$/, message: "Seulement chiffres" },
      validate: (v: string | undefined) =>
        !v || luhnCheck(v) || "Numéro de carte invalide",
      minLength: { value: 13, message: "Numéro trop court" },
      maxLength: { value: 19, message: "Numéro trop long" },
    };
  }, []);

  const expiryRules = useMemo(
    () => ({
      required: "Date d'expiration requise",
      pattern: { value: /^(0[1-9]|1[0-2])\/(\d{2})$/, message: "Format MM/AA" },
    }),
    []
  );

  const cvcRules = useMemo(() => {
    return {
      required: "CVC requis",
      pattern: { value: /^[0-9]{3}$/, message: "3 chiffres" },
    };
  }, []);

  const detectCardType = (num: string) => {
    const v = num.replace(/\s+/g, "");
    if (!v) return "";
    if (/^4/.test(v)) return "visa";
    if (/^(34|37)/.test(v)) return "amex";
    if (
      /^5[1-5]/.test(v) ||
      /^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/.test(v)
    )
      return "mastercard";
    return "";
  };

  useEffect(() => {
    const type = detectCardType(cardNumber);
    setValue("payment.cardType", type, { shouldValidate: false });
  }, [cardNumber, setValue]);

  const detectedType = detectCardType(cardNumber);

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

          <div className="checkout-page__card-hints">
            <div className="card-icons">
              {cardTypes.map((t) => (
                <img
                  key={t.value}
                  src={t.img}
                  alt={t.label}
                  className={classNames("card-icon", {
                    active: detectedType === t.value,
                  })}
                />
              ))}
              <img
                src="/img/cards/apple-pay.svg"
                alt="Apple Pay"
                className="apple-pay-icon"
              />
            </div>

            <div className="checkout-page__detected-type-label">
              {detectedType ? (
                <span>Détecté: {detectedType.toUpperCase()}</span>
              ) : (
                <span className="not-detected">Type non détecté</span>
              )}
            </div>

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
