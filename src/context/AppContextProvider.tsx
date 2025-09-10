import React, { createContext, useContext } from "react";
import { Product, ProductInCart } from "../types/Product";
import { useLocalStorage } from "../helpers/hooks/useLocalStorage";

export type AppContextType = {
  favorites: Product[];
  cart: ProductInCart[];
  toggleToFavorites: (product: Product) => void;
  toggleToCart: (product: Product | ProductInCart) => void;
  isProductSelected: (
    productId: Product["id"],
    products: Product[] | ProductInCart[]
  ) => boolean;
  updateCountInCart: (id: Product["id"], newCount: number) => void;
};

export const AppContext = createContext<AppContextType>({
  favorites: [],
  cart: [],
  toggleToFavorites: () => {},
  toggleToCart: () => {},
  isProductSelected: () => false,
  updateCountInCart: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>("favorites", []);
  const [cart, setCart] = useLocalStorage<ProductInCart[]>("cart", []);

  const isProductSelected = (
    productId: Product["id"],
    productsGroup: Array<{ id: Product["id"] }>
  ): boolean => {
    return productsGroup.some((product) => product.id === productId);
  };

  const toggleToFavorites = (item: Product) => {
    if (isProductSelected(item.id, favorites)) {
      setFavorites(favorites.filter((product) => product.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const toggleToCart = (item: Product | ProductInCart) => {
    const exists = isProductSelected(item.id, cart);
    if (exists) {
      setCart(cart.filter((product) => product.id !== item.id));
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const updateCountInCart = (productId: Product["id"], newCount: number) => {
    const updatedCart = cart.map((item: ProductInCart) => {
      if (item.id === productId) {
        return { ...item, count: newCount };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        cart,
        toggleToFavorites,
        toggleToCart,
        isProductSelected,
        updateCountInCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
