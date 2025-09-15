import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import { TextInput } from "../../components/Form/TextInput";
import { PasswordInput } from "../../components/Form/PasswordInput";
import "./registerPage.scss";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!username || !email || !password || !confirmPassword) {
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
    try {
      await register({ username, email, password });
      setSuccess(
        "Inscription réussie ! Vous pouvez maintenant vous connecter."
      );
      setTimeout(() => navigate("/auth"), 1500);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-page__title">Inscription</h1>
      <form className="register-page__form" onSubmit={handleSubmit}>
        <TextInput
          label="Nom d'utilisateur"
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
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
          autoComplete="new-password"
          required
        />
        <PasswordInput
          label="Confirmez le mot de passe"
          placeholder="Confirmez le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
        {error && <div className="register-page__error">{error}</div>}
        {success && <div className="register-page__success">{success}</div>}
        <button type="submit" className="register-page__button">
          S'inscrire
        </button>
      </form>
      <div className="register-page__footer">
        Déjà inscrit?
        <span className="register-page__link" onClick={() => navigate("/auth")}>
          Connectez-vous
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
