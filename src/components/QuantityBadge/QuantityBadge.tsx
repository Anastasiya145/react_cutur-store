import React from "react";
import "./quantityBadge.scss";

export interface QuantityBadgeProps {
  quantity: number;
  className?: string;
}

export const QuantityBadge: React.FC<QuantityBadgeProps> = ({
  quantity,
  className = "",
}) => {
  return <div className={`quantity-badge ${className}`}>{quantity}</div>;
};
