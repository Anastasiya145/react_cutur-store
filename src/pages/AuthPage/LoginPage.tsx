import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/forms/PasswordInput/PasswordInput";
import { useAuth } from "../../context/AuthContext";
import "./loginPage.scss";
import { PathnamesApp } from "../../types/Pathnames";
import { login } from "../../api/authApi";
import { LoadingButton } from "../../components/LoadingButton";
import { EmailInput } from "../../components/forms/EmailInput/EmailInput";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    // formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({ mode: "onChange" });

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data);

      if (response.token) {
        loginUser(response.email, response.token);
        navigate(PathnamesApp.Profil);
      } else {
        setError("root", { message: "Erreur d'authentification" });
      }
    } catch (err: any) {
      setError("root", { message: err.message || "Erreur d'authentification" });
    }
  };

  console.log(isValid, isSubmitting);

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Connexion</h1>
      <form
        className="auth-page__form"
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
          <div className="auth-page__error">{errors.email.message}</div>
        )}

        <PasswordInput
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          autoComplete="current-password"
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
          <div className="auth-page__error">{errors.password.message}</div>
        )}

        {errors.root && (
          <div className="auth-page__error">{errors.root.message}</div>
        )}

        <LoadingButton
          type="submit"
          text="Se connecter"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
        />
      </form>
      <div className="auth-page__footer">
        <div className="auth-page__footer-link-block">
          <span
            className="auth-page__link"
            onClick={() => navigate(PathnamesApp.ForgotPassword)}
          >
            Mot de passe oublié ?
          </span>
        </div>
        <div className="auth-page__footer-link-block">
          <span>
            Pas encore de compte ?
            <span
              className="auth-page__link"
              onClick={() => navigate(PathnamesApp.Register)}
            >
              {" "}
              Inscrivez-vous
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
