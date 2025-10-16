import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Address } from "../../../types/User";
import { TextArea } from "../../../components/forms/TextArea/TextArea";
import AddressForm from "../../../components/forms/AddressForm/AddressForm";
import DeliveryOptions from "../../../components/DeliveryOptions/DeliveryOptions";
import Checkbox from "../../../components/forms/Checkbox/Checkbox";
import { useAuth } from "../../../context/AuthContext";
import { getUserByEmail } from "../../../api/userApi";
import { Loader } from "../../../components/Loader/Loader";

interface CheckoutFormData {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  notes?: string;
}

interface ShippingFormProps {
  register: UseFormRegister<CheckoutFormData>;
  shippingCost: number;
  setValue: UseFormSetValue<CheckoutFormData>;
  watch: UseFormWatch<CheckoutFormData>;
  errors: any;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  register,
  shippingCost,
  setValue,
  watch,
  errors,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const sameAsShipping = watch("sameAsShipping");

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
            errors={errors}
            register={register}
            fieldName="shippingAddress"
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

      <div className="checkout-page__billing-section">
        <Checkbox
          id="sameAsShipping"
          label="Utiliser la même adresse pour la facturation"
          name="sameAsShipping"
          register={register}
        />

        {!sameAsShipping && (
          <div className="checkout-page__billing-form">
            <h3 className="checkout-page__subsection-title">
              Adresse de facturation
            </h3>
            <AddressForm
              errors={errors}
              register={register}
              fieldName="billingAddress"
            />
          </div>
        )}
      </div>
    </div>
  );
};
