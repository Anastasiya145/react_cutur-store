import { useMemo } from "react";
import { BadgeType } from "../components/Badges/Badge";

export interface StockInfo {
  items_left?: number;
  count: number;
}

export interface BadgeInfo {
  type: BadgeType;
  text: string;
  show: boolean;
}

export const useStockBadge = ({ items_left, count }: StockInfo): BadgeInfo => {
  return useMemo(() => {
    // Максимальное количество достигнуто
    // if (items_left !== undefined && count >= items_left) {
    //   return {
    //     type: "error",
    //     text: "Stock maximal atteint",
    //     show: true,
    //   };
    // }

    // Мало товара в наличии (меньше 5 штук)
    if (items_left !== undefined && items_left > 1 && items_left < 5) {
      return {
        type: "warning",
        text: `Plus que ${items_left} en stock`,
        show: true,
      };
    }

    // Товар заканчивается (1 штука)
    if (items_left === 1) {
      return {
        type: "error",
        text: "Dernière pièce !",
        show: true,
      };
    }

    // Товар закончился
    if (items_left === 0) {
      return {
        type: "error",
        text: "Rupture de stock",
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
