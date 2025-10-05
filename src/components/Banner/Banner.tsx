import React, { useEffect, useState } from "react";
import "./banner.scss";

const messages = [
  "Livraison offerte dès 100 euros !",
  "Temps de fabrication : 1-2 semaines",
];

const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner">
      <div className="banner__slider">
        <span key={index} className="banner__text">
          {messages[index]}
        </span>
      </div>
    </div>
  );
};

export default Banner;
