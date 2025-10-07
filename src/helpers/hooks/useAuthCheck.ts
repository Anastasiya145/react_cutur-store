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

    // Если нет токена или пользователя, это означает что сессия недействительна
    if (!token || !user) {
      // Очищаем все данные авторизации
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Запускаем событие истечения токена для перенаправления
      window.dispatchEvent(new CustomEvent("token-expired"));
    }
  }, [user]);

  return { isAuthenticated };
};
