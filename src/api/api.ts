export const BASE_URL = "https://nodecutur-store.vercel.app";

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");

  console.log(localStorage);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function request<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...options?.headers,
  };

  return fetch(BASE_URL + url, {
    ...options,
    headers,
  }).then(async (response) => {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (typeof errorData === "string") {
          errorMessage = errorData;
        }
      } catch (parseError) {
        // If JSON parsing fails, use the default HTTP error message
        console.warn("Failed to parse error response as JSON:", parseError);
      }

      throw new Error(errorMessage);
    }
    return response.json();
  });
}
