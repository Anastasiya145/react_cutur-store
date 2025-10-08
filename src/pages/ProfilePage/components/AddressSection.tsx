import React from "react";
import { useForm } from "react-hook-form";
import AddressForm from "../../../components/forms/AddressForm/AddressForm";
import { LoadingButton } from "../../../components/LoadingButton";
import { ProfileSection } from "./ProfileSection";
import { Address } from "../../../types/User";

interface AddressSectionProps {
  address: Address | null;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (data: Address) => Promise<void>;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  address,
  isEditing,
  onEdit,
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Address>({
    defaultValues: {
      country: address?.country || "",
      city: address?.city || "",
      street: address?.street || "",
      postalCode: address?.postalCode || "",
      apartment: address?.apartment || "",
    },
  });

  React.useEffect(() => {
    reset({
      country: address?.country || "",
      city: address?.city || "",
      street: address?.street || "",
      postalCode: address?.postalCode || "",
      apartment: address?.apartment || "",
    });
  }, [address, reset]);

  const formatAddress = (address: Address | null): string => {
    if (!address) return "Adresse non renseignée";

    const parts = [
      address.street,
      address.apartment,
      address.postalCode,
      address.city,
      address.country,
    ].filter((part) => part && part.trim() !== "");

    return parts.length > 0 ? parts.join(", ") : "Adresse non renseignée";
  };

  const handleFormSubmit = async (data: Address) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    reset({
      country: address?.country || "",
      city: address?.city || "",
      street: address?.street || "",
      postalCode: address?.postalCode || "",
      apartment: address?.apartment || "",
    });
    onCancel();
  };

  const hasValue = Boolean(
    address &&
      (address.street ||
        address.city ||
        address.country ||
        address.postalCode ||
        address.apartment)
  );

  return (
    <ProfileSection
      title="Adresse de livraison"
      isEditing={isEditing}
      onEdit={onEdit}
      hasValue={hasValue}
    >
      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="profile-page__form"
        >
          <AddressForm
            register={register}
            errors={errors}
            validation={{
              country: { required: "Le pays est requis" },
              city: { required: "La ville est requise" },
              street: { required: "La rue est requise" },
              postalCode: {
                required: "Le code postal est requis",
                pattern: { value: /^\d{5}$/, message: "Code postal invalide" },
              },
            }}
          />

          <div className="profile-page__form-actions">
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              text="Enregistrer"
              className="profile-page__save-btn"
            />
            <button
              type="button"
              onClick={handleCancel}
              className="profile-page__cancel-btn"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-page__info">
          <div className="profile-page__field">
            <span className="profile-page__label">Adresse:</span>
            <span className="profile-page__value">
              {formatAddress(address)}
            </span>
          </div>
        </div>
      )}
    </ProfileSection>
  );
};
