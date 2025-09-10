import React from "react";

import { IconInstagram } from "../Icon/IconInstagram";
import "./footer.scss";
import { IconArrowTop } from "../Icon/IconArrowTop";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <Link to="/deliveries" className="footer__link">
            Livraisons
          </Link>

          <Link to="/terms" className="footer__link">
            Conditions Générales
          </Link>
          <Link to="/privacy" className="footer__link">
            Confidentialité
          </Link>
        </div>
        <Link to="/" className="footer__logo-link">
          <Logo className="footer__logo" width={120} height={68} />
        </Link>
        <div className=" footer__right">
          <a
            href="https://instagram.com/yourbrand" // замените на ваш инстаграм
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon-link"
            aria-label="Instagram"
          >
            <IconInstagram style={{ width: 20, height: 20 }} />
          </a>
        </div>
        {/* eslint-disable-next-line */}
        <button
          className="button button_scroll"
          type="button"
          onClick={() => scrollToElement("header")}
        >
          <IconArrowTop style={{ width: 20, height: 20 }} className="" />
        </button>
      </div>
      <a
        href="https://www.linkedin.com/in/anastasiya-ivanova-494567109/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer__credit-link"
      >
        <div className="footer__credit">
          Web site is made by Anastasiya Ivanova
        </div>
      </a>
    </div>
  );
};
