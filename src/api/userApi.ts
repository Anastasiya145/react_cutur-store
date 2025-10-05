import { ConnectedUser } from "../types/User";

const BASE_URL = "https://nodecutur-store.vercel.app";

function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Can not load data from server");
    }
    return response.json();
  });
}

export const getUserByEmail = (email: string) =>
  request<ConnectedUser>(`/users/${email}`);

export const updateUserAddress = (email: string, address: string) =>
  request<ConnectedUser>(`/users/${email}/address`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address }),
  });
