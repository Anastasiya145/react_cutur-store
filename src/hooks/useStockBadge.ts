import { useMemo } from "react";
import { BadgeType } from "../components/Badges/Badge";

export interface StockInfo {
  items_left: number;
  count?: number;
}

export interface BadgeInfo {
  type: BadgeType;
  text: string;
  show: boolean;
}

export const useStockBadge = ({ items_left, count }: StockInfo): BadgeInfo => {
  return useMemo(() => {
    // Maximum quantity reached
    if (count && count >= items_left) {
      return {
        type: "error",
        text: "Stock maximal atteint",
        show: true,
      };
    }

    // Low stock (less than 5 items)
    if (items_left !== undefined && items_left > 1 && items_left < 5) {
      return {
        type: "warning",
        text: `Plus que ${items_left} en stock`,
        show: true,
      };
    }

    // Last item
    if (items_left === 1) {
      return {
        type: "disabled",
        text: "Dernière pièce !",
        show: true,
      };
    }

    return {
      type: "info",
      text: "",
      show: false,
    };
  }, [items_left, count]);
};
