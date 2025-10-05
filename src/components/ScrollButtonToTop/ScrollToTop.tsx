import React, { useState, useEffect } from "react";
import "./scrollToTop.scss";
import { IconArrowTop } from "../Icon";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.pageYOffset > 400 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top ${isVisible ? "scroll-top--visible" : ""}`}
      onClick={scrollToTop}
      type="button"
    >
      <IconArrowTop style={{ width: 20, height: 20 }} />
    </button>
  );
};
