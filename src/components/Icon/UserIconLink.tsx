import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconUser } from "./IconUser";
import { PathnamesApp } from "../../types/Pathnames";

interface UserIconLinkProps {
  className?: string;
  selected?: boolean;
}

const UserIconLink: React.FC<UserIconLinkProps> = ({
  className = "icon header__user-btn",
  selected = false,
}) => {
  const location = useLocation();
  const isSelected = selected || location.pathname === PathnamesApp.Login;

  return (
    <Link
      to={PathnamesApp.Login}
      className={className + (isSelected ? " selected" : "")}
    >
      <IconUser className="icon__img" style={{ width: 24, height: 24 }} />
    </Link>
  );
};

export default UserIconLink;
