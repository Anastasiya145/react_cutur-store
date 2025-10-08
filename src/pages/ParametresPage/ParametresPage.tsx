import React, { useState } from "react";
import "./parametresPage.scss";
import { TextInput } from "../../components/forms/TextInput/TextInput";
import { PasswordInput } from "../../components/forms/PasswordInput/PasswordInput";
import { LoadingButton } from "../../components/LoadingButton";
import { useNotification } from "../../context/NotificationContext";

const ParametresPage: React.FC = () => {
  const [username, setUsername] = useState("TestUser");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { showError, showSuccess } = useNotification();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Симуляция API вызова
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showSuccess("Modifications enregistrées avec succès !");
      setPassword("");
      setNewPassword("");
    } catch (error: any) {
      showError(error.message || "Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parametres-page">
      <h1 className="parametres-page__title">Paramètres du compte</h1>
      <form className="parametres-page__form" noValidate>
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

        <LoadingButton text="Enregistrer" loading={loading} type="submit" />
      </form>
    </div>
  );
};

export default ParametresPage;
