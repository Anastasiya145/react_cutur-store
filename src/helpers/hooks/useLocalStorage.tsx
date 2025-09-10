import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (currentValue: T) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save] as const;
}
