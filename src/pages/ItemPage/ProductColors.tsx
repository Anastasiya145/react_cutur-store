import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { colors, ColorsType } from "../../types/ProductColors";
import { Product } from "../../types/Product";

type Props = {
  colorsAvailable: Product["colors_available"];
  currentColor: Product["color"];
  pathname: string;
  navigateTo: (pathname: string, paramOld: string, paramNew: string) => string;
};

const bgrColor = (colorName: string) => colors[colorName as keyof ColorsType];

export const ProductColors: React.FC<Props> = ({
  colorsAvailable,
  currentColor,
  pathname,
  navigateTo,
}) => (
  <div className="colors">
    <h3 className="colors__title">Couleurs disponibles</h3>
    <div className="colors__list">
      {colorsAvailable.map((color) => (
        <Link
          key={color}
          to={{ pathname: navigateTo(pathname, currentColor, color) }}
          style={{ background: bgrColor(color) }}
          className={classNames("button button_circle", {
            active: currentColor === color,
          })}
        />
      ))}
    </div>
  </div>
);
