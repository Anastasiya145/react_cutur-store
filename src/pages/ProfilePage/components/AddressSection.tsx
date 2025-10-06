import React from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../components/forms/TextInput/TextInput";
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
          <div className="profile-page__form-row profile-page__form-row--split">
            <div className="profile-page__input-wrapper">
              <TextInput
                label="Pays"
                placeholder="Entrez le pays"
                {...register("country", { required: "Le pays est requis" })}
              />
              {errors.country && (
                <span className="profile-page__error-message">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div className="profile-page__input-wrapper">
              <TextInput
                label="Ville"
                placeholder="Entrez la ville"
                {...register("city", { required: "La ville est requise" })}
              />
              {errors.city && (
                <span className="profile-page__error-message">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>
          <div className="profile-page__form-row">
            <TextInput
              label="Rue"
              placeholder="Entrez la rue"
              {...register("street", { required: "La rue est requise" })}
            />
            {errors.street && (
              <span className="profile-page__error-message">
                {errors.street.message}
              </span>
            )}
          </div>
          <div className="profile-page__form-row profile-page__form-row--split">
            <div className="profile-page__input-wrapper">
              <TextInput
                label="Code postal"
                placeholder="Entrez le code postal"
                {...register("postalCode", {
                  required: "Le code postal est requis",
                })}
              />
              {errors.postalCode && (
                <span className="profile-page__error-message">
                  {errors.postalCode.message}
                </span>
              )}
            </div>
            <div className="profile-page__input-wrapper">
              <TextInput
                label="Appartement (optionnel)"
                placeholder="Numéro d'appartement"
                {...register("apartment")}
              />
            </div>
          </div>
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
