import React from "react";
import "./icon.scss";

export const IconUser: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon ${props.className || ""}`}
    {...props}
  >
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M4 20c0-3.3137 3.134-6 7-6s7 2.6863 7 6"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
