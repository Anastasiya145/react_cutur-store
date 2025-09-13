import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registerPage.scss";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    // Здесь должна быть реальная регистрация через API
    localStorage.setItem("user", JSON.stringify({ email }));
    setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    setTimeout(() => navigate("/auth"), 1500);
  };

  return (
    <div className="register-page">
      <h1 className="register-page__title">Inscription</h1>
      <form className="register-page__form" onSubmit={handleSubmit}>
        <label className="register-page__label">
          E-mail
          <input
            type="email"
            placeholder="Entrez votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="register-page__label">
          Mot de passe
          <input
            type="password"
            placeholder="Créez un mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        <label className="register-page__label">
          Confirmez le mot de passe
          <input
            type="password"
            placeholder="Répétez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>
        {error && <div className="register-page__error">{error}</div>}
        {success && <div className="register-page__success">{success}</div>}
        <button type="submit">S'inscrire</button>
      </form>
      <div className="register-page__footer">
        Déjà inscrit ?{" "}
        <span className="register-page__link" onClick={() => navigate("/auth")}>
          Connectez-vous
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
