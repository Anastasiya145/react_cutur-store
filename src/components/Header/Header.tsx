import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconUser } from "../Icon/IconUser";
import classNames from "classnames";
import { PageNavLink } from "../../helpers/PageNavLink";
import { AppContext } from "../../context/AppContextProvider";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "../SearchBar/SearchBar";
import { PathnamesApp, PathnamesForNav } from "../../types/Pathnames";
import "./header.scss";
import { IconMenuCart } from "../IconMenu/IconMenuCart";
import { IconMenuFavorites } from "../IconMenu/IconMenuFavorites";
import { IconMenu } from "../Icon/IconMenu";
import { IconClose } from "../Icon/IconClose";
// import { Logo } from "../Logo/Logo";
import UserIconLink from "../Icon/UserIconLink";

const linkAddress = (pageName: string) => {
  return pageName === "Home" ? "/" : pageName.toLowerCase();
};

export const Header: React.FC = () => {
  const { favorites, cart } = useContext(AppContext);
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const navigate = useNavigate();

  const pathnameNormalized = pathname.substring(1);

  const isSearchBarShown = Object.keys(PathnamesForNav).some(
    (path) => path.toLowerCase() === pathnameNormalized
  );
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    setIsMenuOpened(false);
    setShowUserMenu(false);
  }, [pathname]);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userBtnRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  useEffect(() => {
    if (!showUserMenu) return;
    const handleClick = (e: MouseEvent) => {
      if (
        userBtnRef.current &&
        !userBtnRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement)?.closest(".header__user-menu")
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showUserMenu]);

  return (
    <>
      <div id="header" className="header">
        <div className="header__content">
          <div className="header__logo" onClick={() => navigate("/")} />
          <div className="nav">
            {Object.keys(PathnamesForNav).map((item) => (
              <PageNavLink key={item} text={item} to={linkAddress(item)} />
            ))}
          </div>
        </div>
        <div className="header__container">
          {isSearchBarShown && <SearchBar />}
          {isAuthenticated ? (
            <div style={{ position: "relative" }}>
              <button
                className="icon header__user-btn"
                ref={userBtnRef}
                onClick={() => setShowUserMenu((v) => !v)}
                type="button"
              >
                <IconUser className="icon__img" style={{ width: 24, height: 24 }} />
              </button>
              {showUserMenu && (
                <div className="header__user-menu">
                  <Link to="/orders" className="header__user-menu-item">
                    Mes commandes
                  </Link>
                  <Link to="/profile" className="header__user-menu-item">
                    Paramètres du compte
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <UserIconLink />
          )}
          <IconMenuFavorites count={favorites.length} link={PathnamesApp.Favorites} />
          <IconMenuCart count={cart.length} link={PathnamesApp.Cart} />
          {/* eslint-disable-next-line */}
          <button type="button" className="header__menu-open-button" onClick={toggleMenu}>
            <IconMenu style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
      <nav
        className={classNames("header__menu", {
          header__menu_opened: isMenuOpened,
        })}
      >
        <div className="header__box">
          {/* <div className="header__logo-container">
            <Link to={PathnamesApp.Home} className="header__logo" />
          </div> */}
          <div className="header__logo" />
          {/* eslint-disable-next-line */}
          <button type="button" className="header__menu-open-button" onClick={toggleMenu}>
            <IconClose style={{ width: 20, height: 20 }} />
          </button>
        </div>
        <div className="nav">
          {Object.keys(PathnamesForNav).map((item) => (
            <PageNavLink key={item} text={item} to={linkAddress(item)} />
          ))}
          <div className="header__container">
            <IconMenuFavorites count={favorites.length} link={PathnamesApp.Favorites} />
            <IconMenuCart count={cart.length} link={PathnamesApp.Cart} />
          </div>
        </div>
      </nav>
    </>
  );
};
