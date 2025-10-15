import React from "react";
import "./badge.scss";

export interface DiscountBadgeProps {
  text: string;
  className?: string;
}

export const DiscountBadge: React.FC<DiscountBadgeProps> = ({
  text,
  className,
}) => {
  return (
    <span className={`discount-badge ${className}`}>
      <span className="discount-badge__text">{text}</span>
    </span>
  );
};
