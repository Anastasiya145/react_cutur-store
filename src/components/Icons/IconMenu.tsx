import React from "react";
import classNames from "classnames";
import "./icon.scss";

export const IconMenu: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...rest
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    className={classNames("icon", className)}
    {...rest}
  >
    <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
  </svg>
);
