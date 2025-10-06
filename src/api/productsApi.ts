import { Product } from "../types/Product";
import { Category } from "../types/Category";
import { request } from "./api";

export const getProducts = () => request<Product[]>("/products");
export const getProductById = (id: string) =>
  request<Product>(`/products/${id}`);
export const getProductByCategory = (categoryName: string) =>
  request<Product[]>(`/categories/${categoryName}`);
export const getCategories = () => request<Category[]>(`/categories`);
