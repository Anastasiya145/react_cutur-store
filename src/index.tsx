import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContextProvider";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { NotificationContainer } from "./components/NotificationContainer/NotificationContainer";
import App from "./pages/Page";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <AppProvider>
      <HashRouter>
        <AuthProvider>
          <NotificationProvider>
            <App />
            <NotificationContainer />
          </NotificationProvider>
        </AuthProvider>
      </HashRouter>
    </AppProvider>
  );
}
