import React from "react";
import { AppProvider } from "./AppContextProvider";
import { useAuth } from "./AuthContext";

/**
 * Composite provider that combines AppProvider with AuthContext
 * Solves circular dependency issues
 */
const AppProviderWithAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  return <AppProvider user={user}>{children}</AppProvider>;
};

export default AppProviderWithAuth;
