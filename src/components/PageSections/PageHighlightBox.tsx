import React from "react";
import "./pageHighlightBox.scss";

interface PageHighlightBoxProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  type?: "success" | "info" | "warning";
  className?: string;
}

export const PageHighlightBox: React.FC<PageHighlightBoxProps> = ({
  children,
  icon,
  type = "info",
  className = "",
}) => (
  <div
    className={`page-highlight-box page-highlight-box--${type} ${className}`}
  >
    {icon && <span className="page-highlight-box__icon">{icon}</span>}
    <div className="page-highlight-box__content">{children}</div>
  </div>
);
