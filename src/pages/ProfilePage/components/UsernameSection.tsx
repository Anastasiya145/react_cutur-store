import React from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../components/forms/TextInput/TextInput";
import { LoadingButton } from "../../../components/LoadingButton";
import { ProfileSection } from "./ProfileSection";

interface UsernameSectionProps {
  username: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (data: { username: string }) => Promise<void>;
}

export const UsernameSection: React.FC<UsernameSectionProps> = ({
  username,
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
  } = useForm<{ username: string }>({
    defaultValues: { username },
  });

  React.useEffect(() => {
    reset({ username: username || "" });
  }, [username, reset]);

  const handleFormSubmit = async (data: { username: string }) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    reset({ username });
    onCancel();
  };

  const hasValue = Boolean(username && username.trim() !== "");

  return (
    <ProfileSection
      title="Nom d'utilisateur"
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
            <TextInput
              label="Nom d'utilisateur"
              placeholder="Entrez votre nom d'utilisateur"
              {...register("username", {
                required: "Le nom d'utilisateur est requis",
              })}
            />
            {errors.username && (
              <span className="profile-page__error-message">
                {errors.username.message}
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
            <span className="profile-page__label">Nom d'utilisateur:</span>
            <span className="profile-page__value">{username}</span>
          </div>
        </div>
      )}
    </ProfileSection>
  );
};
