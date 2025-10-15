import { useState, useEffect, useRef } from "react";

/**
 * Хук для пользователь-специфичного localStorage
 * Принимает пользователя как параметр, чтобы избежать циркулярной зависимости
 */
export function useUserLocalStorageWithUser<T>(
  key: string,
  initialValue: T,
  user: string | null
) {
  const initialValueRef = useRef(initialValue);
  const userKey = user ? `${key}_${user}` : `${key}_guest`;
  const prevUserKeyRef = useRef(userKey);

  const [value, setValue] = useState<T>(() => {
    try {
      const data = localStorage.getItem(userKey);
      return data ? JSON.parse(data) : initialValueRef.current;
    } catch (error) {

      return initialValueRef.current;
    }
  });

  useEffect(() => {
    if (prevUserKeyRef.current !== userKey) {
      const prevUser = prevUserKeyRef.current.includes("_")
        ? prevUserKeyRef.current.split("_")[1]
        : null;
      const currentUser = userKey.includes("_") ? userKey.split("_")[1] : null;

      // User logout - clear data
      if (prevUser && prevUser !== "guest" && currentUser === "guest") {
        setValue(initialValueRef.current);
        prevUserKeyRef.current = userKey;
        return;
      }

      // Guest login - transfer data
      if (prevUser === "guest" && currentUser && currentUser !== "guest") {

        try {
          const guestKey = `${key}_guest`;
          const guestData = localStorage.getItem(guestKey);
          const userData = localStorage.getItem(userKey);

          let newValue = initialValueRef.current;

          if (guestData) {
            const guestParsedData = JSON.parse(guestData);

            if (userData) {
              const userParsedData = JSON.parse(userData);

              // Merge arrays, removing duplicates by id
              if (
                Array.isArray(guestParsedData) &&
                Array.isArray(userParsedData)
              ) {
                const combined = [...userParsedData];
                guestParsedData.forEach((guestItem: any) => {
                  if (!combined.find((item: any) => item.id === guestItem.id)) {
                    combined.push(guestItem);
                  }
                });
                newValue = combined as T;
              } else {
                newValue = userParsedData;
              }
            } else {
              newValue = guestParsedData;
            }

            localStorage.setItem(userKey, JSON.stringify(newValue));
            localStorage.removeItem(guestKey);
          } else if (userData) {
            newValue = JSON.parse(userData);
          }

          setValue(newValue);
        } catch (error) {
          setValue(initialValueRef.current);
        }

        prevUserKeyRef.current = userKey;
        return;
      }

      // Normal user switch or first load
      try {
        const data = localStorage.getItem(userKey);
        const newValue = data ? JSON.parse(data) : initialValueRef.current;
        setValue(newValue);
      } catch (error) {
        setValue(initialValueRef.current);
      }

      prevUserKeyRef.current = userKey;
    }
  }, [userKey, key]);

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(userKey, JSON.stringify(valueToStore));
    } catch (error) {
      // Silent fail
    }
  };

  const clearUserData = () => {
    try {
      localStorage.removeItem(userKey);
      setValue(initialValueRef.current);
    } catch (error) {
      // Silent fail
    }
  };

  return [value, setStoredValue, clearUserData] as const;
}
