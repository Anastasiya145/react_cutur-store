import React from "react";
import classNames from "classnames";
import "./icon.scss";

export const IconArrowDown: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...rest
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={classNames("icon", className)}
    width="1em"
    height="1em"
    {...rest}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
