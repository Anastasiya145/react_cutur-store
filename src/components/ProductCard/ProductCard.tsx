import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { Product } from "../../types/Product";
import { ProductPrice } from "../ProductPrice/ProductPrice";
import { ButtonAddToCart } from "../Buttons/ButtonAddToCart/ButtonAddToCart";
// import { Badge } from "../Badges/Badge";
// import { useStockBadge } from "../../hooks/useStockBadge";
import "./productCard.scss";
import classNames from "classnames";
import { DiscountBadge } from "../Badges/DiscountBadge";

export type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favorites, isProductSelected, cart } = useContext(AppContext);

  const isProductSelectedinFav = isProductSelected(product.id, favorites);
  const isProductSelectedinCart = isProductSelected(product.id, cart);
  const isOutOfStock = product.items_left === 0;
  // const stockBadge = useStockBadge({
  //   items_left: product.items_left,
  // });

  return (
    <Link
      className={classNames("card", {
        "card--disabled": isOutOfStock,
        "card--on-sale": product.final_price !== product.price,
      })}
      to={`/${product.category}/${product.id}`}
    >
      <div className="card__image-container">
        {product.images[0] && (
          <img
            className="card__image"
            alt={product.name}
            src={`img/products/${product.main_image}.jpg`}
            loading="lazy"
          />
        )}

        <div className="card__badges">
          {product.final_price !== product.price && (
            <DiscountBadge
              text={`${Math.round(((product.price - product.final_price) / product.price) * 100)}%`}
              className="card__badge"
            />
          )}

          {/* {stockBadge.show && (
            <Badge
              type={stockBadge.type}
              text={stockBadge.text}
              icon={false}
              className="card__badge card__badge--stock"
            />
          )} */}
        </div>

        <div className="card__overlay">
          <span className="card__overlay-text">Voir les détails</span>
        </div>
      </div>

      <div className="card__content">
        <h3 className="card__title">{product.name}</h3>

        <div className="card__price">
          <ProductPrice
            price={product.price}
            final_price={product.final_price}
          />
        </div>

        <div className="card__actions">
          <ButtonAddToCart
            product={product}
            isProductInFav={isProductSelectedinFav}
            isProductInCart={isProductSelectedinCart}
          />
        </div>
      </div>
    </Link>
  );
};
