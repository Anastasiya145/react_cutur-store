import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AppProvider } from "./context/AppContextProvider";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <AppProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppProvider>
  );
}
