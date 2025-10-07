import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PathnamesApp } from "../../types/Pathnames";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PathnamesApp.Connexion} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
