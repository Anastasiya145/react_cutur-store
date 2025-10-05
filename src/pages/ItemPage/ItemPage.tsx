import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";
import { Product } from "../../types/Product";
import { getProductById } from "../../api/productsApi";
import { Loader } from "../../components/Loader";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { DeliveriesDrawer } from "../DeliveriesPage/DeliveriesDrawer";
import { ProductImages } from "./ProductImages";
import { ProductColors } from "./ProductColors";
import { ProductDescription } from "./ProductDescription";
import "./itemPage.scss";
import { ProductBackButton } from "./ProductBackButton";
import { ProductPrice } from "../../components/ProductPrice";
import { ButtonAddToCart } from "../../components/Buttons/ButtonAddToCart";
import AnimatedTextButton from "../../components/AnimatedButton/AnimatedTextButton";
import { SwiperSlider } from "../../components/SwiperSlider/SwiperSlider";
import { getProducts } from "../../api/productsApi";
import { SortType } from "../../types/SortType";

const navigateTo = (pathname: string, paramOld: string, paramNew: string) => {
  const newLink = pathname.replace(
    paramOld.toLowerCase(),
    paramNew.toLowerCase()
  );
  return `${newLink}`;
};

export const ItemPage: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, favorites, cart, isProductSelected } =
    useContext(AppContext);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImg, setMainImg] = useState<string | undefined>(undefined);
  const [error, setError] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);
  const itemId = parts[1];

  useEffect(() => {
    async function loadProductById(productId: string) {
      setIsLoading(true);
      try {
        const productFromServer = await getProductById(productId);
        setProduct(productFromServer);
        setMainImg(productFromServer.mainimage);

        // Загружаем продукты той же категории
        await loadRelatedProducts(productFromServer.category);
      } catch {
        setError("Product not found");
      } finally {
        setIsLoading(false);
      }
    }

    async function loadRelatedProducts(category: string) {
      setIsLoadingRelated(true);
      try {
        const allProducts = await getProducts();
        // Filter products of the same category, excluding the current product
        const sameCategory = allProducts.filter(
          (p) => p.category === category && p.id.toString() !== itemId
        );
        setRelatedProducts(sameCategory);
      } catch (error) {
        console.error("Error loading related products:", error);
      } finally {
        setIsLoadingRelated(false);
      }
    }

    loadProductById(itemId);
  }, [itemId]);

  const isProductSelectedinFav = product
    ? isProductSelected(product.id, favorites)
    : false;
  const isProductSelectedinCart = product
    ? isProductSelected(product.id, cart)
    : false;

  const onChangeImage = (img: string) => setMainImg(img);
  const goToPreviusPage = () => window.history.go(-1);

  return (
    <div className="page__item">
      {isLoading && (
        <div className="product-details__loader">
          <Loader />
        </div>
      )}

      {!isLoading && product && (
        <>
          <BreadCrumbs />
          <ProductBackButton onClick={goToPreviusPage} />

          <div className="product-details">
            <h1 className="product-details__title">{product.name}</h1>
            <div className="product-details__row">
              <div className="product-details__content">
                {product.images && (
                  <ProductImages
                    images={product.images}
                    mainImg={mainImg || ""}
                    onChangeImage={onChangeImage}
                  />
                )}
              </div>
              <div className="product-details__column">
                {product.colorsavailable && (
                  <ProductColors
                    colorsAvailable={product.colorsavailable}
                    currentColor={product.color}
                    pathname={pathname}
                    navigateTo={navigateTo}
                  />
                )}
                <div className="product-details__action">
                  <ProductPrice
                    price={product.price}
                    final_price={product.final_price}
                  />
                  <ButtonAddToCart
                    product={product}
                    isProductInFav={isProductSelectedinFav}
                    isProductInCart={isProductSelectedinCart}
                  />
                </div>
                <AnimatedTextButton
                  className="deliveries-page__open-btn"
                  onClick={() => setIsDrawerOpen(true)}
                  text="Infos livraisons & retours"
                />
              </div>
            </div>

            {product.description && (
              <ProductDescription description={product.description} />
            )}
          </div>

          {relatedProducts.length > 0 && (
            <section className="product-details__related">
              <h2 className="product-details__related-title">
                Vous pourriez aussi aimer
              </h2>
              {isLoadingRelated ? (
                <div className="product-details__loader">
                  <Loader />
                </div>
              ) : (
                <SwiperSlider
                  products={relatedProducts}
                  sortBy={SortType.Newest}
                />
              )}
            </section>
          )}
        </>
      )}

      {error && !product && <p className="page__title">Product not found</p>}

      <DeliveriesDrawer open={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </div>
  );
};
