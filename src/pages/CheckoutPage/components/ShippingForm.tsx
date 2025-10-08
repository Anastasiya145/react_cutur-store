import React, { useEffect, useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Address } from "../../../types/User";
import { TextArea } from "../../../components/forms/TextArea/TextArea";
import AddressForm from "../../../components/forms/AddressForm/AddressForm";
import DeliveryOptions from "../../../components/DeliveryOptions/DeliveryOptions";
import Checkbox from "../../../components/forms/Checkbox/Checkbox";
import { useAuth } from "../../../context/AuthContext";
import { getUserByEmail } from "../../../api/userApi";
import { Loader } from "../../../components/Loader";

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
  setValue: UseFormSetValue<CheckoutFormData>;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  register,
  errors,
  shippingCost,
  setValue,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const data = await getUserByEmail(user);

          if (data.address) {
            setValue(
              "shippingAddress.country",
              data.address.country || "France"
            );
            setValue("shippingAddress.city", data.address.city || "");
            setValue(
              "shippingAddress.postalCode",
              data.address.postalCode || ""
            );
            setValue("shippingAddress.street", data.address.street || "");
            setValue("shippingAddress.apartment", data.address.apartment || "");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur:",
            error
          );
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, setValue]);

  return (
    <div className="checkout-page__shipping">
      <h2 className="checkout-page__section-title">Adresse de livraison</h2>

      <div className="checkout-page__address-form">
        {isLoading ? (
          <Loader />
        ) : (
          <AddressForm
            register={register}
            errors={errors}
            registerField={(k: string) =>
              register(`shippingAddress.${k}` as unknown as any)
            }
            validation={{
              country: { required: "Le pays est requis" },
              city: { required: "La ville est requise" },
              street: { required: "L'adresse est requise" },
              postalCode: {
                required: "Le code postal est requis",
                pattern: { value: /^\d{5}$/, message: "Code postal invalide" },
              },
            }}
          />
        )}

        <DeliveryOptions shippingCost={shippingCost} />

        <TextArea
          label="Notes de livraison"
          placeholder="Instructions spéciales для la livraison..."
          rows={3}
          {...register("notes")}
        />

        <Checkbox
          id="saveAddress"
          label={"Sauvegarder cette adresse dans mon profil"}
          name="saveAddress"
          register={register}
        />
      </div>
    </div>
  );
};
