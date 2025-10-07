import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductInCart } from "../../types/Product";
import { AppContext } from "../../context/AppContextProvider";
import "./checkoutCard.scss";
import { ButtonRemove } from "../Buttons/ButtonRemove/ButtonRemove";
import { ButtonsMoreLess } from "../Buttons/ButtonsMoreLess";

export type Props = {
  item: ProductInCart;
};

export const CheckoutCard: React.FC<Props> = ({ item }) => {
  const { toggleToCart, updateCountInCart } = useContext(AppContext);
  const [count, setCount] = useState(item.count);
  const [warningText, setWarningText] = useState<string | null>(null);

  useEffect(() => {
    updateCountInCart(item.id, count);
  }, [item.id, count]);

  useEffect(() => {
    setWarningText(
      count >= (item.itemsleft ?? Infinity) ? "Stock maximal atteint" : null
    );
  }, [count, item.itemsleft]);

  const totalPrice = () => {
    return item.price * count;
  };

  const handleDecrease = () => {
    setCount((prevCount: number) => prevCount - 1);
  };

  const handleIncrease = () => {
    if (item.itemsleft === undefined || count < item.itemsleft) {
      setCount((prevCount: number) => prevCount + 1);
    }
  };

  const maxReached = item.itemsleft !== undefined && count >= item.itemsleft;

  return (
    <div className="checkout-card">
      <div className="checkout-card__header">
        <ButtonRemove onClick={() => toggleToCart(item)} />
      </div>

      <div className="checkout-card__body">
        <div className="checkout-card__image-container">
          <img
            alt={item.name}
            src={`img/products/${item.mainimage}.jpg`}
            className="checkout-card__image"
            loading="lazy"
          />
        </div>

        <div className="checkout-card__details">
          <Link
            className="checkout-card__title"
            to={`/${item.category}/${item.id}`}
            title={item.name}
          >
            {item.name}
          </Link>

          <div className="checkout-card__meta">
            <span className="checkout-card__unit-price">
              Prix unitaire: {item.price}€
            </span>
            {item.itemsleft !== undefined && item.itemsleft < 5 && (
              <span className="checkout-card__stock-warning">
                Plus que {item.itemsleft} en stock
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="checkout-card__footer">
        <div className="checkout-card__controls">
          <ButtonsMoreLess
            count={count}
            maxReached={maxReached}
            warningText={warningText}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />
        </div>

        <div className="checkout-card__price-section">
          <span className="checkout-card__price-label">Total:</span>
          <p className="checkout-card__price">{`${totalPrice()}€`}</p>
        </div>
      </div>
    </div>
  );
};
