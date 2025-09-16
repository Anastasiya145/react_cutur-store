import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import { TextInput } from "../../components/Form/TextInput";
import { PasswordInput } from "../../components/Form/PasswordInput";
import "./registerPage.scss";
import { PathnamesApp } from "../../types/Pathnames";
import { LoadingButton } from "../../components/LoadingButton";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await register({ username, email, password });

      if (response.email) {
        setSuccess(
          "Inscription réussie ! Vous pouvez maintenant vous connecter."
        );
        navigate(PathnamesApp.Connexion);
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
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

        <LoadingButton
          text="Se connecter"
          loading={loading}
          onClick={handleSubmit}
          disabled={loading}
        />
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
