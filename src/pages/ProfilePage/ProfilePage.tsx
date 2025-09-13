import React from "react";
import "./profilePage.scss";

const ProfilePage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="profile-page">
      <h1>Личный кабинет</h1>
      {user ? (
        <div className="profile-page__info">
          <p>Email: {user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Выйти
          </button>
        </div>
      ) : (
        <p>Вы не авторизованы.</p>
      )}
    </div>
  );
};

export default ProfilePage;
