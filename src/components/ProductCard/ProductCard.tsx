import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { Product } from "../../types/Product";
import { ProductPrice } from "../ProductPrice/ProductPrice";
import { ButtonAddToCart } from "../ButtonAddToCart/ButtonAddToCart";
import "./productCard.scss";

export type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favorites, isProductSelected, cart } = useContext(AppContext);

  const isProductSelectedinFav = isProductSelected(product.id, favorites);
  const isProductSelectedinCart = isProductSelected(product.id, cart);

  return (
    <div className="card">
      <Link className="card__link" to={`/${product.category}/${product.id}`}>
        {product.images[0] && (
          <img
            className="card__image"
            alt={product.name}
            src={product.images[0]}
          />
        )}
      </Link>
      <h1 className="card__title">{product.name}</h1>
      <div className="card__price">
        <ProductPrice
          price={product.price}
          discount={product.discount}
          final_price={product.final_price}
        />
      </div>
      <ButtonAddToCart
        product={product}
        isProductInFav={isProductSelectedinFav}
        isProductInCart={isProductSelectedinCart}
      />
    </div>
  );
};
