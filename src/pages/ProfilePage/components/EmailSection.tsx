import React from "react";
import { useForm } from "react-hook-form";
import { EmailInput } from "../../../components/forms/EmailInput/EmailInput";
import { LoadingButton } from "../../../components/LoadingButton";
import { ProfileSection } from "./ProfileSection";

interface EmailSectionProps {
  email: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (data: { email: string }) => Promise<void>;
}

export const EmailSection: React.FC<EmailSectionProps> = ({
  email,
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
  } = useForm<{ email: string }>({
    defaultValues: { email },
  });

  React.useEffect(() => {
    reset({ email });
  }, [email, reset]);

  const handleFormSubmit = async (data: { email: string }) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    reset({ email });
    onCancel();
  };

  const hasValue = Boolean(email && email.trim() !== "");

  return (
    <ProfileSection
      title="Email"
      isEditing={isEditing}
      onEdit={onEdit}
      hasValue={hasValue}
      isDisabled={true}
      disabledReason="Fonctionnalité en cours de développement"
      comingSoon={true}
      className="profile-page__section--disabled"
    >
      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="profile-page__form"
        >
          <div className="profile-page__form-row">
            <EmailInput
              label="Email"
              placeholder="Entrez votre email"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Adresse email invalide",
                },
              })}
            />
            {errors.email && (
              <span className="profile-page__error-message">
                {errors.email.message}
              </span>
            )}
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
            <span className="profile-page__label">Email:</span>
            <span className="profile-page__value">{email}</span>
          </div>
        </div>
      )}
    </ProfileSection>
  );
};
