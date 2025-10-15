import React, { createContext, useContext } from "react";
import { Product, ProductInCart } from "../types/Product";
import { useUserLocalStorageWithUser } from "../helpers/hooks/useUserLocalStorageWithUser";

// Constant values to avoid recreation on each render
const EMPTY_FAVORITES: Product[] = [];
const EMPTY_CART: ProductInCart[] = [];

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
  clearCart: () => void;
  clearAllUserData: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  favorites: EMPTY_FAVORITES,
  cart: EMPTY_CART,
  toggleToFavorites: () => {},
  toggleToCart: () => {},
  isProductSelected: () => false,
  updateCountInCart: () => {},
  clearCart: () => {},
  clearAllUserData: () => {},
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
});

type AppProviderProps = {
  children: React.ReactNode;
  user: string | null;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children, user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const prevUserRef = React.useRef(user);

  const [favorites, setFavorites, clearUserFavorites] =
    useUserLocalStorageWithUser<Product[]>("favorites", EMPTY_FAVORITES, user);
  const [cart, setCart, clearUserCart] = useUserLocalStorageWithUser<
    ProductInCart[]
  >("cart", EMPTY_CART, user);

  // Track user logout and clear data
  React.useEffect(() => {
    if (prevUserRef.current && prevUserRef.current !== "guest" && !user) {
      setFavorites(EMPTY_FAVORITES);
      setCart(EMPTY_CART);
    }
    prevUserRef.current = user;
  }, [user, setFavorites, setCart]);

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

  const clearCart = () => {
    setCart([]);
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

  const clearAllUserData = () => {
    clearUserFavorites();
    clearUserCart();
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
        clearCart,
        clearAllUserData,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
