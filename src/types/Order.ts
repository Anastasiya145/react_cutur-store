export type CreateOrderItem = {
  id: number;
  quantity: number;
};

export enum OrderStatus {
  Created = "created",
  Pending = "pending",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.Created]: "créée",
  [OrderStatus.Pending]: "en cours de traitement",
  [OrderStatus.Shipped]: "en cours de livraison",
  [OrderStatus.Delivered]: "livré",
  [OrderStatus.Cancelled]: "annulé",
};

export type CreateOrderRequest = {
  user_email: string;
  items: CreateOrderItem[];
};

export type DeleteOrderRequest = {
  user_email: string;
  id_commande: number;
};

// Как приходит заказ с сервера:
export type OrderItem = {
  id: number; // id строки в order_items
  order_id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  created_at: string;
};

export type Order = {
  id: number;
  user_email: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[]; // массив строк заказа
  created_at?: string;
  updated_at?: string;
};
