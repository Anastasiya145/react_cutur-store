import React from "react";
import logo from "../../img/logo.svg";

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  width?: number | string;
  height?: number | string;
};

export const Logo: React.FC<LogoProps> = ({
  width = 56,
  height = 32,
  ...props
}) => <img src={logo} alt="Logo" width={width} height={height} {...props} />;
