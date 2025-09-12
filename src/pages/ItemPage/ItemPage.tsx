import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { AppContext } from "../../context/AppContextProvider";
import { Product } from "../../types/Product";
import { colors, ColorsType } from "../../types/ProductColors";
// import { TechnicalSpecifications } from "../../types/TechSpecification";
// import { SortType } from "../../types/SortType";
import { ProductPrice } from "../../components/ProductPrice/ProductPrice";
// import { PropertyList } from "../../components/PropertyList/PropertyList";
import { getProductById } from "../../api/fetchData";
import { Loader } from "../../components/Loader";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
/* eslint-disable-next-line */
import { ButtonAddToCart } from "../../components/ButtonAddToCart/ButtonAddToCart";
// import { SlickSlider } from "../../components/SlickSlider/SlickSlider";
import "./itemPage.scss";
import { IconArrowLeft } from "../../components/Icon/IconArrowLeft";
// import path from "path";

// const calcValueSpecification = (product: Product, spec: string) => {
//   const specValue = product[spec.toLowerCase() as keyof Product];

//   return Array.isArray(specValue) ? specValue.join(", ") : specValue;
// };

const navigateTo = (pathname: string, paramOld: string, paramNew: string) => {
  const newLink = pathname.replace(
    paramOld.toLowerCase(),
    paramNew.toLowerCase()
  );

  return `${newLink}`;
};

// const chooseProperties = (product: Product) => {
//   const { screen, resolution, processor, ram } = product;

//   const properties = {
//     screen,
//     resolution,
//     processor,
//     ram,
//   };

//   return properties;
// };

const bgrColor = (colorName: string) => {
  return colors[colorName as keyof ColorsType];
};

export const ItemPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImg, setMainImg] = useState(product?.mainimage);

  const { pathname } = useLocation();
  const { favorites, cart, isProductSelected } = useContext(AppContext);

  console.log(pathname);

  const parts = pathname.split("/").filter(Boolean);
  // const categoryName = parts[0]; // "bavoirs"
  const itemId = parts[1]; // "7"

  async function loadProduct() {
    setIsLoading(true);

    try {
      const productFromServer = await getProductById(itemId);

      setProduct(productFromServer);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [itemId]);

  const isProductSelectedinFav = product
    ? isProductSelected(product.id, favorites)
    : false;
  const isProductSelectedinCart = product
    ? isProductSelected(product.id, cart)
    : false;

  const [error, setError] = useState("");

  async function loadProductById(productId: string) {
    setIsLoading(true);

    try {
      const productFromServer = await getProductById(productId);

      setProduct(productFromServer);
    } catch {
      setError("Product not found");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setMainImg(product?.mainimage);
  }, [product]);

  useEffect(() => {
    loadProductById(itemId);
  }, [itemId]);

  const onChangeImage = (img: string) => {
    setMainImg(img);
  };

  const goToPreviusPage = () => {
    window.history.go(-1);
  };

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

          <div className="product-details__back">
            <button
              type="button"
              className="product-details__button-back"
              onClick={goToPreviusPage}
            >
              <IconArrowLeft style={{ width: 16, height: 16 }} />
              Back
            </button>
          </div>

          <div className="product-details">
            <h1 className="product-details__title">{product.name}</h1>
            <div className="product-details__row">
              <div className="product-details__content">
                {product.images && (
                  <div className="product-details__images-container">
                    {product?.images.length > 1 && (
                      <div className="image-list">
                        {product.images.map((imgNumber) => (
                          <button
                            type="button"
                            key={imgNumber}
                            className="image-list__box"
                            onClick={() => onChangeImage(imgNumber)}
                          >
                            <img
                              alt="product"
                              src={`../../img/products/${imgNumber}.jpg`}
                              className={classNames("image image_small", {
                                active: imgNumber === mainImg,
                              })}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="image__box">
                      <img
                        alt="product main"
                        src={`../../img/products/${mainImg}.jpg`}
                        className="image image_main"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="product-details__action">
                <div className="product-details__select">
                  <div className="colors">
                    <h3 className="colors__title">Available colors</h3>
                    {product.colorsavailable && (
                      <div className="colors__list">
                        {product.colorsavailable?.map((color) => (
                          <Link
                            key={color}
                            to={{
                              pathname: `${navigateTo(pathname, product.color, color)}`,
                            }}
                            style={{ background: `${bgrColor(color)}` }}
                            className={classNames("button button_circle", {
                              active: product.color === color,
                            })}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="product-details__select">
                  <div className="capacity">
                    <h3 className="capacity__title capacity__title">
                      Select capacity
                    </h3>
                    <div className="capacity__list">
                      {product.capacityAvailable.map((capacity) => (
                        <Link
                          key={capacity}
                          to={{
                            pathname: `${navigateTo(pathname, product.capacity, capacity)}`,
                          }}
                          className={classNames("button button_square", {
                            active: product.capacity === capacity,
                          })}
                        >
                          {capacity}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div> */}
                <ProductPrice
                  price={product.price}
                  // discount={product.discount}
                  final_price={product.final_price}
                />
                <ButtonAddToCart
                  product={product}
                  isProductInFav={isProductSelectedinFav}
                  isProductInCart={isProductSelectedinCart}
                />
                {/* <PropertyList properties={chooseProperties(product)} /> */}
              </div>
            </div>
            {product.description && (
              <div className="product-details__row">
                <div className="product-details__section">
                  <h2 className="product-details__subtitle">À propos</h2>
                  <div data-cy="productDescription" className="description">
                    <h3 className="description__title">
                      {product.description.title}
                    </h3>
                    {product.description.text?.map((text, i) => (
                      <p className="description__text" key={i}>
                        {text}
                      </p>
                    ))}
                    {product.description.advice && (
                      <p className="description__advice">
                        <span className="description__advice-icon">✨</span>{" "}
                        {product.description.advice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {error && !product && <p className="page__title">Product not found</p>}

      {/* {!isLoading && (
        <section className="section">
          <h1 className="section__title">You may also like</h1>
          <SlickSlider products={products} sortBy={SortType.Random} />
        </section>
      )} */}
    </div>
  );
};
