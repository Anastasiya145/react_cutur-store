import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { IconUser } from "./IconUser";
import { PathnamesApp } from "../../types/Pathnames";
import "./icon.scss";

interface UserIconLinkProps {
  className?: string;
  selected?: boolean;
}

const UserIconLink: React.FC<UserIconLinkProps> = ({
  className = "icon header__user-btn",
  selected = false,
}) => {
  const location = useLocation();
  const isSelected = selected || location.pathname === PathnamesApp.Connexion;

  return (
    <Link
      to={PathnamesApp.Connexion}
      className={classNames(className, { selected: isSelected })}
    >
      <IconUser className="icon__img" style={{ width: 24, height: 24 }} />
    </Link>
  );
};

export default UserIconLink;
