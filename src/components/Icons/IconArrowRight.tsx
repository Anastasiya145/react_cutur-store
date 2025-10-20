import React from "react";
import classNames from "classnames";
import "./icon.scss";

export const IconArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...rest
}) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    className={classNames("icon", className)}
    {...rest}
  >
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
