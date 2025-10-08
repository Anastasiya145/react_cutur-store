import React from "react";
import { Badge } from "../Badges/Badge";
import { OrderStatus, ORDER_STATUS_LABELS } from "../../types/Order";

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const getStatusBadgeType = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Created:
      return "success";
    case OrderStatus.Pending:
      return "info";
    case OrderStatus.Shipped:
      return "info";
    case OrderStatus.Delivered:
      return "success";
    case OrderStatus.Cancelled:
      return "error";
    default:
      return "info";
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
