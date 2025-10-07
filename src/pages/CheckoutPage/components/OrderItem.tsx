import React from "react";
import { ProductInCart } from "../../../types/Product";

interface OrderItemProps {
  item: ProductInCart;
}

export const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const totalPrice = item.price * item.count;

  return (
    <div className="order-item">
      <div className="order-item__image">
        <img
          src={
            item.images && item.images.length > 0
              ? item.images[0]
              : "/img/placeholder.jpg"
          }
          alt={item.name}
          className="order-item__img"
        />
        <div className="order-item__quantity">{item.count}</div>
      </div>

      <div className="order-item__details">
        <h4 className="order-item__name">{item.name}</h4>
        {item.color && (
          <div className="order-item__variant">Couleur: {item.color}</div>
        )}
        <div className="order-item__price">
          {item.count} × {item.price.toFixed(2)}€ = {totalPrice.toFixed(2)}€
        </div>
      </div>
    </div>
  );
};
