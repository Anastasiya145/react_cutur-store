import { Product } from "../types/Product";
import { Category } from "../types/Category";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/Auth";
// Импортируйте нужные типы для аутентификации и контактов

const BASE_URL = "https://nodecutur-store.vercel.app";

function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Can not load data from server");
    }
    return response.json();
  });
}

// PRODUCTS
export const getProducts = () => request<Product[]>("/products");
export const getProductById = (id: string) =>
  request<Product>(`/products/${id}`);
export const getProductByCategory = (categoryName: string) =>
  request<Product[]>(`/categories/${categoryName}`);
export const getCategories = () => request<Category[]>(`/categories`);

// AUTH
export const register = (data: RegisterRequest) =>
  request<RegisterResponse>("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const login = (data: LoginRequest) =>
  request<LoginResponse>("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const forgotPassword = (data: ForgotPasswordRequest) =>
  request<ForgotPasswordResponse>("/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const resetPassword = (data: ResetPasswordRequest) =>
  request<ResetPasswordResponse>("/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// CONTACT US
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
