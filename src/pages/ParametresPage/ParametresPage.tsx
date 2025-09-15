import React, { useState } from "react";
import "./parametresPage.scss";
import { TextInput } from "../../components/Form/TextInput";
import { PasswordInput } from "../../components/Form/PasswordInput";

const ParametresPage: React.FC = () => {
  const [username, setUsername] = useState("TestUser");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("Modifications enregistrées avec succès !");
    setPassword("");
    setNewPassword("");
  };

  return (
    <div className="parametres-page">
      <h1 className="parametres-page__title">Paramètres du compte</h1>
      <form className="parametres-page__form" onSubmit={handleSubmit}>
        <TextInput
          label="Nom d'utilisateur"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <PasswordInput
          label="Mot de passe actuel"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <PasswordInput
          label="Nouveau mot de passe"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
        />
        {success && <div className="parametres-page__success">{success}</div>}
        <button type="submit" className="parametres-page__button">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default ParametresPage;
