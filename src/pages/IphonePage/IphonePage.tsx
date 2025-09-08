import React from "react";
import "./IphonePage.scss";

export const IphonePage: React.FC = () => {
  return (
    <div className="iphone-page">
      <h1>iPhone</h1>
      <img
        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669"
        alt="iPhone 15 Pro"
        className="iphone-page__image"
      />
    </div>
  );
};
