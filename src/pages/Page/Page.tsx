import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "../../context/AppContextProvider";
import { Product, ProductInCart } from "../../types/Product";
import { getProducts } from "../../api/fetchData";
import { useLocalStorage } from "../../helpers/hooks/useLocalStorage";
import ScrollToTop from "../../helpers/ScrollTop";
import { Header } from "../../components/Header/Header";
import { HomePage } from "../HomePage/HomePage";
import { CategoryPage } from "../CategoryPage/CategoryPage";
// import { ItemPage } from "../ItemPage/ItemPage";
import { FavoritesPage } from "../FavoritesPage/FavoritesPage";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { Footer } from "../../components/Footer/Footer";
import { CartPage } from "../CartPage/CartPage";
import "./page.scss";
import { PathnamesApp } from "../../types/Pathnames";

export const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [cart, setCart] = useLocalStorage("cart", []);
  const { pathname } = useLocation();

  // delete later
  console.log(accessories, tablets, phones);

  const pathnameNormalized = pathname === "/" ? "home" : pathname.substring(1);

  async function loadProducts() {
    setIsLoading(true);

    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setPhones(products.filter((item) => item.category === "phones"));
    setTablets(products.filter((item) => item.category === "tablets"));
    setAccessories(products.filter((item) => item.category === "accessories"));
  }, [products]);

  const isProductSelected = (
    productId: Product["id"],
    productsGroup: Product[] | ProductInCart[]
  ): boolean => {
    return (
      Array.isArray(productsGroup) &&
      productsGroup.some((product) => product.id === productId)
    );
  };

  const toggleToFavorites = (item: Product) => {
    if (item && isProductSelected(item.id, favorites)) {
      const newFavorites = favorites.filter(
        (product: Product) => product.id !== item.id
      );

      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const toggleToCart = (item: Product | ProductInCart) => {
    const productWidthCount = { ...item, count: 1 };

    if (item && isProductSelected(productWidthCount.id, cart)) {
      const newCart = cart.filter((product: Product) => product.id !== item.id);

      setCart(newCart);
    } else {
      setCart([...cart, productWidthCount]);
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
    <AppProvider
      value={{
        favorites,
        cart,
        toggleToFavorites,
        toggleToCart,
        isProductSelected,
        updateCountInCart,
      }}
    >
      <div className="page">
        <ScrollToTop />
        <Header />
        <main className="page__main">
          <div
            className={`page__container page__container_${pathnameNormalized}`}
          >
            <Routes>
              <Route path={PathnamesApp.Home}>
                <Route
                  index
                  element={<HomePage products={phones} isLoading={isLoading} />}
                />
                <Route path={PathnamesApp.Jouets}>
                  <Route index element={<CategoryPage />} />
                  {/* <Route
                    path=":id"
                    element={<ItemPage products={products} />}
                  /> */}
                </Route>
                <Route path={PathnamesApp.Bavoirs} element={<CategoryPage />} />
                <Route path={PathnamesApp.Robes} element={<CategoryPage />} />
                <Route
                  path={PathnamesApp.Favorites}
                  element={<FavoritesPage />}
                />
                <Route path={PathnamesApp.Cart} element={<CartPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
};
