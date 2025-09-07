import React from "react";

export const IconCart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <circle cx="9" cy="21" r="1" fill="currentColor" />
    <circle cx="19" cy="21" r="1" fill="currentColor" />
    <path
      d="M1 1h2l2.68 13.39A2 2 0 0 0 7.6 16h9.8a2 2 0 0 0 1.92-1.61L21 6H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);
