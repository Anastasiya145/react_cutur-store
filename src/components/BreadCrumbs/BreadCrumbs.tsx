import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import "./breadCrumbs.scss";
import { IconHome } from "../../icons/IconHome";
// import { $main-color } from "../../styles/utils/variables.scss";

export const BreadCrumbs: React.FC = () => {
  const breadcrumbs = useLocation()
    .pathname.split("/")
    .filter((item) => item !== "");

  const isLastLink = (index: number) => {
    return index === breadcrumbs.length - 1;
  };

  return (
    <div data-cy="breadCrumbs" className="breadcrumbs">
      <Link to="/">
        <IconHome
          className="breadcrumbs__home"
          style={{ width: 16, height: 16 }}
        />
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
          </Link>
        );
      })}
    </div>
  );
};
