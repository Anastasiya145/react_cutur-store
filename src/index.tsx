import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContextProvider";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./pages/Page";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <AppProvider>
      <HashRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </HashRouter>
    </AppProvider>
  );
}
