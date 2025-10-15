import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppProviderWithAuth from "./context/AppProviderWithAuth";
import { NotificationProvider } from "./context/NotificationContext";
import { NotificationContainer } from "./components/NotificationContainer/NotificationContainer";
import App from "./pages/Page";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <HashRouter>
      <AuthProvider>
        <AppProviderWithAuth>
          <NotificationProvider>
            <App />
            <NotificationContainer />
          </NotificationProvider>
        </AppProviderWithAuth>
      </AuthProvider>
    </HashRouter>
  );
}
