import React from "react";
import { UseFormRegister, FieldErrors, RegisterOptions } from "react-hook-form";
import { TextInput } from "../TextInput/TextInput";
import { Select } from "../Select/Select";
import "./addressForm.scss";

type Option = { value: string; label: string };

interface AddressFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  // Optional helper to build registration name: registerField('city') -> register('shippingAddress.city')
  registerField?: (key: string) => ReturnType<UseFormRegister<any>>;
  // per-field validation rules
  validation?: Record<string, RegisterOptions>;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  register,
  errors,
  registerField,
  validation,
}) => {
  const fieldName = (key: string) => {
    if (registerField) return registerField(key) as any;
    const opts = validation?.[key];
    return register(key, opts) as any;
  };

  const getError = (key: string) => {
    const e = (errors as any)[key] ?? (errors as any).shippingAddress?.[key];
    return e?.message;
  };

  const options: Option[] = [
    { value: "France", label: "France" },
    { value: "Belgique", label: "Belgique" },
  ];

  return (
    <>
      <div className="address-form">
        <Select
          label="Pays"
          required
          options={options}
          defaultValue={options[0]?.value}
          disabled
          placeholder="Sélectionnez un pays"
          {...fieldName("country")}
          error={getError("country")}
        />

        <div className="address-form__row address-form__row--split">
          <TextInput
            label="Ville"
            required
            placeholder="Paris"
            {...fieldName("city")}
            error={getError("city")}
          />

          <TextInput
            label="Postal Code"
            required
            placeholder="75000"
            {...fieldName("postalCode")}
            error={getError("postalCode")}
          />
        </div>

        <TextInput
          label="Rue"
          required
          placeholder="25 Rue de la Paix"
          {...fieldName("street")}
          error={getError("street")}
        />

        <div className="address-form__row">
          <TextInput
            label="Appartement (optionnel)"
            placeholder="Numéro d'appartement"
            {...fieldName("apartment")}
            error={getError("apartment")}
          />
        </div>
      </div>
    </>
  );
};

export default AddressForm;
