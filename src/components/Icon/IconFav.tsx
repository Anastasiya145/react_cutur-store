import React from "react";

type IconHeartProps = React.SVGProps<SVGSVGElement> & {
  isFilled?: boolean;
};

export const IconFav: React.FC<IconHeartProps> = ({ isFilled, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M12 21s-6.5-4.35-9-7.5C-1.5 9.5 2.5 4 7.5 6.5c2.5 1.25 4.5 4.5 4.5 4.5s2-3.25 4.5-4.5C21.5 4 25.5 9.5 21 13.5c-2.5 3.15-9 7.5-9 7.5z"
      stroke="currentColor"
      strokeWidth="2"
      fill={isFilled ? "#f28b82" : "none"}
      color={isFilled ? "#f28b82" : "currentColor"}
    />
  </svg>
);
