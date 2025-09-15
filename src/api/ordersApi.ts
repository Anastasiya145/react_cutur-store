import { CreateOrderRequest, Order } from "../types/Order";
import { BASE_URL } from "./constants";

function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Can not load data from server");
    }
    return response.json();
  });
}

export const getOrders = () => request<Order[]>("/commandes");
export const getOrdersByUserEmail = (userEmail: string) =>
  request<Order[]>(`/commandes/${userEmail}`);
export const getOrderById = (id: number) => request<Order>(`/commande/${id}`);
export const createOrder = (data: CreateOrderRequest) =>
  request<Order>("/commande", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
