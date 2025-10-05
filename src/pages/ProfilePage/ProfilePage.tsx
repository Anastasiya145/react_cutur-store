import React, { useEffect, useState } from "react";
import "./profilePage.scss";
import { useAuth } from "../../context/AuthContext";
import { getUserByEmail, updateUserAddress } from "../../api/userApi";
import { TextInput } from "../../components/forms/TextInput/TextInput";
import { ConnectedUser } from "../../types/User";
import { Loader } from "../../components/Loader/Loader";
import { useForm } from "react-hook-form";

type ProfileFormInputs = {
  address: string;
};

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<ConnectedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editAddress, setEditAddress] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProfileFormInputs>({ mode: "onChange" });

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserByEmail(user)
      .then((data) => {
        setUserData(data);
        setValue("address", data.address || "");
      })
      .catch(() => setError("Erreur lors du chargement du profil."))
      .finally(() => setLoading(false));
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormInputs) => {
    setError("");
    setSuccess("");
    if (!userData) return;
    try {
      const updated = await updateUserAddress(userData.email, data.address);
      setUserData(updated);
      setSuccess("Adresse enregistrée avec succès !");
      setEditAddress(false);
      reset({ address: updated.address || "" });
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
            onSubmit={handleSubmit(onSubmit)}
            className="profile-page__input-row"
          >
            <div>
              <div className="profile-page__label">Adresse</div>
              {userData.address && !editAddress ? (
                <div className="profile-page__value">
                  {userData.address}
                  <button
                    type="button"
                    className="profile-page__edit-btn"
                    onClick={() => setEditAddress(true)}
                  >
                    Modifier
                  </button>
                </div>
              ) : (
                <>
                  <TextInput
                    label=""
                    placeholder="Ajouter ou modifier votre adresse"
                    required
                    {...register("address", {
                      required: "L'adresse est requise",
                      minLength: {
                        value: 2,
                        message:
                          "L'adresse doit contenir au moins 2 caractères.",
                      },
                    })}
                  />
                  {errors.address && (
                    <div className="profile-page__error">
                      {errors.address.message}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="profile-page__button"
                    disabled={isSubmitting || !isValid}
                  >
                    Enregistrer
                  </button>
                  {userData.address && (
                    <button
                      type="button"
                      className="profile-page__button profile-page__button--cancel"
                      onClick={() => {
                        setEditAddress(false);
                        reset({ address: userData.address || "" });
                      }}
                    >
                      Annuler
                    </button>
                  )}
                </>
              )}
            </div>
          </form>
          {success && <div className="profile-page__success">{success}</div>}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
