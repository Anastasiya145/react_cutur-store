import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

/**
 * Хук для проверки аутентификации на защищенных страницах
 * Автоматически перенаправляет на страницу входа, если пользователь не авторизован
 */
export const useAuthCheck = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Invalid session - no token or user
    if (!token || !user) {
      // Clear auth data
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Trigger token expiration event
      window.dispatchEvent(new CustomEvent("token-expired"));
    }
  }, [user]);

  return { isAuthenticated };
};
