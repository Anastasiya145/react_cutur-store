import React from "react";
import { IconArrowLeft } from "../../components/Icon/IconArrowLeft";

export const ProductBackButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => (
  <div className="product-details__back">
    <button
      type="button"
      className="product-details__button-back"
      onClick={onClick}
    >
      <IconArrowLeft style={{ width: 16, height: 16 }} />
      Back
    </button>
  </div>
);
