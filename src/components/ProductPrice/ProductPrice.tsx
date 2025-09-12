import React from "react";
import "./productPrice.scss";
import { Product } from "../../types/Product";

export type Props = {
  price: Product["price"];
  // discount: Product["discount"];
  final_price: Product["final_price"];
};

export const ProductPrice: React.FC<Props> = ({
  price,
  // discount,
  final_price,
}) => {
  return (
    <div className="price">
      <div className="price__container">
        <p className="price__text price__text_bold">{`$${final_price}`}</p>
        {final_price !== price && (
          <>
            <p className="price__text price__text_discount">{`$${price}`}</p>
            {/* <span className="price__text price__text_discount-amount">
              -{discount}
            </span> */}
          </>
        )}
      </div>
    </div>
  );
};
