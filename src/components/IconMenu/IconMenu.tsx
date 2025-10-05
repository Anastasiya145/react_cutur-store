import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { PathnamesApp } from "../../types/Pathnames";
import "./iconMenu.scss";

type Props = {
  count: number;
  link: PathnamesApp;
  children: React.ReactNode;
};

export const IconMenu: React.FC<Props> = ({ link, children, count }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => classNames("icon", { selected: isActive })}
    >
      {children}
      {count > 0 && (
        <div className="icon__count">
          <span className="icon__text">{count}</span>
        </div>
      )}
    </NavLink>
  );
};
