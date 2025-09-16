import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

export type Props = {
  to: string;
  text: string;
  class_name?: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text, class_name }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        class_name && classNames(class_name, { selected: isActive })
      }
    >
      {text}
    </NavLink>
  );
};
