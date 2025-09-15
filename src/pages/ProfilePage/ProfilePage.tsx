import React, { useEffect, useState } from "react";
import "./profilePage.scss";
import { useAuth } from "../../context/AuthContext";
import { getUserByEmail, updateUserAddress } from "../../api/userApi";
import { TextInput } from "../../components/Form/TextInput";
import { ConnectedUser } from "../../types/User";
import { Loader } from "../../components/Loader/Loader";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<ConnectedUser | null>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserByEmail(user)
      .then((data) => {
        setUserData(data);
        setAddress(data.address || "");
      })
      .catch(() => setError("Erreur lors du chargement du profil."))
      .finally(() => setLoading(false));
  }, [user]);

  const handleAddressSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;
    setError("");
    setSuccess("");
    try {
      const updated = await updateUserAddress(userData.email, address);
      setUserData(updated);
      setSuccess("Adresse enregistrée avec succès !");
    } catch {
      setError("Erreur lors de la sauvegarde de l'adresse.");
    }
  };

  return (
    <div className="profile-page">
      <h1 className="profile-page__title">Profil utilisateur</h1>
      {loading && <Loader />}
      {error && <div className="profile-page__error">{error}</div>}
      {userData && !loading && (
        <div className="profile-page__info">
          <div>
            <div className="profile-page__label">Email</div>
            <div className="profile-page__value">{userData.email}</div>
          </div>
          <div>
            <div className="profile-page__label">Nom d'utilisateur</div>
            <div className="profile-page__value">{userData.username}</div>
          </div>
          <form
            onSubmit={handleAddressSave}
            className="profile-page__input-row"
          >
            <div>
              <div className="profile-page__label">Adresse</div>
              {userData.address ? (
                <div className="profile-page__value">{userData.address}</div>
              ) : (
                <TextInput
                  label=""
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ajouter votre adresse"
                  required
                />
              )}
            </div>
            {!userData.address && (
              <button type="submit" className="profile-page__button">
                Enregistrer
              </button>
            )}
          </form>
          {success && <div className="profile-page__success">{success}</div>}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
