import React from "react";
import "./termsText.scss";

interface TermsTextProps {
  children: React.ReactNode;
  className?: string;
}

export const TermsText: React.FC<TermsTextProps> = ({
  children,
  className = "",
}) => {
  return <p className={`terms-text ${className}`}>{children}</p>;
};
