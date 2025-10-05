import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { AppContext } from "../../context/AppContextProvider";
import { ProductInCart } from "../../types/Product";
import { ModelsCounter } from "../../components/ModelsCounter/ModelsCounter";
import { NotFound } from "../../components/NotFound/NotFound";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { CheckoutCard } from "../../components/CheckoutCard/CheckoutCard";
import "./cartPage.scss";
import { PathnamesApp } from "../../types/Pathnames";

export const CartPage: React.FC = () => {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  const unavailableItems = useMemo(
    () => cart.filter((item) => item.itemsleft === 0),
    [cart]
  );
  const hasUnavailable = unavailableItems.length > 0;
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [totalModelsCount, setTotalModelsCount] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      const totalCost = cart.reduce(
        (accumulator, item: ProductInCart) =>
          accumulator + item.price * item.count,
        0
      );

      const totalCount = cart.reduce(
        (accumulator, item: ProductInCart) => accumulator + item.count,
        0
      );

      setTotalSum(totalCost);
      setTotalModelsCount(totalCount);
    }
  }, [cart]);

  useEffect(() => {
    setTimeout(() => {
      setIsPopupShown(false);
    }, 3000);
  }, [isPopupShown]);

  const isAuthenticated = Boolean(localStorage.getItem("user"));
  console.log(localStorage);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      navigate(PathnamesApp.Paiement);
    }
  };

  return (
    <div className="cart-page__cart">
      <BreadCrumbs />
      <h1 className="cart-page__title">Cart</h1>
      <ModelsCounter number={cart.length} />

      {!cart.length ? (
        <NotFound title="Your cart is empty" />
      ) : (
        <div className="cart-page">
          <div className="cart-page__products">
            {cart.map((item) => (
              <CheckoutCard key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-page__container">
            {hasUnavailable && (
              <div className="cart-page__error">
                Some items in your cart are out of stock. Please remove them to
                proceed.
              </div>
            )}
            <h1 data-cy="productQauntity" className="cart-page__budget">
              {`$${totalSum}`}
            </h1>
            <p className="cart-page__text">{`Total for ${totalModelsCount} items`}</p>
            <button
              type="button"
              className="cart-page__checkout"
              onClick={handleCheckout}
              disabled={hasUnavailable}
              style={
                hasUnavailable ? { opacity: 0.5, cursor: "not-allowed" } : {}
              }
            >
              Checkout
            </button>
          </div>
          <div
            className={classNames("cart-page__popup", {
              "cart-page__popup_shown": isPopupShown,
            })}
          >
            Sorry, this funtion is not implemented yet.
          </div>
        </div>
      )}
    </div>
  );
};
