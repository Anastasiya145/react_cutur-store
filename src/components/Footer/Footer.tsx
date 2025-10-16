import React from "react";
import { IconInstagram } from "../Icons/IconInstagram";
import "./footer.scss";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { PathnamesApp } from "../../types/Pathnames";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <Link to={PathnamesApp.Conditions} className="footer__link">
            Conditions Générales
          </Link>
          <Link to={PathnamesApp.Confidentialité} className="footer__link">
            Confidentialité
          </Link>
          <Link to={PathnamesApp.Contact} className="footer__link">
            Contactez-nous
          </Link>
        </div>
        <Link to="/" className="footer__logo-link">
          <Logo className="footer__logo" width={120} height={68} />
        </Link>
        <div className=" footer__right">
          <a
            href="https://instagram.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon-link"
            aria-label="Instagram"
          >
            <IconInstagram style={{ width: 20, height: 20 }} />
          </a>
        </div>
      </div>
      <a
        href="https://www.linkedin.com/in/anastasiya-ivanova-494567109/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer__licence-link"
      >
        <div className="footer__licence">
          © Web site is made by Anastasiya Ivanova
        </div>
      </a>
    </div>
  );
};
