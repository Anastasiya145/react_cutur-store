import React from "react";
import "./highlightTextBoxWithIcon.scss";

interface HighlightTextBoxWithIconProps {
  text: string;
  icon?: React.ReactNode;
  type?: "success" | "info" | "warning";
  className?: string;
}

export const HighlightTextBoxWithIcon: React.FC<
  HighlightTextBoxWithIconProps
> = ({ text, icon, type = "info", className = "" }) => (
  <div
    className={`highlight-text-box highlight-text-box--${type} ${className}`}
  >
    {icon && <span className="highlight-text-box__icon">{icon}</span>}
    <div className="highlight-text-box__text">{text}</div>
  </div>
);
