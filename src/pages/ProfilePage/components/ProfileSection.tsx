import React from "react";
import classNames from "classnames";

interface ProfileSectionProps {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  editButtonText?: string;
  isDisabled?: boolean;
  disabledReason?: string;
  comingSoon?: boolean;
  children: React.ReactNode;
  className?: string;
  hasValue?: boolean;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  isEditing,
  onEdit,
  editButtonText = "Modifier",
  isDisabled = false,
  disabledReason,
  comingSoon = false,
  children,
  className = "",
  hasValue = true,
}) => {
  const buttonText = hasValue ? editButtonText : "Add Information";

  return (
    <div
      className={classNames("profile-page__section", className, {
        "profile-page__section--disabled": isDisabled,
      })}
    >
      <div className="profile-page__section-header">
        <h2 className="profile-page__section-title">{title}</h2>
        {comingSoon && (
          <div className="profile-page__badge profile-page__badge--coming-soon">
            Bientôt disponible
          </div>
        )}
        {!isEditing && (
          <button
            className="profile-page__edit-btn profile-page__edit-btn--desktop"
            onClick={onEdit}
            type="button"
            disabled={isDisabled}
            title={disabledReason}
          >
            {buttonText}
          </button>
        )}
      </div>
      {children}
      {!isEditing && (
        <button
          className="profile-page__edit-btn profile-page__edit-btn--mobile"
          onClick={onEdit}
          type="button"
          disabled={isDisabled}
          title={disabledReason}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
