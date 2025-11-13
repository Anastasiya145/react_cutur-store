import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";
import "./forgotPasswordPage.scss";
import { PathnamesApp } from "../../types/Pathnames";
import { LoadingButton } from "../../components/LoadingButton";
import { EmailInput } from "../../components/forms/EmailInput/EmailInput";
import { useForm } from "react-hook-form";
import { useNotification } from "../../context/NotificationContext";

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { showError } = useNotification();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      await forgotPassword({ email: data.email });
      setEmailSent(true);
      reset();
    } catch (err) {
      const error = err as Error;
      showError(
        error.message ||
          "Erreur lors de l'envoi de l'e-mail de réinitialisation du mot de passe"
      );
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-page__container">
        <h1 className="forgot-password-page__title">Mot de passe oublié</h1>

        {!emailSent ? (
          <>
            <p className="forgot-password-page__description">
              Entrez votre adresse e-mail et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </p>

            <form
              className="forgot-password-page__form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <EmailInput
                label="Adresse e-mail"
                placeholder="exemple@email.com"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "L'e-mail est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Veuillez saisir un e-mail valide",
                  },
                })}
                error={errors.email?.message}
              />

              <LoadingButton
                type="submit"
                text="Envoyer le lien"
                loading={isSubmitting}
                disabled={isSubmitting || !isValid}
                className="forgot-password-page__submit-btn"
              />
            </form>
          </>
        ) : (
          <div className="forgot-password-page__success">
            <div className="forgot-password-page__success-icon">✓</div>
            <h2 className="forgot-password-page__success-title">
              E-mail envoyé !
            </h2>
            <p className="forgot-password-page__success-text">
              Vérifiez votre boîte de réception et suivez les instructions pour
              réinitialiser votre mot de passe.
            </p>
            <p className="forgot-password-page__success-hint">
              Si vous ne recevez pas d'e-mail dans quelques minutes, vérifiez
              votre dossier spam.
            </p>
            <button
              type="button"
              className="forgot-password-page__resend-btn"
              onClick={() => setEmailSent(false)}
            >
              Renvoyer l'e-mail
            </button>
          </div>
        )}

        <div className="forgot-password-page__footer">
          <span
            className="forgot-password-page__link"
            onClick={() => navigate(PathnamesApp.Connexion)}
          >
            ← Retour à la connexion
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
