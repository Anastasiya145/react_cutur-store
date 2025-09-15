import { BASE_URL } from "./constants";

function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Can not load data from server");
    }
    return response.json();
  });
}

export const contactUs = (data: {
  name: string;
  email: string;
  message: string;
}) =>
  request<{ message: string }>("/contact-us", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
