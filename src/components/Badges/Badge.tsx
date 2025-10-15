import React from "react";
import "./badge.scss";

export type BadgeType =
  | "warning"
  | "error"
  | "success"
  | "info"
  | "created"
  | "pending"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "processing"
  | "payment"
  | "shipping";

export interface BadgeProps {
  type: BadgeType;
  text: string;
  icon?: boolean;
  className?: string;
}

const BadgeIcons: Record<BadgeType, string> = {
  warning: "⚠️",
  error: "❌",
  success: "✅",
  info: "ℹ️",

  created: "📝",
  pending: "⏳",
  shipped: "🚚",
  delivered: "📦",
  cancelled: "❌",

  processing: "⚙️",
  payment: "💳",
  shipping: "🚛",
};

export const Badge: React.FC<BadgeProps> = ({
  type,
  text,
  icon = true,
  className = "",
}) => {
  return (
    <span className={`badge badge--${type} ${className}`}>
      {icon && <span className="badge__icon">{BadgeIcons[type]}</span>}
      <span className="badge__text">{text}</span>
    </span>
  );
};
