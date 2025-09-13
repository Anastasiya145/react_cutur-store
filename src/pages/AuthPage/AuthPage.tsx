import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authPage.scss";

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/profile");
    } else {
      setError("Veuillez saisir l'e-mail et le mot de passe");
    }
  };

  return (
    <div className="auth-page">
      <section className="section">
        <h1 className="auth-page__title section__title">Connexion</h1>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <label className="auth-page__label">
            E-mail
            <input
              type="email"
              placeholder="Entrez votre e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="auth-page__label">
            Mot de passe
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error && <div className="auth-page__error">{error}</div>}
          <button type="submit">Se connecter</button>
        </form>
        <div className="auth-page__footer">
          Pas encore de compte ?
          <span className="auth-page__link" onClick={() => navigate("/register")}>
            {" "}
            Inscrivez-vous
          </span>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
