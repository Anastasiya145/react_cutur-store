export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  id: number;
  user_email: string;
  date: string; // ISO date string
  status: string;
  total: number;
  items: OrderItem[];
};

export type CreateOrderRequest = {
  user_email: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
};
