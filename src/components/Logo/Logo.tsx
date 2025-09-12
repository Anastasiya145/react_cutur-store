import React from "react";

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  width?: number | string;
  height?: number | string;
};

export const Logo: React.FC<LogoProps> = ({
  width = 56,
  height = 32,
  ...props
}) => (
  <img
    src={"./images/logo.svg"}
    alt="Logo"
    width={width}
    height={height}
    {...props}
  />
);
