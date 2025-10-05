import { Product } from "../types/Product";
import { SortType } from "../types/SortType";

export const sortProducts = (
  products: Product[],
  sortBy: string
): Product[] => {
  const copyOfProducts = [...products];

  return copyOfProducts.sort((item1, item2) => {
    const finalPrice1 = item1.final_price;
    const finalPrice2 = item2.final_price;
    const discount1 = item1.discount;
    const discount2 = item2.discount;

    switch (sortBy) {
      case SortType.Cheapest:
        return finalPrice1 - finalPrice2;

      case SortType.Expensive:
        return finalPrice2 - finalPrice1;

      case SortType.Alphabetically:
        return item1.name.localeCompare(item2.name);

      case SortType.MaxDiscount:
        return discount2 - discount1;

      case SortType.Random:
        return Math.random() - 0.5;

      default:
        return 0;
    }
  });
};
