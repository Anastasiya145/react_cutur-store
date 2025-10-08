import React from "react";
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
  const { showError, showSuccess } = useNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormInputs>({ mode: "onChange" });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      await forgotPassword({ email: data.email });
      showSuccess(
        "Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail."
      );
      reset();
    } catch (err: any) {
      showError(
        err.message ||
          "Erreur lors de l'envoi de l'e-mail de réinitialisation du mot de passe"
      );
    }
  };

  return (
    <div className="forgot-password-page">
      <h1 className="forgot-password-page__title">Mot de passe oublié</h1>
      <form
        className="forgot-password-page__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <EmailInput
          {...register("email", {
            required: "L'e-mail est requis",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Veuillez saisir un e-mail valide",
            },
          })}
        />
        {errors.email && (
          <div className="forgot-password-page__error">
            {errors.email.message}
          </div>
        )}

        <LoadingButton
          type="submit"
          text="Envoyer le lien"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
        />
      </form>
      <div className="forgot-password-page__footer">
        <span
          className="forgot-password-page__link"
          onClick={() => navigate(PathnamesApp.Connexion)}
        >
          Retour à la connexion
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
