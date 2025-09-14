import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import "./breadCrumbs.scss";
import { IconHome } from "../Icon/IconHome";
import { IconArrowRight } from "../Icon/IconArrowRight";
import { CATEGORY_NAME_MAP } from "../../types/Pathnames";

export const BreadCrumbs: React.FC = () => {
  const breadcrumbs = useLocation()
    .pathname.split("/")
    .map((item) => {
      const slug = decodeURIComponent(item);
      const decodedItem = CATEGORY_NAME_MAP[slug] || slug;

      return decodedItem;
    })
    .filter((item) => item !== "");

  const isLastLink = (index: number) => {
    return index === breadcrumbs.length - 1;
  };

  return (
    <div data-cy="breadCrumbs" className="breadcrumbs">
      <Link to="/" className="breadcrumbs__link">
        <IconHome style={{ width: 16, height: 16 }} />
        <IconArrowRight style={{ width: 16, height: 16 }} />
      </Link>
      {breadcrumbs.map((crumbs, index) => {
        const text = crumbs.split("-").join(" ");

        const linkTO = `/${crumbs.toLowerCase()}`;

        return (
          <Link
            key={crumbs}
            to={linkTO}
            className={classNames("breadcrumbs__link", {
              disabled: isLastLink(index),
            })}
          >
            {text}
            {breadcrumbs.length - 1 !== index && (
              <IconArrowRight style={{ width: 16, height: 16 }} />
            )}
          </Link>
        );
      })}
    </div>
  );
};
