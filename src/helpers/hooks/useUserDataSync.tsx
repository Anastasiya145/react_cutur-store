import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContextProvider";

export const useUserDataSync = () => {
  const { user } = useAuth();
  const { clearAllUserData } = useAppContext();

  useEffect(() => {
    // Clear data when user logs out
    if (!user) {
      clearAllUserData();
    }
  }, [user, clearAllUserData]);
};

/**
 * Компонент-обертка для автоматической синхронизации данных пользователя
 */
export const UserDataSync: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useUserDataSync();
  return <>{children}</>;
};
