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
import ProfilePage from "../ProfilePage/ProfilePage";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../AuthPage/LoginPage";
import MesCommandesPage from "../MesCommandesPage/MesCommandesPage";
import RequireAuth from "../../components/RequireAuth/RequireAuth";
import CheckoutPage from "../CheckoutPage/CheckoutPage";

const AppRouter: React.FC = () => {
  const { pathname } = useLocation();
  const pathnameNormalized = pathname === "/" ? "home" : pathname.substring(1);

  const categoryPaths = [
    PathnamesApp.Bavoirs,
    PathnamesApp.Béguins,
    PathnamesApp.Doudous,
  ];

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
            <Route path={PathnamesApp.Register} element={<RegisterPage />} />
            <Route path={PathnamesApp.Profil} element={<ProfilePage />} />
            <Route path={PathnamesApp.Accueil}>
              <Route index element={<HomePage />} />
              {categoryPaths.map((cat) => (
                <Route key={cat} path={cat}>
                  <Route index element={<CategoryPage />} />
                  <Route path=":id" element={<ItemPage />} />
                </Route>
              ))}
              <Route path={PathnamesApp.Favoris} element={<FavoritesPage />} />
              <Route path={PathnamesApp.Panier} element={<CartPage />} />
              <Route
                path={PathnamesApp.Livraisons}
                element={<DeliveriesPage />}
              />
              <Route path={PathnamesApp.Contact} element={<ContactPage />} />
              <Route path={PathnamesApp.Conditions} element={<TermsPage />} />
              <Route
                path={PathnamesApp.Confidentialité}
                element={<PrivacyPage />}
              />

              <Route path={PathnamesApp.Connexion} element={<LoginPage />} />

              <Route path={PathnamesApp.Paiement} element={<CheckoutPage />} />

              {/* RequireAuth */}
              <Route
                path={PathnamesApp.Commandes}
                element={
                  <RequireAuth>
                    <MesCommandesPage />
                  </RequireAuth>
                }
              />
              <Route
                path={PathnamesApp.Profil}
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppRouter;
