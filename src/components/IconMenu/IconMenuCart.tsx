import React from "react";
import { PathnamesApp } from "../../types/Pathnames";
import "./iconMenu.scss";
import { IconCart } from "../Icon/IconCart";
import { IconMenu } from "./IconMenu";

type Props = {
  count: number;
  link: PathnamesApp;
};

export const IconMenuCart: React.FC<Props> = ({ count, link }) => {
  return (
    <IconMenu link={link} count={count}>
      <IconCart style={{ width: 20, height: 20 }} className="icon__img" />
    </IconMenu>
  );
};
