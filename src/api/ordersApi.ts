import { CreateOrderRequest, DeleteOrderRequest, Order } from "../types/Order";
import { BASE_URL, getAuthHeaders } from "./api";

function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Can not load data from server");
    }
    return response.json();
  });
}

export const getOrdersForConnectedUser = () =>
  request<Order[]>("/commandes", {
    headers: {
      ...getAuthHeaders(),
    },
  });

export const getOrderById = (id: number) =>
  request<Order>(`/commande/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

export const createOrder = (data: CreateOrderRequest) =>
  request<Order>("/commande", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

export const deleteOrder = (data: DeleteOrderRequest) =>
  request<Order>(`/commande/${data.id_commande}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ user_email: data.user_email }),
  });
