import { Product } from "../types/Product";

const BASE_URL = "https://nodecutur-store.vercel.app";

function request<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then((response) => {
    if (!response.ok) {
      throw new Error("Can not load data from server");
    }
    return response.json();
  });
}

export const getProducts = () => {
  return request<Product[]>("/products");
};

export const getProductById = (id: string) => {
  return request<Product>(`/products/${id}`);
};

export const getProductByCategory = (categoryName: string) => {
  return request<Product[]>(`/categories/${categoryName}`);
};

export const getCategories = () => {
  return request<Category[]>(`/categories`);
};

import { Category } from "../types/Category";
