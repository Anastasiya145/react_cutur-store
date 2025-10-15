import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { PathnamesApp } from "../types/Pathnames";
import { UserRole } from "../types/Auth";

interface AuthContextType {
  user: string | null;
  userRole: string | null;
  loginUser: (username: string, token: string, role?: string) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginUser = (
    username: string,
    token: string,
    role: string = "User"
  ) => {
    localStorage.setItem("user", username);
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    setUser(username);
    setUserRole(role);
  };

  const logoutUser = () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate(PathnamesApp.Connexion);
  };

  const handleTokenExpired = () => {
    setUser(null);
    navigate(PathnamesApp.Connexion, { replace: true });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedUserRole = localStorage.getItem("userRole");

    // Check both user and token presence
    if (storedUser && storedToken) {
      setUser(storedUser);
      setUserRole(storedUserRole || "User");
    } else if (storedUser && !storedToken) {
      // If user exists but no token - clear all data
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      setUser(null);
      setUserRole(null);
    }
  }, []);

  // Listen for token expiration events
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
  const isAdmin = userRole === UserRole.Admin;

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loginUser,
        logoutUser,
        isAuthenticated,
        isAdmin,
      }}
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
