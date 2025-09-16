export type CreateOrderItem = {
  id: number;
  quantity: number;
};

export enum OrderStatus {
  Created = "Created",
  Pending = "En cours de traitement",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

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
