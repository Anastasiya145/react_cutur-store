import React, { useEffect, useState } from "react";
import "./banner.scss";
import { bannerMessages } from "../../constants/messages";

const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = bannerMessages[index];

  return (
    <div className="banner">
      <div className="banner__slider">
        <span key={index} className="banner__content">
          {currentMessage.icon && (
            <span className="banner__icon" aria-hidden="true">
              {currentMessage.icon}
            </span>
          )}
          <span className="banner__text">{currentMessage.text}</span>
        </span>
      </div>
    </div>
  );
};

export default Banner;
