import { CreateOrderRequest, DeleteOrderRequest, Order } from "../types/Order";
import { request } from "./api";

export const getOrdersForConnectedUser = () => request<Order[]>("/commandes");

export const getOrderById = (id: number) => request<Order>(`/commande/${id}`);

export const createOrder = (data: CreateOrderRequest) =>
  request<Order>("/commande", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteOrder = (data: DeleteOrderRequest) =>
  request<Order>(`/commande/${data.id_commande}`, {
    method: "DELETE",
    body: JSON.stringify({ user_email: data.user_email }),
  });
