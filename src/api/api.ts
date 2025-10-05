export const BASE_URL = "https://nodecutur-store.vercel.app";

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");

  console.log(localStorage);
  return token ? { Authorization: `Bearer ${token}` } : {};
}
