import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import classNames from "classnames";
import { AppContext } from "../../context/AppContextProvider";
import { Product } from "../../types/Product";
import { colors, ColorsType } from "../../types/ProductColors";
import { TechnicalSpecifications } from "../../types/TechSpecification";
import { SortType } from "../../types/SortType";
import { ProductPrice } from "../../components/ProductPrice/ProductPrice";
// import { PropertyList } from "../../components/PropertyList/PropertyList";
import { getProductByCategory, getProductById } from "../../api/fetchData";
import { Loader } from "../../components/Loader";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
/* eslint-disable-next-line */
import { ButtonAddToCart } from "../../components/ButtonAddToCart/ButtonAddToCart";
import { SlickSlider } from "../../components/SlickSlider/SlickSlider";
import "./itemPage.scss";
import { IconArrowLeft } from "../../components/Icon/IconArrowLeft";

const calcValueSpecification = (product: Product, spec: string) => {
  const specValue = product[spec.toLowerCase() as keyof Product];

  return Array.isArray(specValue) ? specValue.join(", ") : specValue;
};

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

const findProductById = (id: number, products: Product[]) => {
  return products.find((product) => product.id === id);
};

export const ItemPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImg, setMainImg] = useState(product?.mainImage);

  const { pathname } = useLocation();
  const { itemId = "" } = useParams();
  const { favorites, cart, isProductSelected } = useContext(AppContext);

  const categoryName = pathname.slice(1);

  async function loadProducts() {
    setIsLoading(true);

    try {
      const productsFromServer = await getProductByCategory(categoryName);

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [categoryName]);

  const isProductSelectedinFav = product
    ? isProductSelected(product.id, favorites)
    : false;
  const isProductSelectedinCart = product
    ? isProductSelected(product.id, cart)
    : false;
  const selectedItem = product
    ? findProductById(product.id, products)
    : undefined;
  const isProductFind = product && selectedItem;

  const [error, setError] = useState("");

  async function loadProductById(productId: string) {
    setIsLoading(true);

    try {
      const detailedPproductFromServer = await getProductById(productId);

      setProduct(detailedPproductFromServer);
      setMainImg(detailedPproductFromServer.mainImage);
    } catch {
      setError("Product not found");
    } finally {
      setIsLoading(false);
    }
  }

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

      {!isLoading && isProductFind && (
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
                    <div className="image-list">
                      {product.images.map((img) => (
                        <button
                          type="button"
                          key={img}
                          className="image-list__box"
                          onClick={() => onChangeImage(img)}
                        >
                          <img
                            alt="product"
                            src={img}
                            className={classNames("image image_small", {
                              active: img === mainImg,
                            })}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="image__box">
                      <img
                        alt="product main"
                        src={`${mainImg}`}
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
                    <div className="colors__list">
                      {product.colorsAvailable.map((color) => (
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
                  product={selectedItem}
                  isProductInFav={isProductSelectedinFav}
                  isProductInCart={isProductSelectedinCart}
                />
                {/* <PropertyList properties={chooseProperties(product)} /> */}
              </div>
            </div>
            <div className="product-details__row">
              <div className="product-details__section">
                <h2 className="product-details__subtitle">About</h2>
                <div data-cy="productDescription" className="description">
                  {Array.isArray(product.description) &&
                    product.description.map((desc, idx) => (
                      <div
                        className="description__item"
                        key={desc.title || idx}
                      >
                        <h3 className="description__title">{desc.title}</h3>
                        {Array.isArray(desc.text) &&
                          desc.text.map((text, i) => (
                            <p className="description__text" key={i}>
                              {text}
                            </p>
                          ))}
                        {desc.advice && (
                          <p className="description__advice">{desc.advice}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="product-details__section">
                <h2 className="product-details__subtitle">Tech specs</h2>
                <div className="tech-specifications">
                  {Object.keys(TechnicalSpecifications).map((spec) => (
                    <div key={spec} className="tech-specifications__item">
                      <p className="tech-specifications__text">{spec}</p>
                      <p
                        className={classNames(
                          "tech-specifications__text",
                          "tech-specifications__text--bold"
                        )}
                      >
                        {calcValueSpecification(product, spec)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {error && !isProductFind && (
        <p className="page__title">Product not found</p>
      )}

      {!isLoading && (
        <section className="section">
          <h1 className="section__title">You may also like</h1>
          <SlickSlider products={products} sortBy={SortType.Random} />
        </section>
      )}
    </div>
  );
};
