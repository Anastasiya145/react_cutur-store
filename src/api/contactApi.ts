import { request } from "./api";

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
