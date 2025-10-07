import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { PathnamesApp } from "../types/Pathnames";

interface AuthContextType {
  user: string | null;
  loginUser: (username: string, token: string) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginUser = (username: string, token: string) => {
    localStorage.setItem("user", username);
    localStorage.setItem("token", token);
    setUser(username);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate(PathnamesApp.Connexion); // Перенаправляем на страницу входа
  };

  const handleTokenExpired = () => {
    setUser(null);
    navigate(PathnamesApp.Connexion, { replace: true });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // Проверяем наличие и пользователя, и токена
    if (storedUser && storedToken) {
      setUser(storedUser);
    } else if (storedUser && !storedToken) {
      // Если есть пользователь, но нет токена - очищаем все
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  // Слушаем событие истечения токена
  useEffect(() => {
    const handleTokenExpiredEvent = () => {
      handleTokenExpired();
    };

    window.addEventListener("token-expired", handleTokenExpiredEvent);

    return () => {
      window.removeEventListener("token-expired", handleTokenExpiredEvent);
    };
  }, [navigate]);

  const isAuthenticated = Boolean(user && localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
