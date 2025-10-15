import React from "react";
import "./termsHighlightBox.scss";

interface TermsHighlightBoxProps {
  children: React.ReactNode;
  type?: "success" | "info" | "warning";
  icon?: string;
  className?: string;
}

export const TermsHighlightBox: React.FC<TermsHighlightBoxProps> = ({
  children,
  type = "success",
  icon,
  className = "",
}) => {
  const defaultIcons = {
    success: "🎉",
    info: "ℹ️",
    warning: "⚠️",
  };

  const displayIcon = icon || defaultIcons[type];

  return (
    <div
      className={`terms-highlight-box terms-highlight-box--${type} ${className}`}
    >
      <span className="terms-highlight-box__icon">{displayIcon}</span>
      <div className="terms-highlight-box__content">{children}</div>
    </div>
  );
};
