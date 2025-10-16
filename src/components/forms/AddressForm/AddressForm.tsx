import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "../Select/Select";
import "./addressForm.scss";

type Option = { value: string; label: string };

interface AddressFormProps {
  register: UseFormRegister<any>;
  errors: any;
  fieldName: string;
}

export const validationAddressForm = {
  country: { required: "Le pays est requis" },
  city: { required: "La ville est requise" },
  street: { required: "L'adresse est requise" },
  postalCode: {
    required: "Le code postal est requis",
    pattern: {
      value: /^(0[1-9]|[1-8][0-9]|9[0-5])[0-9]{3}$/,
      message: "Code postal français invalide (5 chiffres, 01000-95880)",
    },
    minLength: { value: 5, message: "5 chiffres requis" },
    maxLength: { value: 5, message: "5 chiffres requis" },
  },
  apartment: {
    minLength: { value: 1, message: "Numéro trop court" },
    maxLength: { value: 10, message: "Numéro trop long" },
    pattern: {
      value: /^[A-Za-z0-9-]+$/,
      message: "Seulement lettres, chiffres, tiret",
    },
  },
};

type AddressFieldKey = keyof typeof validationAddressForm;

export const AddressForm: React.FC<AddressFormProps> = ({
  register,
  errors,
  fieldName,
}) => {
  const options: Option[] = [
    { value: "France", label: "France" },
    { value: "Belgique", label: "Belgique" },
  ];

  const reg = (key: AddressFieldKey) =>
    register(`${fieldName}.${key}`, validationAddressForm[key]);

  const getError = (key: AddressFieldKey) =>
    errors?.[fieldName]?.[key]?.message;

  return (
    <div className="address-form">
      <Select
        label="Pays"
        required
        options={options}
        defaultValue={options[0]?.value}
        disabled
        placeholder="Sélectionnez un pays"
        {...reg("country")}
        error={getError("country")}
      />

      <div className="address-form__row address-form__row--split">
        <TextInput
          label="Ville"
          required
          placeholder="Paris"
          {...reg("city")}
          error={getError("city")}
        />
        <TextInput
          label="Code Postal"
          required
          placeholder="75000"
          {...reg("postalCode")}
          error={getError("postalCode")}
        />
      </div>

      <TextInput
        label="Rue"
        required
        placeholder="25 Rue de la Paix"
        {...reg("street")}
        error={getError("street")}
      />

      <div className="address-form__row">
        <TextInput
          label="Appartement (optionnel)"
          placeholder="Numéro d'appartement"
          {...reg("apartment")}
          error={getError("apartment")}
        />
      </div>
    </div>
  );
};

export default AddressForm;
