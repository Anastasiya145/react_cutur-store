import React from "react";
import "./icon.scss";

export const IconClose: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    className={`icon ${props.className || ""}`}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
