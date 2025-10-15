import React from "react";
import "./pageHighlightBox.scss";

interface PageHighlightBoxProps {
  text: string;
  icon?: React.ReactNode;
  type?: "success" | "info" | "warning";
  className?: string;
}

export const PageHighlightBox: React.FC<PageHighlightBoxProps> = ({
  text,
  icon,
  type = "info",
  className = "",
}) => (
  <div
    className={`page-highlight-box page-highlight-box--${type} ${className}`}
  >
    {icon && <span className="page-highlight-box__icon">{icon}</span>}
    <div className="page-highlight-box__text">{text}</div>
  </div>
);
