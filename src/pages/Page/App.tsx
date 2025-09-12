import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "../../helpers/ScrollTop";
import { Header } from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import { HomePage } from "../HomePage/HomePage";
import { CategoryPage } from "../CategoryPage/CategoryPage";
import { ItemPage } from "../ItemPage/ItemPage";
import { FavoritesPage } from "../FavoritesPage/FavoritesPage";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import DeliveriesPage from "../DeliveriesPage/DeliveriesPage";
import ContactPage from "../ContactPage/ContactPage";
import TermsPage from "../TermsPage/TermsPage";
import PrivacyPage from "../PrivacyPage/PrivacyPage";
import { Footer } from "../../components/Footer/Footer";
import { CartPage } from "../CartPage/CartPage";
import "./app.scss";
import { PathnamesApp } from "../../types/Pathnames";

const App: React.FC = () => {
  const { pathname } = useLocation();
  const pathnameNormalized = pathname === "/" ? "home" : pathname.substring(1);

  return (
    <div className="page">
      <ScrollToTop />
      <Banner />
      <Header />
      <main className="page__main">
        <div
          className={`page__container page__container_${pathnameNormalized}`}
        >
          <Routes>
            <Route path={PathnamesApp.Home}>
              <Route index element={<HomePage />} />
              <Route path={PathnamesApp.Bavoirs}>
                <Route index element={<CategoryPage />} />
                <Route path=":id" element={<ItemPage />} />
              </Route>
              <Route path={PathnamesApp.Béguins} element={<CategoryPage />} />
              <Route path={PathnamesApp.Doudous} element={<CategoryPage />} />
              <Route
                path={PathnamesApp.Favorites}
                element={<FavoritesPage />}
              />
              <Route path={PathnamesApp.Cart} element={<CartPage />} />
              <Route
                path={PathnamesApp.Deliveries}
                element={<DeliveriesPage />}
              />
              <Route path={PathnamesApp.Contact} element={<ContactPage />} />
              <Route path={PathnamesApp.Terms} element={<TermsPage />} />
              <Route path={PathnamesApp.Privacy} element={<PrivacyPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
