import React from "react";

export const IconInstagram: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="17" cy="7" r="1.5" fill="currentColor" />
  </svg>
);
