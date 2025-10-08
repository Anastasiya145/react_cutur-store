import { useMemo } from "react";
import { BadgeType } from "../components/Badges/Badge";

export interface StockInfo {
  itemsleft?: number;
  count: number;
}

export interface BadgeInfo {
  type: BadgeType;
  text: string;
  show: boolean;
}

export const useStockBadge = ({ itemsleft, count }: StockInfo): BadgeInfo => {
  return useMemo(() => {
    // Максимальное количество достигнуто
    if (itemsleft !== undefined && count >= itemsleft) {
      return {
        type: "error",
        text: "Stock maximal atteint",
        show: true,
      };
    }

    // Мало товара в наличии (меньше 5 штук)
    if (itemsleft !== undefined && itemsleft > 1 && itemsleft < 5) {
      return {
        type: "warning",
        text: `Plus que ${itemsleft} en stock`,
        show: true,
      };
    }

    // Товар заканчивается (1 штука)
    if (itemsleft === 1) {
      return {
        type: "error",
        text: "Dernière pièce !",
        show: true,
      };
    }

    // Товар закончился
    if (itemsleft === 0) {
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
  }, [itemsleft, count]);
};
