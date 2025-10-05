import React from "react";
import { PathnamesApp } from "../../types/Pathnames";
import "./iconMenu.scss";
import { IconMenu } from "./IconMenu";
import { IconFav } from "../Icon/IconFav";

type Props = {
  count: number;
  link: PathnamesApp;
};

export const IconMenuFavorites: React.FC<Props> = ({ count, link }) => {
  return (
    <IconMenu link={link} count={count}>
      <IconFav style={{ width: 20, height: 20 }} className="icon__img" />
    </IconMenu>
  );
};
