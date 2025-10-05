import { Product } from "../types/Product";
import { Category } from "../types/Category";
import { BASE_URL } from "./api";

function request<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error("Can not load data from server");
    }
    return response.json();
  });
}

export const getProducts = () => request<Product[]>("/products");
export const getProductById = (id: string) =>
  request<Product>(`/products/${id}`);
export const getProductByCategory = (categoryName: string) =>
  request<Product[]>(`/categories/${categoryName}`);
export const getCategories = () => request<Category[]>(`/categories`);
