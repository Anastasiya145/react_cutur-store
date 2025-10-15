import React from "react";
import classNames from "classnames";
import { Product } from "../../types/Product";

type Props = {
  images: Product["images"];
  mainImg: Product["main_image"];
  onChangeImage: (img: Product["images"][number]) => void;
};

export const ProductImages: React.FC<Props> = ({
  images,
  mainImg,
  onChangeImage,
}) => (
  <div className="product-details__images-container">
    {images.length > 1 && (
      <div className="image-list">
        {images.map((imgNumber) => (
          <button
            type="button"
            key={imgNumber}
            className="image-list__box"
            onClick={() => onChangeImage(imgNumber)}
          >
            <img
              alt="product"
              src={`img/products/${imgNumber}.jpg`}
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
        src={`img/products/${mainImg}.jpg`}
        className="image image_main"
      />
    </div>
  </div>
);
