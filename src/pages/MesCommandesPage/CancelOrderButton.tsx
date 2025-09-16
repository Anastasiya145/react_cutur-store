import { FC } from "react";
import { LoadingButton } from "../../components/LoadingButton";

type CancelOrderButtonProps = {
  handleCancel: () => void;
  loading?: boolean;
  disabled?: boolean;
  error?: string | null;
};

export const CancelOrderButton: FC<CancelOrderButtonProps> = ({
  handleCancel,
  loading = false,
  error = null,
  disabled = false,
}) => {
  return (
    <div className="commande-card__cancel">
      <LoadingButton
        text="Annuler la commande"
        loading={loading}
        disabled={!disabled}
        onClick={handleCancel}
      />
      {!disabled && (
        <div className="commande-card__cancel-hint">
          Trop tard pour annuler la commande, elle est déjà en cours de
          traitement.
        </div>
      )}
      {error && <div className="commande-card__cancel-error">{error}</div>}
    </div>
  );
};
