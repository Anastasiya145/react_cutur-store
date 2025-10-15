export const BASE_URL = "https://nodecutur-store.vercel.app";

export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");


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
      // Проверяем на ошибку авторизации (истечение токена)
      if (response.status === 401) {
        // Очищаем localStorage и уведомляем о необходимости повторной аутентификации
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Запускаем событие для AuthContext
        window.dispatchEvent(new CustomEvent("token-expired"));

        throw new Error("Сессия истекла. Необходимо войти в систему снова.");
      }

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
