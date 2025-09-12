import React, { useContext } from "react";
import classNames from "classnames";
import { AppContext } from "../../context/AppContextProvider";
import { Product } from "../../types/Product";
import "./buttonAddToCart.scss";
import { IconFav } from "../Icon/IconFav";

export type Props = {
  isProductInFav: boolean;
  isProductInCart: boolean;
  product: Product;
};

export const ButtonAddToCart: React.FC<Props> = ({
  isProductInFav,
  isProductInCart,
  product,
}) => {
  const { toggleToFavorites, toggleToCart } = useContext(AppContext);

  return (
    <div className="buttons-container">
      {/* eslint-disable-next-line */}
      <button
        type="button"
        className={classNames("button button_add-to-cart", {
          selected: isProductInCart,
          disabled: product.itemsLeft === 0,
        })}
        onClick={() => product.itemsLeft !== 0 && toggleToCart(product)}
        disabled={product.itemsLeft === 0}
      >
        {product.itemsLeft === 0
          ? "Rupture de stock"
          : isProductInCart
            ? "Dans le panier"
            : "Ajouter au panier"}
      </button>
      {/* eslint-disable-next-line */}
      <button
        data-cy="addToFavorite"
        type="button"
        onClick={() => toggleToFavorites(product)}
        className={classNames("button button_like", {
          selected: isProductInFav,
        })}
      >
        <IconFav style={{ width: 20, height: 20 }} isFilled={isProductInFav} />
      </button>
    </div>
  );
};
