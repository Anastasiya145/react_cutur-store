import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../components/Form/TextInput";
import { PasswordInput } from "../../components/Form/PasswordInput";
import { useAuth } from "../../context/AuthContext";
import "./loginPage.scss";
import { PathnamesApp } from "../../types/Pathnames";
import { login } from "../../api/authApi";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez saisir l'e-mail et le mot de passe");
      return;
    }
    try {
      const response = await login({ email, password });

      console.log(response);

      if (response.token) {
        loginUser(response.email, response.token);

        navigate(PathnamesApp.Profil);
      } else {
        setError("Erreur d'authentification");
      }
    } catch (err: any) {
      setError(err.message || "Erreur d'authentification");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">Connexion</h1>
      <form className="auth-page__form" onSubmit={handleSubmit}>
        <TextInput
          label="E-mail"
          type="email"
          placeholder="Entrez votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <PasswordInput
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && <div className="auth-page__error">{error}</div>}
        <button type="submit" className="auth-page__button">
          Se connecter
        </button>
      </form>
      <div className="auth-page__footer">
        <div className="auth-page__footer-link-block">
          <span
            className="auth-page__link"
            onClick={() => navigate("/forgot-password")}
          >
            Mot de passe oublié ?
          </span>
        </div>
        <div className="auth-page__footer-link-block">
          <span>
            Pas encore de compte ?
            <span
              className="auth-page__link"
              onClick={() => navigate("/register")}
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
