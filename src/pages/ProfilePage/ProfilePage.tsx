import React, { useEffect, useState } from "react";
import "./profilePage.scss";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import {
  getUserByEmail,
  updateUserAddress,
  updateUsername,
  updateUserPassword,
} from "../../api/userApi";
import { ConnectedUser, Address } from "../../types/User";
import { Loader } from "../../components/Loader/Loader";
import {
  EmailSection,
  UsernameSection,
  PasswordSection,
  AddressSection,
} from "./components";
import { useAuthCheck } from "../../helpers/hooks/useAuthCheck";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  useAuthCheck();
  const { showError, showSuccess } = useNotification();
  const [userData, setUserData] = useState<ConnectedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editAddress, setEditAddress] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getUserByEmail(user);
          setUserData(data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur:",
            error
          );
          showError("Erreur lors de la récupération des données utilisateur");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmitEmail = async (data: { email: string }) => {
    try {
      if (!userData) return;
      // TODO: Ajouter l'endpoint PUT /users/:email/email sur le backend
      showError("La modification de l'email n'est pas encore disponible");

      console.log(data);
      setEditEmail(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'email:", error);
      showError("Erreur lors de la mise à jour de l'email");
    }
  };

  const handleSubmitUsername = async (data: { username: string }) => {
    try {
      if (!userData) return;
      await updateUsername(userData.email, data.username);
      setUserData({ ...userData, username: data.username });
      setEditUsername(false);
      showSuccess("Nom d'utilisateur mis à jour avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du nom d'utilisateur:",
        error
      );
      showError("Erreur lors de la mise à jour du nom d'utilisateur");
    }
  };

  const handleSubmitPassword = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      if (!userData) return;
      if (data.newPassword !== data.confirmPassword) {
        showError("Les mots de passe ne correspondent pas");
        return;
      }

      const result = await updateUserPassword(
        userData.email,
        data.currentPassword,
        data.newPassword
      );
      showSuccess(result.message || "Mot de passe mis à jour avec succès");
      setEditPassword(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe:", error);
      showError("Erreur lors de la mise à jour du mot de passe");
    }
  };

  const handleSubmitAddress = async (data: Address) => {
    try {
      if (!userData) return;
      await updateUserAddress(userData.email, data);
      setUserData({ ...userData, address: data });
      setEditAddress(false);
      showSuccess("Adresse mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'adresse:", error);
      showError("Erreur lors de la mise à jour de l'adresse");
    }
  };

  return (
    <div className="profile-page">
      {loading && <Loader />}

      {!loading && !userData && (
        <div>Erreur lors du chargement des données utilisateur</div>
      )}

      {!loading && userData && (
        <div className="profile-page__container">
          <h1 className="profile-page__title">Mon Profil</h1>

          <div className="profile-page__content">
            <EmailSection
              email={userData.email}
              isEditing={editEmail}
              onEdit={() => setEditEmail(true)}
              onCancel={() => setEditEmail(false)}
              onSubmit={handleSubmitEmail}
            />

            <UsernameSection
              username={userData.username}
              isEditing={editUsername}
              onEdit={() => setEditUsername(true)}
              onCancel={() => setEditUsername(false)}
              onSubmit={handleSubmitUsername}
            />

            <PasswordSection
              isEditing={editPassword}
              onEdit={() => setEditPassword(true)}
              onCancel={() => setEditPassword(false)}
              onSubmit={handleSubmitPassword}
            />

            <AddressSection
              address={userData.address || null}
              isEditing={editAddress}
              onEdit={() => setEditAddress(true)}
              onCancel={() => setEditAddress(false)}
              onSubmit={handleSubmitAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
