import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../../api/authApi";
import { TextInput } from "../../components/forms/TextInput/TextInput";
import { PasswordInput } from "../../components/forms/PasswordInput/PasswordInput";
import "./registerPage.scss";
import { PathnamesApp } from "../../types/Pathnames";
import { LoadingButton } from "../../components/LoadingButton";
import { EmailInput } from "../../components/forms/EmailInput/EmailInput";
import { useNotification } from "../../context/NotificationContext";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<RegisterFormInputs>({ mode: "onChange" });

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Les mots de passe ne correspondent pas",
      });
      return;
    }
    try {
      const response = await registerApi({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.email) {
        showSuccess(
          "Inscription réussie! Vous pouvez maintenant vous connecter."
        );
        navigate(PathnamesApp.Connexion);
      }
    } catch (err: any) {
      showError(err.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-page__title">Inscription</h1>
      <form
        className="register-page__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextInput
          label="Nom d'utilisateur"
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          autoComplete="username"
          required
          {...register("username", {
            required: "Le nom d'utilisateur est requis",
            minLength: {
              value: 2,
              message:
                "Le nom d'utilisateur doit contenir au moins 2 caractères",
            },
          })}
        />
        {errors.username && (
          <div className="register-page__error">{errors.username.message}</div>
        )}

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
          <div className="register-page__error">{errors.email.message}</div>
        )}

        <PasswordInput
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          autoComplete="new-password"
          required
          {...register("password", {
            required: "Le mot de passe est requis",
            minLength: {
              value: 6,
              message: "Le mot de passe doit contenir au moins 6 caractères",
            },
          })}
        />
        {errors.password && (
          <div className="register-page__error">{errors.password.message}</div>
        )}

        <PasswordInput
          label="Confirmez le mot de passe"
          placeholder="Confirmez le mot de passe"
          autoComplete="new-password"
          required
          {...register("confirmPassword", {
            required: "Veuillez confirmer le mot de passe",
            validate: (value) =>
              value === watch("password") ||
              "Les mots de passe ne correspondent pas",
          })}
        />
        {errors.confirmPassword && (
          <div className="register-page__error">
            {errors.confirmPassword.message}
          </div>
        )}

        {errors.root && (
          <div className="register-page__error">{errors.root.message}</div>
        )}

        <LoadingButton
          type="submit"
          text="S'inscrire"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
        />
      </form>
      <div className="register-page__footer">
        Déjà inscrit?
        <span
          className="register-page__link"
          onClick={() => navigate(PathnamesApp.Connexion)}
        >
          Connectez-vous
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
