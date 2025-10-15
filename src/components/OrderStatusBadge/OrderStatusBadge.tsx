import React from "react";
import { Badge, BadgeType } from "../Badges/Badge";
import { OrderStatus, ORDER_STATUS_LABELS } from "../../types/Order";

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const getStatusBadgeType = (status: OrderStatus): BadgeType => {
  switch (status) {
    case OrderStatus.Created:
      return "created";
    case OrderStatus.Pending:
      return "pending";
    case OrderStatus.Shipped:
      return "shipped";
    case OrderStatus.Delivered:
      return "delivered";
    case OrderStatus.Cancelled:
      return "cancelled";
    default:
      return "created";
  }
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  className,
}) => {
  return (
    <Badge
      type={getStatusBadgeType(status)}
      text={ORDER_STATUS_LABELS[status]}
      className={className}
    />
  );
};
