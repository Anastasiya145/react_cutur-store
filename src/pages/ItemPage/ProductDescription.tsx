import React from "react";
import { Product } from "../../types/Product";

type Props = {
  description: Product["description"];
};

export const ProductDescription: React.FC<Props> = ({ description }) => (
  <div className="product-details__row">
    <div className="product-details__section">
      <h2 className="product-details__subtitle">À propos</h2>
      <div data-cy="productDescription" className="description">
        <h3 className="description__title">{description.title}</h3>
        {description.text?.map((text, i) => (
          <p className="description__text" key={i}>
            {text}
          </p>
        ))}
        {description.advice && (
          <p className="description__advice">
            <span className="description__advice-icon">✨</span>{" "}
            {description.advice}
          </p>
        )}
      </div>
    </div>
  </div>
);
