import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../components/forms/PasswordInput/PasswordInput";
import { LoadingButton } from "../../../components/LoadingButton";
import { ProfileSection } from "./ProfileSection";

interface PasswordFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordSectionProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (data: PasswordFormInputs) => Promise<void>;
}

export const PasswordSection: React.FC<PasswordSectionProps> = ({
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
    watch,
  } = useForm<PasswordFormInputs>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: PasswordFormInputs) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    onCancel();
  };

  // For password, we assume it exists (user is logged in), so hasValue is true
  const hasValue = true;

  return (
    <ProfileSection
      title="Mot de passe"
      isEditing={isEditing}
      onEdit={onEdit}
      hasValue={hasValue}
    >
      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="profile-page__form"
        >
          <div className="profile-page__form-row">
            <PasswordInput
              label="Mot de passe actuel"
              placeholder="Entrez votre mot de passe actuel"
              {...register("currentPassword", {
                required: "Le mot de passe actuel est requis",
              })}
            />
            {errors.currentPassword && (
              <span className="profile-page__error-message">
                {errors.currentPassword.message}
              </span>
            )}
          </div>
          <div className="profile-page__form-row">
            <PasswordInput
              label="Nouveau mot de passe"
              placeholder="Entrez votre nouveau mot de passe"
              {...register("newPassword", {
                required: "Le nouveau mot de passe est requis",
                minLength: {
                  value: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
            />
            {errors.newPassword && (
              <span className="profile-page__error-message">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="profile-page__form-row">
            <PasswordInput
              label="Confirmer le nouveau mot de passe"
              placeholder="Confirmez votre nouveau mot de passe"
              {...register("confirmPassword", {
                required: "La confirmation est requise",
                validate: (value) =>
                  value === watch("newPassword") ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            {errors.confirmPassword && (
              <span className="profile-page__error-message">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="profile-page__form-actions">
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              text="Changer le mot de passe"
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
            <span className="profile-page__label">Mot de passe:</span>
            <span className="profile-page__value">••••••••</span>
          </div>
        </div>
      )}
    </ProfileSection>
  );
};
