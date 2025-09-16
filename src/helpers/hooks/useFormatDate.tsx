import { useCallback } from "react";

export function useFormatDate() {
  return useCallback((dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, []);
}
